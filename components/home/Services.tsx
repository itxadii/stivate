import Image from "next/image";
import Link from "next/link";
import PremiumButton from "@/components/ui/PremiumButton";

interface Service {
  image: string;
  title: string;
  subtitle: string;
  desc: string;
  quote: string;
  buttonLabel: string;
}

const services: Service[] = [
  {
    image: "/systems/wmsautomation.png",
    title: "Warehouse & WMS Automation",
    subtitle: "QR tracking, OCR, & ERP sync.",
    desc: "We build cloud-native warehouse applications with QR-based inventory tracking, OCR document extraction, and seamless SAP/ERP synchronization.",
    quote: "\"No more manual inventory matching or delayed stock updates.\"",
    buttonLabel: "Explore Logistics Solutions",
  },
  {
    image: "/systems/logisticsautomation.png",
    title: "Logistics Workflow Automation",
    subtitle: "Connect operations, save time.",
    desc: "We connect dispatch routing, vehicle status tracking, automated customer order alerts, and operational reports into single-pane dashboards.",
    quote: "\"We synchronized dispatch routing for 500+ daily trucks automatically.\"",
    buttonLabel: "Explore Systems",
  },
  {
    image: "/systems/customcrm.png",
    title: "Custom Enterprise CRM",
    subtitle: "Stop running from spreadsheets.",
    desc: "Get a custom CRM built for your exact operational workflow — manage clients, track document collection, automate invoicing and HR pipelines.",
    quote: "\"Total visibility into workspace rentals, billing and outstanding dues.\"",
    buttonLabel: "View CRM Systems",
  },
  {
    image: "/systems/customwebsite.png",
    title: "Professional Website",
    subtitle: "High-performance digital presence.",
    desc: "We build lightning-fast, mobile-first websites with interactive lead generation, WhatsApp integrations, and secure headless CMS dashboards.",
    quote: "\"Finally, a web portal that drives corporate inquiries 24/7.\"",
    buttonLabel: "View Website Plans",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 px-6 md:px-12 bg-transparent text-zinc-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-3">
            What we build for you
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
            Four systems that transform your business
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map(({ image, title, subtitle, desc, quote, buttonLabel }, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white border border-slate-400 hover:border-slate-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="w-full h-52 relative">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-1 text-zinc-900">{title}</h3>
                  <p className="text-zinc-400 text-sm font-medium mb-3">{subtitle}</p>
                  <p className="text-zinc-600 text-base leading-relaxed mb-6">{desc}</p>
                  <p className="text-zinc-400 text-sm italic mb-6">{quote}</p>
                </div>
              </div>
              <div className="px-8 pb-8">
                <Link href={buttonLabel.includes("Website") ? "/websites" : "/work"}>
                  <PremiumButton variant="secondary" className="w-full sm:w-auto">
                    {buttonLabel}
                  </PremiumButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

