import ResourcesClient from "./ResourcesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operations Insights & Resources | Stivate",
  description: "Read technical insights about SAP database integrations, download free warehouse process audit checklists, and watch operational system demos.",
  alternates: {
    canonical: "/resources",
  },
};

export default function ResourcesHubPage() {
  return <ResourcesClient />;
}
