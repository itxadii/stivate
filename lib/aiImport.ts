/**
 * AI Import Feature Utility Module
 * Handles parsing, schema validation, type detection, string sanitization, and default value mapping.
 */

export type ImportType = "quotation" | "invoice";

export interface MappedQuotationItem {
  description: string;
  quantity: number;
  price: number;
  isIncluded: boolean;
}

export interface MappedQuotation {
  selectedClientId: string;
  clientName: string;
  clientAddress: string;
  currency: string;
  issueDate: string;
  validUntil: string;
  title: string;
  introduction: string;
  marketComparison: string;
  services: MappedQuotationItem[];
  clientExpenses: MappedQuotationItem[];
  optionalItems: MappedQuotationItem[];
  taxText: string;
  taxRate: number;
  discount: number;
  maintenancePlanPrice: number;
  maintenancePlanDetails: string;
  termsAndConditions: string;
}

export interface MappedInvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface MappedInvoice {
  selectedProjectId: string;
  currency: string;
  issueDate: string;
  dueDate: string;
  paidAmount: number;
  discountRate: number;
  taxRate: number;
  items: MappedInvoiceItem[];
  termsAndConditions: string;
}

export interface ValidationResult {
  isValid: boolean;
  type: ImportType | null;
  version: number;
  warnings: string[];
  error?: string;
}

/**
 * Sanitizes input string fields to prevent XSS by stripping all HTML tags.
 */
export function sanitizeString(val: any): string {
  if (val === null || val === undefined) return "";
  const str = String(val);
  // Strip all HTML tags
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

/**
 * Parses numbers with a fallback default.
 */
export function parseNumber(val: any, fallback: number): number {
  if (val === null || val === undefined) return fallback;
  const num = Number(val);
  return isNaN(num) ? fallback : num;
}

/**
 * Safely parses the JSON string input.
 */
export function parseAIImport(jsonText: string): { data: any; error?: string } {
  try {
    const cleaned = jsonText.trim();
    if (!cleaned) {
      return { data: null, error: "Empty input. Please paste valid AI JSON." };
    }
    const data = JSON.parse(cleaned);
    return { data };
  } catch (err) {
    return { data: null, error: "Invalid JSON. Please paste a valid AI response." };
  }
}

/**
 * Detects import type from parsed JSON.
 */
export function detectImportType(data: any): ImportType | null {
  if (!data || typeof data !== "object") return null;
  const type = data.type;
  if (type === "quotation" || type === "invoice") {
    return type;
  }
  return null;
}

/**
 * Validates the parsed JSON data for expected type, version, and required fields.
 */
export function validateImport(data: any, expectedType: ImportType): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    type: null,
    version: 1,
    warnings: [],
  };

  if (!data || typeof data !== "object") {
    result.isValid = false;
    result.error = "Invalid JSON structure.";
    return result;
  }

  // 1. Detect type
  const type = detectImportType(data);
  result.type = type;
  if (!type) {
    result.isValid = false;
    result.error = "Missing or unsupported 'type' field in JSON.";
    return result;
  }

  if (type !== expectedType) {
    result.isValid = false;
    result.error = `Pasted JSON type (${type}) does not match the expected type (${expectedType}).`;
    return result;
  }

  // 2. Validate version
  const version = parseNumber(data.version, 1);
  result.version = version;
  if (version !== 1) {
    result.warnings.push(`Import version ${version} detected. Falling back to Version 1 parser.`);
  }

  // 3. Required fields checking
  if (type === "quotation") {
    if (!data.client || !data.client.name) {
      result.warnings.push("Client Name ('client.name') is missing.");
    }
    if (!data.quotation || !data.quotation.issue_date) {
      result.warnings.push("Quotation Issue Date ('quotation.issue_date') is missing.");
    }
    if (!data.quotation || !data.quotation.valid_until) {
      result.warnings.push("Quotation Expiry Date ('quotation.valid_until') is missing.");
    }
    if (!data.quotation || !data.quotation.project_scope_title) {
      result.warnings.push("Project Scope Title ('quotation.project_scope_title') is missing.");
    }
    if (!data.services || !Array.isArray(data.services) || data.services.length === 0) {
      result.warnings.push("Services array ('services') is empty or missing.");
    }
  } else if (type === "invoice") {
    if (!data.project) {
      result.warnings.push("Project identification ('project') is missing.");
    }
    if (!data.invoice || !data.invoice.issue_date) {
      result.warnings.push("Invoice Issue Date ('invoice.issue_date') is missing.");
    }
    if (!data.invoice || !data.invoice.due_date) {
      result.warnings.push("Invoice Due Date ('invoice.due_date') is missing.");
    }
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      result.warnings.push("Invoice Items array ('items') is empty or missing.");
    }
  }

  return result;
}

