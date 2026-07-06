export interface ResourceItem {
  category: "blog" | "download" | "video";
  title: string;
  desc: string;
  tag: string;
  linkText: string;
}

export const resources: ResourceItem[] = [
  {
    category: "blog",
    title: "SAP Inbound Integration: Avoiding Receiving Delays",
    desc: "How we mapped automated OCR scan queues to verify vendor delivery challans against purchase orders directly in SAP S/4HANA.",
    tag: "SAP Integration",
    linkText: "Read Blog Article"
  },
  {
    category: "blog",
    title: "Replacing Excel Sheet Logs in Multi-Tenant Warehouses",
    desc: "Why offline stock sheets fail at scale and how a QR bin-location mapping portal resolves inventory inaccuracies.",
    tag: "Warehouse Automation",
    linkText: "Read Blog Article"
  },
  {
    category: "blog",
    title: "Optimizing Truck Turnaround Times (TAT) at Plant Gates",
    desc: "A case study on implementing dynamic bay allocation calendars and guard-house license scanners to resolve yard traffic.",
    tag: "Dispatch Management",
    linkText: "Read Blog Article"
  },
  {
    category: "download",
    title: "Warehouse Process Audit Checklist (Excel/PDF)",
    desc: "A practical worksheet listing the 24 audit points to evaluate receiving speeds, bin errors, and dispatch verification tags.",
    tag: "Process Checklist",
    linkText: "Download Free Checklist"
  },
  {
    category: "download",
    title: "Excel Replacement Guide: WMS Selection Framework",
    desc: "A comprehensive PDF framework checking compatibility, middleware requirements, and floor worker training loops.",
    tag: "Guidebook",
    linkText: "Download Free Guide"
  },
  {
    category: "video",
    title: "Walkthrough: Automatic PO matching and e-Gatepass scans",
    desc: "A 4-minute operational walk-through video showing our guard-house tablet app and WMS dispatch scanner in action.",
    tag: "Product Demo Video",
    linkText: "Watch Demo Video"
  }
];
