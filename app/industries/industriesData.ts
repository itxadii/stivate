export interface Industry {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  bottlenecks: string[];
  solutions: string[];
  impacts: string[];
}

export const industries: Industry[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    title: "Manufacturing & Plant Floor Automation",
    subtitle: "Custom operational software designed to coordinate raw material staging, BOM logs, and plant floor queues.",
    bottlenecks: [
      "Siloed plant operations leading to delayed inventory updates",
      "Manual Bill of Materials (BOM) log sheets causing tracking mismatches",
      "Machine floor idle delays due to component stockout blind spots"
    ],
    solutions: [
      "Real-time Bill of Materials (BOM) database matching",
      "Raw material staging inventory check-in gates",
      "Operator tablet terminal interfaces displaying assembly line schedules"
    ],
    impacts: [
      "22% average increase in assembly line utilization rates",
      "Zero plant floor machine stops caused by inventory latency",
      "100% digitised raw material component receipt checks"
    ]
  },
  {
    slug: "warehousing",
    name: "Warehousing",
    title: "Warehouse Management Systems (WMS)",
    subtitle: "Custom-fit picking layouts, QR barcodes slotting, and real-time inventory tracking logs.",
    bottlenecks: [
      "Hours wasted daily searching for items across undocumented racks",
      "Cycle counting activities take days and cause shipping stops",
      "Physical shelf counts do not match accounting database logs"
    ],
    solutions: [
      "Dynamic bin location allocation schemas and maps",
      "Mobile cycle count scan-and-match auditing tools",
      "Step-by-step picking route generator interface for operators"
    ],
    impacts: [
      "Item search times cut down from 25 minutes to under 2 minutes",
      "Cycle count times reduced by 80% with zero shipping downtime",
      "99.8% system inventory data accuracy verified in audits"
    ]
  },
  {
    slug: "3pl-logistics",
    name: "3PL Logistics",
    title: "Third-Party Logistics (3PL) Automation",
    subtitle: "Multi-tenant inventory control, billing ledger builders, and client shipping portals.",
    bottlenecks: [
      "Complex billing cycles tracking shared warehouse footprint spaces",
      "Slow GRN confirmation loops matching multiple client accounts",
      "No direct shipping visibility for cargo clients requesting status updates"
    ],
    solutions: [
      "Multi-tenant inventory database tracking space logs",
      "Automated space and service billing ledger generator",
      "Driver check-in portal with digital invoice scanning"
    ],
    impacts: [
      "100% billing accuracy with zero lost space revenue logs",
      "50% faster client GRN logging and receipt validation",
      "Automated email reports tracking pallet space status"
    ]
  },
  {
    slug: "food-manufacturing",
    name: "Food Manufacturing",
    title: "Food & Beverage Processing Plants",
    subtitle: "Batch serial control, expiration calendar alerts, and recipe database logs.",
    bottlenecks: [
      "Accidental shipping of near-expiry stocks causing store returns",
      "Manual temperature and safety check logs are slow and easily lost",
      "Regulatory audit tracing takes days of search across paper binders"
    ],
    solutions: [
      "First-Expiry-First-Out (FEFO) stock picking queue rules",
      "Electronic temperature sensor database logs connection",
      "Instant batch serial audit trace search dashboard"
    ],
    impacts: [
      "100% compliance safety records matching audit checks",
      "Accidental stock spoilage write-offs reduced to zero",
      "Batch recall tracing times cut from 3 days to under 5 seconds"
    ]
  },
  {
    slug: "automotive",
    name: "Automotive",
    title: "Automotive Component Staging",
    subtitle: "Just-In-Time (JIT) dispatch trackers and supplier ASN matching.",
    bottlenecks: [
      "Truck queues blocking plant gate entry during peak assembly shifts",
      "Incorrect components tagged during fast-moving box packaging",
      "Heavy dispatch delay penalties imposed by automobile assembly plants"
    ],
    solutions: [
      "Supplier advanced yard slot scheduler gates",
      "Custom barcode verify scans matching SKU to box packing",
      "Auto-triggered transporter alert queues tracking load timelines"
    ],
    impacts: [
      "Zero plant line stops caused by staging component delays",
      "100% scanning validation check accuracy for all outbound parts",
      "45% reduction in trailer turnaround times inside the gate"
    ]
  },
  {
    slug: "pharmaceutical",
    name: "Pharmaceutical",
    title: "Pharmaceutical Operations Compliance",
    subtitle: "FDA-ready digital logs, audit trails, and strict shelf-life monitoring systems.",
    bottlenecks: [
      "Regulatory compliance reporting takes weeks of staff paper checks",
      "Critical raw materials expire on racks without alert flags",
      "No secure digital signature log records verifying batch approvals"
    ],
    solutions: [
      "FDA CFR Part 11 compliant database trails and approvals",
      "Automated batch expiry date alarms and shelf lock triggers",
      "Digital batch approval signature queues with audit history"
    ],
    impacts: [
      "Audit readiness reports prepared in seconds instead of weeks",
      "Zero product scrap claims due to unmonitored shelf-lives",
      "100% compliant and secure digital signature tracking loops"
    ]
  },
  {
    slug: "engineering",
    name: "Engineering",
    title: "Heavy Engineering & Fabrication",
    subtitle: "Bill of Materials trackers and project-wise component staging systems.",
    bottlenecks: [
      "Fabrication delays caused by lost component bolts or brackets",
      "Plant operators fab parts using outdated blueprints",
      "Difficulty tracking project-specific material costs in real-time"
    ],
    solutions: [
      "Fabrication BOM staging tracker by project identifier",
      "QR blueprint scanner links showing latest CAD revisions",
      "Steel raw material lot allocation tracking portal"
    ],
    impacts: [
      "Staging part losses reduced to absolute zero on fab floors",
      "100% verification check matching drawing file revisions",
      "Instant margin calculations tracking project raw materials usage"
    ]
  },
  {
    slug: "textile",
    name: "Textile",
    title: "Textile & Apparel Mills",
    subtitle: "Roll length logs, dye lot serial classifiers, and multi-warehouse distribution.",
    bottlenecks: [
      "Store returns caused by shade mismatches between fabric lots",
      "Weight and roll length mismatches during manual packing checks",
      "Inability to allocate order priorities across dye vats"
    ],
    solutions: [
      "Dye lot serial database classifier matching product rolls",
      "Weighing scale database integrations auto-logging carton weight",
      "Dye batch loading queues scheduling portal for operators"
    ],
    impacts: [
      "Fabric lot shade returns cut down to absolute zero",
      "100% correct invoice shipping logs matching carton weights",
      "Optimized production queues reducing dye vat reload downtime"
    ]
  },
  {
    slug: "chemical",
    name: "Chemical",
    title: "Chemical Batch Mix Plants",
    subtitle: "MSDS safety sheets log portals, mixture weights database scales integration.",
    bottlenecks: [
      "Operators mismatching recipe ratios during raw weight checks",
      "Paper MSDS safety data cards get lost or damaged on the floor",
      "Drums staging delays in corridors causing hazard compliance logs"
    ],
    solutions: [
      "Weight scale database link locks checking mixture targets",
      "QR MSDS search portal accessible instantly on plant floor",
      "Drum bin hazard locator tracking shelf-life limits"
    ],
    impacts: [
      "Zero safety checklist violations logged during plant audits",
      "100% correct batch mixture weights logged electronically",
      "Streamlined corridor staging avoiding storage hazard flags"
    ]
  },
  {
    slug: "fmcg",
    name: "FMCG",
    title: "FMCG Distribution Warehouses",
    subtitle: "High-speed gate loading validation, distributor invoices, and return checks.",
    bottlenecks: [
      "Distributor check delays causing dispatch backlogs during sales peaks",
      "Siloed return inspections cause box pileups in receiving lanes",
      "Difficulty reconciling actual dispatches with distributor portal logs"
    ],
    solutions: [
      "Mobile bay loading scanner checking invoices in real-time",
      "Returns inspection tablet check forms logging condition codes",
      "Distributor portal middleware syncing billing logs instantly"
    ],
    impacts: [
      "Distributor loading speeds increased by 50% during sales cycles",
      "Returns processing backlogs cleared within the shift hours",
      "99.9% reconciliation check accuracy between WMS and distributor logs"
    ]
  }
];