/**
 * Maps quotation fields from parsed JSON with appropriate defaults.
 */
export function mapQuotationFields(
  data: any,
  clients: { id: string; name: string; address: string | null }[] = []
): MappedQuotation {
  const clientObj = data.client || {};
  const quotObj = data.quotation || {};
  const pricingObj = data.pricing || {};
  const maintObj = data.maintenance || {};

  // Resolve matching client
  const savedClientRaw = sanitizeString(clientObj.saved_client);
  const matchingClient = clients.find(
    (c) =>
      c.id === savedClientRaw ||
      c.name.toLowerCase().trim() === savedClientRaw.toLowerCase().trim()
  );
  const selectedClientId = matchingClient ? matchingClient.id : "";

  // Map array fields helper
  const mapItems = (arr: any[] | undefined): MappedQuotationItem[] => {
    if (!Array.isArray(arr)) return [];
    return arr.map((item: any) => {
      const description = sanitizeString(item.description);
      const quantity = parseNumber(item.qty, 1);
      const price = parseNumber(item.price, 0);
      // isIncluded default to false if explicitly present as false, else if included is true or missing, default to false or true?
      // "Missing included: included = true" -> so default is true
      const isIncluded = item.included !== false;
      return { description, quantity, price, isIncluded };
    });
  };

  // Maintenance details: join items to multi-line string
  let maintenancePlanDetails = "";
  if (Array.isArray(maintObj.items)) {
    maintenancePlanDetails = maintObj.items
      .map((i: any) => sanitizeString(i))
      .filter((i: string) => i.trim() !== "")
      .join("\n");
  }

  // Terms and conditions: join items to multi-line string
  let termsAndConditions = "";
  if (Array.isArray(data.terms)) {
    termsAndConditions = data.terms
      .map((t: any) => sanitizeString(t))
      .filter((t: string) => t.trim() !== "")
      .join("\n");
  }

  return {
    selectedClientId,
    clientName: sanitizeString(clientObj.name || (matchingClient ? matchingClient.name : "")),
    clientAddress: sanitizeString(clientObj.location || (matchingClient ? matchingClient.address : "")),
    currency: sanitizeString(quotObj.currency || "INR"),
    issueDate: sanitizeString(quotObj.issue_date),
    validUntil: sanitizeString(quotObj.valid_until),
    title: sanitizeString(quotObj.project_scope_title),
    introduction: sanitizeString(quotObj.introduction),
    marketComparison: sanitizeString(quotObj.market_comparison),
    services: mapItems(data.services),
    clientExpenses: mapItems(data.client_expenses),
    optionalItems: mapItems(data.optional_items),
    taxText: sanitizeString(pricingObj.tax_title || "Not Applicable"),
    taxRate: parseNumber(pricingObj.tax_rate, 0),
    discount: parseNumber(pricingObj.flat_discount, 0),
    maintenancePlanPrice: parseNumber(maintObj.monthly_price, 0),
    maintenancePlanDetails,
    termsAndConditions,
  };
}

/**
 * Maps invoice fields from parsed JSON with appropriate defaults.
 */
export function mapInvoiceFields(
  data: any,
  projects: { id: string; name: string; value: number | null; currency: string }[] = []
): MappedInvoice {
  const invObj = data.invoice || {};

  // Resolve matching project
  const projectRaw = sanitizeString(data.project);
  const matchingProject = projects.find(
    (p) =>
      p.id === projectRaw ||
      p.name.toLowerCase().trim() === projectRaw.toLowerCase().trim()
  );
  const selectedProjectId = matchingProject ? matchingProject.id : "";

  // Map array fields helper
  const mapItems = (arr: any[] | undefined): MappedInvoiceItem[] => {
    if (!Array.isArray(arr)) return [];
    return arr.map((item: any) => {
      const description = sanitizeString(item.description);
      const quantity = parseNumber(item.quantity, 1);
      const price = parseNumber(item.price, 0);
      return { description, quantity, price };
    });
  };

  // Terms and conditions: join items to multi-line string
  let termsAndConditions = "";
  if (Array.isArray(data.terms)) {
    termsAndConditions = data.terms
      .map((t: any) => sanitizeString(t))
      .filter((t: string) => t.trim() !== "")
      .join("\n");
  }

  return {
    selectedProjectId,
    currency: sanitizeString(data.currency || (matchingProject ? matchingProject.currency : "INR")),
    issueDate: sanitizeString(invObj.issue_date),
    dueDate: sanitizeString(invObj.due_date),
    paidAmount: parseNumber(invObj.amount_paid, 0),
    discountRate: parseNumber(invObj.discount_percent, 0),
    taxRate: parseNumber(invObj.tax_percent, 0),
    items: mapItems(data.items),
    termsAndConditions,
  };
}

