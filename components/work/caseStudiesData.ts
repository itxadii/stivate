export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  industry: string;
  client: string;
  technologies: string[];
  impactTitle: string;
  impactLabel: string;
  brief: string;
  challenge: string[];
  approach: string[];
  image: string;
  solutions?: {
    title: string;
    description: string;
    result: string;
  }[];
  businessImpact: {
    title: string;
    description: string;
  }[];
  techHighlights: string[];
  architecture?: {
    steps: {
      from: string;
      to: string;
      description: string;
    }[];
  };
  components?: {
    name: string;
    features: string[];
  }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "i3pl",
    title: "I3PL Warehouse Automation Platform",
    subtitle: "QR-Based Inventory Tracking, OCR-Powered Document Processing & SAP Integration",
    industry: "3PL Logistics & Warehousing",
    client: "I3PL Logistics & Warehousing",
    technologies: ["AWS", "SAP Integration", "OCR", "QR Tracking", "FastAPI", "PostgreSQL", "React", "Next.js"],
    impactTitle: "90% Faster",
    impactLabel: "Document Extraction",
    image: "/services/businessautomation.png",
    brief: "A cloud-native warehouse automation platform that digitizes receiving processes, synchronizes stock movements with SAP ERP in real-time, and reduces processing backlogs.",
    challenge: [
      "Manual inventory receiving and physical stock verification took hours.",
      "Repetitive manual SAP data entry caused significant data lag and entry errors.",
      "Inbound PDF and invoice processing resulted in reconciliation mismatches.",
      "Slow GRN (Goods Received Note) processing and dispatch verification limited operational throughput."
    ],
    approach: [
      "Preserved SAP ERP as the authoritative system of record while introducing a high-performance validation layer.",
      "Introduced automatic scanning and document extraction workflows to bypass keyboard data entry.",
      "Implemented a secure middleware architecture for bi-directional transaction synchronization."
    ],
    architecture: {
      steps: [
        { from: "Manufacturers", to: "Inbound Documents", description: "PDFs, Invoices, and Packing Lists arrive at the warehouse." },
        { from: "Inbound Documents", to: "OCR Processing Engine", description: "Tesseract/Vision extraction pulls SKU codes, quantities, and reference numbers." },
        { from: "OCR Processing Engine", to: "Validation Layer", description: "System validates data integrity and matches SKUs against purchase orders." },
        { from: "Validation Layer", to: "Warehouse Portal", description: "Operators verify details and approve inbound shipment." },
        { from: "Warehouse Portal", to: "QR Scanning Operations", description: "Unique identifiers generated for inventory units, pallets, and bin locations." },
        { from: "QR Scanning Operations", to: "SAP Integration Layer", description: "Data is synchronized to the SAP ERP system of record." }
      ]
    },
    components: [
      {
        name: "1. Warehouse Management Portal",
        features: [
          "Centralized web dashboard to view stock quantities and bin assignments.",
          "Inbound and outbound shipment validation tools.",
          "Detailed audits and tracking history for stock location movements.",
          "Live telemetry displaying warehouse capacity and operator queues."
        ]
      },
      {
        name: "2. QR-Based Tracking System",
        features: [
          "Unique QR code labels generated for inventory units, cartons, and storage racks.",
          "Mobile-optimized web scanning portals for warehouse operators.",
          "Step-by-step picking route optimization guides.",
          "Instant dispatch validation scanning at loading bays."
        ]
      },
      {
        name: "3. OCR Document Engine",
        features: [
          "Automatic processing of PDF invoices, packing lists, and delivery challans.",
          "Intelligent data extraction (SKU codes, quantities, batch numbers, vendors).",
          "Automated cross-referencing with active purchase orders.",
          "Sync-ready files generated for direct ERP logging."
        ]
      }
    ],
    businessImpact: [
      { title: "Process Automation", description: "Manual data entry, inventory verification, and GRN updates are replaced with direct QR scans and OCR-driven document uploads." },
      { title: "Inventory Accuracy", description: "Eliminated duplicate data entries and stock level mismatches between physical shelves and SAP database logs." },
      { title: "Scale-Ready Architecture", description: "Built fully cloud-native, ready to handle multi-warehouse locations and high-volume daily shipping events." }
    ],
    techHighlights: [
      "Production WMS Customization",
      "Legacy SAP Integration Middleware",
      "OCR-Powered Document Processing",
      "Mobile Web QR Scanning API",
      "Scalable AWS Cloud Infrastructure"
    ]
  },
  {
    id: "cre-crm",
    title: "Commercial Real Estate & Workspace Management CRM Transformation (UAE)",
    subtitle: "Enterprise custom CRM customization and workflow automation to resolve rental scale challenges.",
    industry: "Commercial Real Estate / Workspace Management",
    client: "Confidential UAE Workspace Management Company",
    technologies: ["PHP 8", "CodeIgniter", "Perfex CRM", "MySQL", "JavaScript", "DataTables", "REST Integrations"],
    impactTitle: "100% Active",
    impactLabel: "Payment & Lead Sync",
    image: "/services/customcrm.png",
    brief: "Enhanced and extended a heavily customized business CRM managing office rentals, tenant billing, lead scoring, and financial operations in a production-safe environment.",
    challenge: [
      "The client's growth outpaced their CRM capacity, resulting in workspace customization limits.",
      "Manual lead assignment and slow document validation created operational visibility gaps.",
      "Complex payment collections and outstanding balance tracking required manual synchronization.",
      "Interconnected database workflows posed a risk of system failure if modified unsafely."
    ],
    approach: [
      "Performed a thorough System Analysis & Database Review to map module dependencies.",
      "Maintained baseline CRM stability while engineering custom extension modules.",
      "Designed user-specific UI workspaces allowing dynamic operational visibility without legacy resets."
    ],
    solutions: [
      {
        title: "Custom Workspace Management UI",
        description: "Developed user-specific workspace preferences and custom CRM data table capabilities, allowing persistent column reordering.",
        result: "Operations teams organize client lists based on daily tasks rather than fixed grids."
      },
      {
        title: "Dynamic Column Sizing",
        description: "Implemented customizable resizing on large data tables, enhancing navigation on invoice and payroll pages.",
        result: "Saves staff time scrolling through large workspace rental details."
      },
      {
        title: "Browser-based Invoice Viewer",
        description: "Designed a direct PDF invoice viewing feature, skipping download dependencies for faster approval.",
        result: "Reduced operational verification delays."
      },
      {
        title: "Lead Capture & Category Automation",
        description: "Connected public website inquiry portals directly to CRM leads with auto-categorization rules.",
        result: "Improved lead response time and cut down manual logging."
      },
      {
        title: "Outstanding Balance Tracking",
        description: "Engineered automated ledger balance tracking showing partial payments and collection histories.",
        result: "System automatically tracks outstanding balances (e.g. tracking AED 750 remaining on an AED 1,500 invoice)."
      }
    ],
    businessImpact: [
      { title: "Operational Efficiency", description: "Eliminated manual payroll checks and lead updates through secure, automated API workflows." },
      { title: "Financial Visibility", description: "Staff gained total visibility of outstanding invoice balances, payments, and rental collections." },
      { title: "Scalable Expansion", description: "Preserved original legacy codebase settings, ensuring future CRM updates remain fully compatible." }
    ],
    techHighlights: [
      "Production CRM Extension",
      "CodeIgniter Performance Tuning",
      "Secure Database Optimization",
      "Inquiry and Form Capture Automation",
      "Dynamic Dashboard Column Sizing"
    ]
  }
];
