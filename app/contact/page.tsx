import ContactHero from "@/components/contact/ContactHero";
import ContactDetails from "@/components/contact/ContactDetails";
import LeadCapture from "@/components/home/GetStarted";
import Footer from "@/components/layout/Footer";

export default function ContactPage() {
  return (
    <main className="relative w-full bg-[#FFF6DE] text-zinc-900 font-sans selection:bg-[#e4d9b8]">
      <ContactHero />
      
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <div className="mb-12">
                <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight mb-4">Connect with us</h2>
                <p className="text-zinc-500 text-lg leading-relaxed">
                  We're here to help you navigate the digital landscape. 
                  Reach out through any of these channels or use the form below.
                </p>
              </div>
              <ContactDetails />
            </div>
            
            <div className="bg-[#FFF6DE] p-1 rounded-[40px] overflow-hidden">
              <LeadCapture hideHeader className="py-12 md:py-16" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