export const QUOTATION_PROMPT = `
Based on our existing conversation context, generate a structured JSON payload for a business quotation that is directly compatible with my CRM importer.

CRITICAL INSTRUCTIONS:
1. Review the conversation history. If there is NOT enough information to fill in the primary elements of the quotation (such as the client name, list of services, or general project scope), do NOT guess or invent details. Instead, ask concise follow-up questions to gather the missing information first.
2. If all required information is available (or once I provide it), return ONLY valid JSON.
3. Your output must be directly compatible with JSON.parse(). Do NOT wrap the JSON in markdown code blocks or code fences (do NOT use \`\`\`json or \`\`\`). Do NOT include any introductory or concluding text, explanations, or formatting.
4. Do NOT invent/guess unknown values. If a field is unknown, leave it as an empty string (""), 0, or empty array ([]) as indicated in the schema.
5. Do NOT calculate or fill totals (subtotals, total, tax amounts, discount amounts). The CRM calculates these dynamically.
6. Do NOT generate quotation numbers or IDs.
7. Preserve all property names exactly as shown in the template below.

Quotation JSON Schema Template:
{
  "type": "quotation",
  "version": 1,
  "client": {
    "saved_client": "",
    "name": "",
    "location": ""
  },
  "quotation": {
    "currency": "INR",
    "issue_date": "",
    "valid_until": "",
    "project_scope_title": "",
    "introduction": "",
    "market_comparison": ""
  },
  "services": [
    {
      "description": "",
      "qty": 1,
      "price": 0,
      "included": true
    }
  ],
  "client_expenses": [
    {
      "description": "",
      "qty": 1,
      "price": 0,
      "included": true
    }
  ],
  "optional_items": [
    {
      "description": "",
      "qty": 1,
      "price": 0,
      "included": true
    }
  ],
  "pricing": {
    "tax_title": "Not Applicable",
    "tax_rate": 0,
    "flat_discount": 0
  },
  "maintenance": {
    "monthly_price": 0,
    "items": [
      ""
    ]
  },
  "terms": [
    ""
  ]
}
`.trim();

export const INVOICE_PROMPT = `
Based on our existing conversation context, generate a structured JSON payload for a business invoice that is directly compatible with my CRM importer.

CRITICAL INSTRUCTIONS:
1. Review the conversation history. If there is NOT enough information to fill in the primary elements of the invoice (such as the project name, client details, or list of invoice items), do NOT guess or invent details. Instead, ask concise follow-up questions to gather the missing information first.
2. If all required information is available (or once I provide it), return ONLY valid JSON.
3. Your output must be directly compatible with JSON.parse(). Do NOT wrap the JSON in markdown code blocks or code fences (do NOT use \`\`\`json or \`\`\`). Do NOT include any introductory or concluding text, explanations, or formatting.
4. Do NOT invent/guess unknown values. If a field is unknown, leave it as an empty string (""), 0, or empty array ([]) as indicated in the schema.
5. Do NOT calculate or fill totals. The CRM calculates these dynamically.
6. Do NOT generate invoice numbers or IDs.
7. Preserve all property names exactly as shown in the template below.

Invoice JSON Schema Template:
{
  "type": "invoice",
  "version": 1,
  "project": "",
  "currency": "INR",
  "invoice": {
    "issue_date": "",
    "due_date": "",
    "amount_paid": 0,
    "discount_percent": 0,
    "tax_percent": 0
  },
  "items": [
    {
      "description": "",
      "quantity": 1,
      "price": 0
    }
  ],
  "terms": [
    ""
  ]
}
`.trim();
