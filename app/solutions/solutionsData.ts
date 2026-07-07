export interface Solution {
  slug: string;
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  features: string[];
  impacts: string[];
}

export const solutions: Solution[] = [
  {
    slug: "dispatch-management-software",
    title: "Dispatch Management System",
    subtitle: "Streamline yard congestion, slot scheduling, and loading bays validation.",
    problem: "Trucks queuing at the gate for hours, manual log sheets causing errors, and duplicate data entry.",
    solution: "A cloud scheduling dashboard that manages loading slots, driver SMS notifications, and QR-based invoice scans at loading bays.",
    features: [
      "Gate check-in register for arriving trailers",
      "Dynamic loading bay scheduling grid",
      "Transporter self-service booking portal",
      "Mobile driver verification and gatepass scan"
    ],
    impacts: [
      "45% reduction in truck turnaround time (TAT)",
      "Zero transporter penalties for delayed loadings",
      "100% electronic logging of yard events"
    ]
  },
  {
    slug: "grn-management-software",
    title: "GRN Management & Goods Inbound",
    subtitle: "OCR-powered document processing and automatic receipt verification.",
    problem: "Inbound document tallies matched line-by-line, causing data lag and backlogs.",
    solution: "PDF/invoice scanning engine that extracts details, matches items against purchase orders, and syncs directly to ERP database.",
    features: [
      "OCR Document Reader for challans & pack lists",
      "Automated SKU & Purchase Order Matcher",
      "Discrepancy flagging and correction portal",
      "Direct SAP/ERP receipt generation layer"
    ],
    impacts: [
      "90% faster inbound document logging",
      "Zero manual SKU entry errors",
      "Instant inventory sync upon unloading"
    ]
  },
  {
    slug: "gate-entry-management",
    title: "Gate Entry & Vehicle Control",
    subtitle: "Digitized yard management, vehicle inspections, and gatepass tracking.",
    problem: "Uninspected trucks entering the yard and missing records of vehicle exit timestamps.",
    solution: "Secure guard-house terminal app that registers license plates, captures vehicle photos, checks safety, and generates e-gatepasses.",
    features: [
      "License plate scanning and driver identity registration",
      "Vehicle condition and safety check logs",
      "Digital gatepass generator (QR coded)",
      "Real-time yard occupancy count monitor"
    ],
    impacts: [
      "100% log security for all inbound vehicles",
      "Zero unauthorized trailer yard entries",
      "Automated exit auditing for security compliance"
    ]
  },
  {
    slug: "visitor-management",
    title: "Visitor Management System",
    subtitle: "Secure B2B registration, badge printing, and access compliance.",
    problem: "Paper registration books at the lobby which expose contact info and slow down check-ins.",
    solution: "Self-service kiosk app for visitor check-in, host approval SMS, and instant QR badge printing.",
    features: [
      "Visitor pre-registration with QR invite links",
      "Self-service check-in kiosk terminal app",
      "Host approval alerts (SMS / WhatsApp)",
      "Emergency roll-call list on manager dashboard"
    ],
    impacts: [
      "Visitor registration times reduced under 1 minute",
      "100% compliant data log for safety audits",
      "Enhanced reception lobby security presence"
    ]
  },
  {
    slug: "employee-productivity-tracking",
    title: "Employee Floor Productivity Tracker",
    subtitle: "Real-time tracking of sorting, picking, and packing volumes.",
    problem: "Managers have no visibility over worker throughput, leading to skewed workloads and zero performance metrics.",
    solution: "Floor operator barcode/QR scan tracking that logs sorting and pick rates directly to manager dashboards.",
    features: [
      "Mobile barcode scanning for package handlers",
      "Live activity picking speed chart dashboard",
      "Operator performance leaderboard screen",
      "Worker idle-time flag alert triggers"
    ],
    impacts: [
      "30% increase in packing and picking speeds",
      "Balanced labor allocations across departments",
      "Objective metrics for employee performance bonuses"
    ]
  },
  {
    slug: "warehouse-dashboard",
    title: "Warehouse Operations Control Center",
    subtitle: "Real-time dashboard of inventory levels, loading bay queues, and SLA alerts.",
    problem: "High latency in locating inventory and lagging dispatch status updates.",
    solution: "Single-pane visual console showing real-time warehouse occupancy, active loading docks, and SLA bottlenecks.",
    features: [
      "Real-time bin occupancy heatmaps",
      "Dock activity and trailer loading indicators",
      "Pending dispatch queue orders list",
      "Hourly fulfillment SLA target tracking"
    ],
    impacts: [
      "100% layout visibility for warehouse managers",
      "Optimization of shelf space usage",
      "30% faster response times to order anomalies"
    ]
  },
  {
    slug: "barcode-management",
    title: "Barcode & QR Label Management",
    subtitle: "Custom label printers integration, serial code generation, and scan verification.",
    problem: "Mismatched labels, slow hand-written SKU tags, and duplicate barcode registers.",
    solution: "Automatic barcode generator connected directly to product lists that prints labels during receiving.",
    features: [
      "Custom template designer for barcode labels",
      "Print commands API for Zebra and local printers",
      "Unique serial code database register",
      "Duplicate print warning alert checks"
    ],
    impacts: [
      "100% item scanning compliance",
      "Zero sorting mistakes due to unreadable tags",
      "5x faster barcode printing upon unloading"
    ]
  },
  {
    slug: "warehouse-automation",
    title: "Inventory Bin-Location Tracking",
    subtitle: "Multi-warehouse slotting control and cycle count auditing.",
    problem: "High search times for items and physical warehouse counts not matching digital system records.",
    solution: "QR-based bin-location tracking where operators scan the rack, then the item, confirming location instantly.",
    features: [
      "Rule-based warehouse bin slot selection",
      "Mobile pick route sorting list",
      "Electronic cycle count check verification",
      "Stock transfer request approval loop"
    ],
    impacts: [
      "Search times cut from 25 mins to 2 mins",
      "99.8% system inventory data accuracy",
      "Zero stock write-offs due to misplaced boxes"
    ]
  },
  {
    slug: "vendor-portal",
    title: "Vendor Collaboration Portal",
    subtitle: "Self-service portal for purchase orders, ASN submission, and invoice logs.",
    problem: "Constant phone calls and emails to vendors checking delivery times and invoices.",
    solution: "Secured vendor portal where suppliers see active POs, upload packing details (ASN), and print pre-formatted QR codes.",
    features: [
      "Supplier PO dashboard showing confirmation logs",
      "Advanced Shipping Note (ASN) entry form",
      "Pre-receiving inventory label prints",
      "Vendor delivery SLA compliance charts"
    ],
    impacts: [
      "65% reduction in email/phone supplier traffic",
      "2x faster gate check-in and unloading cycles",
      "Simplified billing with ASN matched invoices"
    ]
  },
  {
    slug: "approval-workflow",
    title: "Custom Approval Workflow Engine",
    subtitle: "Automated multi-level approval queues for inventory transfers and purchase orders.",
    problem: "Purchase requests and write-offs pending in email threads, stalling operations.",
    solution: "Operational workflow engine with custom multi-level approvals, audit logs, and automated notifications.",
    features: [
      "Custom multi-step approval routing engine",
      "Mobile/WhatsApp approval trigger links",
      "Audit trail logs displaying signature actions",
      "Auto-escalation rules for unresolved requests"
    ],
    impacts: [
      "Internal approvals cut from 3 days to 4 hours",
      "100% audit logs compliance for accounting checks",
      "Reduced bottleneck lags in warehouse transfers"
    ]
  },
  {
    slug: "erp-integration",
    title: "SAP & Enterprise ERP Middleware",
    subtitle: "Production-safe bi-directional database replication.",
    problem: "High integration risk, duplicate entry systems, and slow sync updates.",
    solution: "Custom middleware that isolates active systems, queues data transactions, and updates SAP/Oracle securely.",
    features: [
      "Robust transaction queue retry engine",
      "Isolated data validation buffer middleware",
      "Direct API endpoints for custom app feeds",
      "XML and JSON data converter layouts"
    ],
    impacts: [
      "Zero legacy system downtime during updates",
      "100% database sync safety and validation check",
      "Instant SAP balance logs update on invoice scans"
    ]
  },
  {
    slug: "custom-manufacturing-software",
    title: "Custom Operational Software",
    subtitle: "Bespoke business applications built for unique plant workflows.",
    problem: "Standard off-the-shelf software doesn't fit specific sorting, billing, or real estate workflows.",
    solution: "100% custom software engineering focusing on database design, clean UIs, and robust local deployment.",
    features: [
      "Custom relational database schemas design",
      "React/Next.js corporate dashboards",
      "REST integrations with custom APIs",
      "Practical on-floor pilot user trials"
    ],
    impacts: [
      "100% workflow match with business requirements",
      "Complete corporate source code ownership",
      "Scale-ready systems with no user license caps"
    ]
  }
];
