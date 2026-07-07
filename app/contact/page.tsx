import ContactHero from "@/components/contact/ContactHero";
import ContactDetails from "@/components/contact/ContactDetails";
import LeadCapture from "@/components/home/GetStarted";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Contact Stivate | Custom Warehouse Software Consultation",
  description: "Get in touch with Stivate to schedule a free 30-minute process audit for your manufacturing plant, warehouse, or 3PL logistics operations.",
};

export default function ContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Stivate",
    "image": "https://stivate.com/logo.png",
    "@id": "https://stivate.com/#localbusiness",
    "url": "https://stivate.com/contact",
    "telephone": "+91 91722 83705",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Baner Road",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "postalCode": "411045",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.5597,
      "longitude": 73.7799
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "19:00"
    }
  };

  return (
    <main className="relative w-full bg-transparent text-zinc-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ContactHero />
      
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-10">
              <div>
                <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-4">Connect with us</h2>
                <p className="text-zinc-500 text-lg leading-relaxed">
                  We're here to help you navigate your digital transformation. 
                  Reach out through any of these channels or use the form below.
                </p>
              </div>
              <ContactDetails />
              
              {/* Google Map Embed */}
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md">
                <iframe
                  title="Stivate Office Location in Pune"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.333333333333!2d73.7799!3d18.5597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2becfc0000001%3A0x0!2zMTjCsDMzJzM0LjkiTiA3M8KwNDYnNDcuNiJFOQ!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
            
            <div className="bg-background p-1 rounded-[40px] overflow-hidden">
              <LeadCapture hideHeader className="py-12 md:py-16" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


