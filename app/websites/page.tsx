import type { Metadata } from "next";
import WebsitesPageContent from "@/components/websites/WebsitesPageContent";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Website Plans & Care Packages | Stivate",
  description: "Explore our transparent website packages, care plans, and high-profit add-ons. From Essential Business Websites to custom Business Automation Platforms.",
  keywords: ["Website Pricing", "Next.js Development Cost", "CRM Integration Pricing", "WhatsApp Automation Pricing", "Stivate Care Plans"],
  alternates: {
    canonical: "/websites",
  },
};


export default function WebsitesPage() {
  return (
    <>
      <WebsitesPageContent />
      <Footer />
    </>
  );
}
