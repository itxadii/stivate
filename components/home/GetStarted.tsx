"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createEnquiry } from "@/lib/actions/enquiry";

const businessTypes = [
  "Manufacturing / Plant Operations",
  "Warehousing & Storage",
  "Third Party Logistics (3PL)",
  "FMCG / Distribution",
  "Food Processing & Packaged Goods",
  "Automotive / Component Plant",
  "Pharmaceutical / Chemical",
  "Textiles & Engineering",
  "Other Industrial Operations",
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
    email: "",
    whatsapp: "",
    businessType: "",
    erpSystem: "",
    challenge: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createEnquiry(formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 text-sm";

  return (
    <section
      id="contact"
      className={`py-24 px-6 md:px-12 bg-[#E8F4FD] border border-slate-200 relative overflow-hidden rounded-3xl mx-auto max-w-[98%] my-12 shadow-md ${className}`}
    >
      <div className="max-w-xl mx-auto relative z-10">

        {/* Header */}
        {!hideHeader && (
          <div className="text-center mb-12">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50/80 backdrop-blur-md text-xs font-bold text-zinc-600">
              Free Process Audit
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-zinc-950">
              Ready to Automate
              <br />
              <span className="text-primary font-black">Your Operations?</span>
            </h2>
            <p className="text-zinc-600 text-sm font-medium leading-relaxed">
              Get a free 30-minute operational process audit. We will review your current systems of record and highlight immediate digitizing opportunities.
            </p>
          </div>
        )}

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 p-8 rounded-3xl bg-white border border-slate-200 shadow-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider mb-2">Contact Name</label>
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
                <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider mb-2">Corporate Email</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider mb-2">WhatsApp / Phone</label>
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
                <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider mb-2">Industry Sector</label>
                <select
                  required
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className={inputClass}
                >
                  <option value="" disabled>Select sector...</option>
                  {businessTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider mb-2">
                Current ERP / System of Record (e.g., SAP, Excel, Tally)
              </label>
              <input
                type="text"
                required
                placeholder="e.g. SAP ECC 6.0 and offline Excel tracking sheets"
                value={formData.erpSystem}
                onChange={(e) => setFormData({ ...formData, erpSystem: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-zinc-700 text-xs font-bold uppercase tracking-wider mb-2">
                Biggest Operational Bottleneck (e.g. gate delays, duplicate data entry)
              </label>
              <textarea
                required
                rows={3}
                placeholder="e.g. We spend 3 hours daily typing receiving tallies from packing lists into our inventory portal..."
                value={formData.challenge}
                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center py-3.5 rounded-xl bg-primary text-primary-foreground font-black hover:bg-primary-hover shadow-md hover:shadow-lg transition-all text-center text-sm cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {loading ? "Registering Request..." : "Submit Process Audit Request"}
            </button>

            <p className="text-center text-zinc-400 text-xxs pt-1">
              We respond to audit requests within 2 hours. Your data is kept strictly confidential.
            </p>
          </form>
        ) : (
          <div className="text-center p-12 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={20} className="text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-3">Audit Request Received!</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              We have received your operations profile. An automation engineer will contact you shortly on WhatsApp or email to schedule your call.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

