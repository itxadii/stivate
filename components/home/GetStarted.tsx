"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import ModernButton from "../ui/ModernButton";

const businessTypes = [
  "Retail Store",
  "Restaurant / Food Business",
  "Coaching / Training Institute",
  "Healthcare / Clinic",
  "Logistics / Transport",
  "Real Estate",
  "Service Business",
  "Manufacturing",
  "E-commerce",
  "Other",
];

export default function LeadCapture({
  className = "",
  hideHeader = false
}: {
  className?: string;
  hideHeader?: boolean;
}) {
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    businessType: "",
    challenge: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("access_key", "dc080f7f-2531-4b32-864f-71eb3d5f7a27");
    data.append("name", formData.name);
    data.append("whatsapp", formData.whatsapp);
    data.append("businessType", formData.businessType);
    data.append("challenge", formData.challenge);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const resData = await response.json();
      if (resData.success) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-5 py-3.5 rounded-xl bg-white border border-slate-400 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-all duration-200 text-base"

  return (
    <section
      id="contact"
      className={`py-24 px-6 md:px-12 bg-transparent relative overflow-hidden ${className}`}
    >
      <div className="max-w-xl mx-auto relative z-10">

        {/* Header */}
        {!hideHeader && (
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-400 bg-white text-sm font-medium text-zinc-500">
              Free Strategy Session
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-zinc-900">
              Ready to digitalize
              <br />
              <span className="text-zinc-400">your business?</span>
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed">
              Get a free 30-minute strategy session. No sales pitch, no pressure.
            </p>
          </div>
        )}

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-8 rounded-3xl bg-white border border-slate-400 shadow-sm"
          >
            <div>
              <label className="block text-zinc-700 text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                required
                placeholder="Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-zinc-700 text-sm font-semibold mb-2">WhatsApp Number</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-zinc-700 text-sm font-semibold mb-2">Your Business Type</label>
              <select
                required
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                className={inputClass}
              >
                <option value="" disabled>Select your industry...</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-zinc-700 text-sm font-semibold mb-2">
                What's your biggest challenge right now?
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. We lose leads because we can't follow up fast enough..."
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>

            <ModernButton
              type="submit"
              disabled={loading}
              label={loading ? "Sending..." : "Book My Free Session →"}
              className="w-full py-4 text-base !rounded-xl"
            />

            <p className="text-center text-zinc-400 text-sm pt-1">
              We reply within 2 hours on WhatsApp. No spam. Ever.
            </p>
          </form>
        ) : (
          <div className="text-center p-12 rounded-3xl bg-white border border-slate-400 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-green-100 border border-green-200 flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-3">We'll be in touch on WhatsApp!</h3>
            <p className="text-zinc-500">Expect a message within 2 hours. Get ready to grow.</p>
          </div>
        )}
      </div>
    </section>
  );
}

