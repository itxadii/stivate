import test from "node:test";
import assert from "node:assert";
import {
  parseAIImport,
  detectImportType,
  validateImport,
  mapQuotationFields,
  mapInvoiceFields,
  sanitizeString
} from "../aiImport";

// Mock Clients data
const mockClients = [
  { id: "client-1", name: "Acme Corp", address: "123 Acme St" },
  { id: "client-2", name: "Globex Corporation", address: "456 Globex Rd" }
];

// Mock Projects data
const mockProjects = [
  { id: "proj-1", name: "Website Development", value: 5000, currency: "USD" },
  { id: "proj-2", name: "Consulting Service", value: 2500, currency: "EUR" }
];

test("AI Import - JSON parsing and validation", async (t) => {
  await t.test("Valid JSON should parse successfully", () => {
    const raw = `{"type": "quotation", "version": 1}`;
    const result = parseAIImport(raw);
    assert.strictEqual(result.error, undefined);
    assert.strictEqual(result.data.type, "quotation");
  });

  await t.test("Invalid JSON should return parsing error", () => {
    const raw = `{"type": "quotation", "version": 1`; // missing closing brace
    const result = parseAIImport(raw);
    assert.match(result.error || "", /Invalid JSON/);
    assert.strictEqual(result.data, null);
  });

  await t.test("Empty input should return error", () => {
    const result = parseAIImport("   ");
    assert.match(result.error || "", /Empty input/);
  });
});

test("AI Import - Type detection", async (t) => {
  await t.test("Should detect quotation type", () => {
    const data = { type: "quotation" };
    assert.strictEqual(detectImportType(data), "quotation");
  });

  await t.test("Should detect invoice type", () => {
    const data = { type: "invoice" };
    assert.strictEqual(detectImportType(data), "invoice");
  });

  await t.test("Should return null for unknown types", () => {
    const data = { type: "bill" };
    assert.strictEqual(detectImportType(data), null);
  });
});

test("AI Import - Schema validation & type mismatch", async (t) => {
  await t.test("Validation fails when expected type does not match pasted JSON type", () => {
    const data = { type: "invoice", version: 1 };
    const result = validateImport(data, "quotation");
    assert.strictEqual(result.isValid, false);
    assert.match(result.error || "", /does not match the expected type/);
  });

  await t.test("Validation succeeds with warnings for missing optional or required fields", () => {
    const data = {
      type: "quotation",
      version: 1,
      client: { name: "" }, // missing client.name value
      quotation: {}
    };
    const result = validateImport(data, "quotation");
    assert.strictEqual(result.isValid, true); // Still returns true but has warnings
    assert.ok(result.warnings.length > 0);
  });
});

test("AI Import - String XSS Sanitization", async (t) => {
  await t.test("Should strip dangerous HTML tags to prevent XSS", () => {
    const raw = '<script>alert("XSS")</script>Hello <img src="x" onerror="alert(1)">World';
    const sanitized = sanitizeString(raw);
    assert.strictEqual(sanitized, 'alert("XSS")Hello World');
  });
});

test("AI Import - Quotation Mapping & Default Values", async (t) => {
  await t.test("Map quotation correctly with valid fields", () => {
    const json = {
      type: "quotation",
      version: 1,
      client: {
        saved_client: "Acme Corp",
        name: "Acme Corp",
        location: "123 Acme St"
      },
      quotation: {
        currency: "USD",
        issue_date: "2026-07-20",
        valid_until: "2026-08-10",
        project_scope_title: "AI CRM Features",
        introduction: "We will build AI Import",
        market_comparison: "None"
      },
      services: [
        { description: "API Integration", qty: 2, price: 1200, included: false }
      ],
      pricing: {
        tax_title: "VAT",
        tax_rate: 5,
        flat_discount: 100
      },
      maintenance: {
        monthly_price: 99,
        items: ["Bug support", "Hosting"]
      },
      terms: ["Term 1", "Term 2"]
    };

    const mapped = mapQuotationFields(json, mockClients);
    assert.strictEqual(mapped.selectedClientId, "client-1"); // correctly resolved
    assert.strictEqual(mapped.clientName, "Acme Corp");
    assert.strictEqual(mapped.services[0].quantity, 2);
    assert.strictEqual(mapped.services[0].isIncluded, false);
    assert.strictEqual(mapped.maintenancePlanDetails, "Bug support\nHosting");
    assert.strictEqual(mapped.termsAndConditions, "Term 1\nTerm 2");
  });

  await t.test("Fallback to default values when fields are missing", () => {
    const json = {
      type: "quotation",
      version: 1,
      services: [
        { description: "No Price or Qty" } // missing qty, price, included
      ]
    };

    const mapped = mapQuotationFields(json, []);
    assert.strictEqual(mapped.clientName, "");
    assert.strictEqual(mapped.currency, "INR");
    assert.strictEqual(mapped.services[0].quantity, 1); // default qty
    assert.strictEqual(mapped.services[0].price, 0); // default price
    assert.strictEqual(mapped.services[0].isIncluded, true); // default included
    assert.strictEqual(mapped.maintenancePlanDetails, "");
    assert.strictEqual(mapped.termsAndConditions, "");
  });
});

test("AI Import - Invoice Mapping & Default Values", async (t) => {
  await t.test("Map invoice correctly with valid fields", () => {
    const json = {
      type: "invoice",
      version: 1,
      project: "Website Development",
      currency: "USD",
      invoice: {
        issue_date: "2026-07-20",
        due_date: "2026-08-20",
        amount_paid: 1000,
        discount_percent: 10,
        tax_percent: 5
      },
      items: [
        { description: "Frontend setup", quantity: 1, price: 1500 }
      ],
      terms: ["Pay on receipt"]
    };

    const mapped = mapInvoiceFields(json, mockProjects);
    assert.strictEqual(mapped.selectedProjectId, "proj-1"); // resolved project ID
    assert.strictEqual(mapped.dueDate, "2026-08-20");
    assert.strictEqual(mapped.items[0].quantity, 1);
    assert.strictEqual(mapped.items[0].price, 1500);
    assert.strictEqual(mapped.termsAndConditions, "Pay on receipt");
  });

  await t.test("Fallback to default invoice values when fields are missing", () => {
    const json = {
      type: "invoice",
      version: 1,
      items: [
        { description: "No Qty" }
      ]
    };

    const mapped = mapInvoiceFields(json, []);
    assert.strictEqual(mapped.selectedProjectId, "");
    assert.strictEqual(mapped.currency, "INR");
    assert.strictEqual(mapped.items[0].quantity, 1);
    assert.strictEqual(mapped.items[0].price, 0);
  });
});
