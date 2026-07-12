import type { Metadata } from "next";
import WorkClient from "@/components/work/WorkClient";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Our Work & Logistics Case Studies | Stivate",
  description: "Read detailed client case studies detailing our enterprise solutions, WMS systems, and logistics automation integrations.",
  keywords: ["WMS System", "SAP ERP Integration", "Logistics Automation", "CodeIgniter CRM Customization", "Perfex CRM UAE", "Stivate Work"],
  alternates: {
    canonical: "/work",
  },
};


export default function WorkPage() {
  return (
    <>
      <WorkClient />
      <Footer />
    </>
  );
}
