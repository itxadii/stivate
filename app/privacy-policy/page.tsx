import Footer from "@/components/layout/Footer";

export default function PrivacyPolicy() {
  return (
    <main className="relative w-full bg-transparent text-zinc-900 font-sans  pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 border-b border-slate-400 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-zinc-500 font-medium italic">Last updated: May 2026</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">1. Who We Are</h2>
          <p className="text-zinc-600 leading-relaxed">
            Stivate is an IT automation and digitalization company based in India. We help businesses grow by building websites, WhatsApp automation systems, custom CRMs, and business process automation tools. Our website is located at stivate.com. For any privacy-related questions, contact us at <a href="mailto:hello@stivate.com" className="font-bold underline">hello@stivate.com</a>.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">2. What Information We Collect</h2>
          <div className="space-y-4">
            <p className="text-zinc-600 leading-relaxed font-bold">Information you give us directly:</p>
            <ul className="list-disc pl-6 text-zinc-600 space-y-2">
              <li>Full name</li>
              <li>WhatsApp number</li>
              <li>Business type</li>
              <li>Details about your business challenges (submitted via our contact form)</li>
            </ul>
            
            <p className="text-zinc-600 leading-relaxed font-bold">Information collected automatically when you visit our website:</p>
            <ul className="list-disc pl-6 text-zinc-600 space-y-2">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages you visit and time spent</li>
              <li>Device type (mobile, desktop, tablet)</li>
              <li>Referring website (how you found us)</li>
            </ul>
            <p className="text-zinc-600 leading-relaxed">We do not collect any sensitive personal data such as financial information, government IDs, or health data.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
          <div className="space-y-4">
            <p className="text-zinc-600 leading-relaxed">We use the information you provide to:</p>
            <ul className="list-disc pl-6 text-zinc-600 space-y-2">
              <li>Respond to your enquiry or free consultation request</li>
              <li>Contact you via WhatsApp or email about your project</li>
              <li>Understand what services are most relevant to your business</li>
              <li>Improve our website and services based on how visitors use them</li>
              <li>Send occasional updates about our services (only if you have opted in)</li>
            </ul>
            <p className="text-zinc-600 leading-relaxed">We do not use your data for automated decision-making or profiling.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">4. Who We Share Your Data With</h2>
          <div className="space-y-4">
            <p className="text-zinc-600 leading-relaxed">We do not sell, rent, or trade your personal information to any third party. We only share data with:</p>
            <ul className="list-disc pl-6 text-zinc-600 space-y-2">
              <li><span className="font-bold text-zinc-900">Web3Forms</span> — our form submission service that delivers your enquiry to our inbox. Their privacy policy is available at web3forms.com.</li>
              <li><span className="font-bold text-zinc-900">Vercel / hosting provider</span> — our website hosting platform which processes server logs.</li>
              <li><span className="font-bold text-zinc-900">Google Analytics (if enabled)</span> — for anonymous website traffic analysis.</li>
            </ul>
            <p className="text-zinc-600 leading-relaxed">All third parties we work with are required to handle your data securely and are not permitted to use it for their own marketing.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">5. How Long We Keep Your Data</h2>
          <ul className="list-disc pl-6 text-zinc-600 space-y-2">
            <li>Contact form submissions are kept for up to 12 months, after which they are deleted.</li>
            <li>Website analytics data is retained for up to 26 months in aggregated, anonymous form.</li>
            <li>If you ask us to delete your data at any point, we will do so within 7 business days.</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">6. How We Protect Your Data</h2>
          <div className="space-y-4">
            <p className="text-zinc-600 leading-relaxed">We take reasonable technical and organisational measures to protect your information, including:</p>
            <ul className="list-disc pl-6 text-zinc-600 space-y-2">
              <li>HTTPS encryption on all pages of our website</li>
              <li>Restricted access to form submission data</li>
              <li>No storage of personal data in unsecured systems</li>
            </ul>
            <p className="text-zinc-600 leading-relaxed">However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but we take it seriously.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">7. Your Rights</h2>
          <div className="space-y-4">
            <p className="text-zinc-600 leading-relaxed">You have the right to:</p>
            <ul className="list-disc pl-6 text-zinc-600 space-y-2">
              <li><span className="font-bold text-zinc-900">Access</span> — ask us what personal data we hold about you</li>
              <li><span className="font-bold text-zinc-900">Correction</span> — ask us to correct inaccurate data</li>
              <li><span className="font-bold text-zinc-900">Deletion</span> — ask us to delete your data at any time</li>
              <li><span className="font-bold text-zinc-900">Objection</span> — object to us using your data for marketing</li>
              <li><span className="font-bold text-zinc-900">Withdrawal</span> — withdraw any consent you have given at any time</li>
            </ul>
            <p className="text-zinc-600 leading-relaxed">To exercise any of these rights, email us at <a href="mailto:hello@stivate.com" className="font-bold underline">hello@stivate.com</a>. We will respond within 7 business days.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">8. Third Party Links</h2>
          <p className="text-zinc-600 leading-relaxed">Our website may contain links to third party websites such as LinkedIn, WhatsApp, or partner tools. We are not responsible for the privacy practices of those websites and encourage you to read their privacy policies.</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">9. Children's Privacy</h2>
          <p className="text-zinc-600 leading-relaxed">Our services are not directed at children under the age of 13. We do not knowingly collect personal data from children. If you believe a child has submitted data to us, please contact us immediately at <a href="mailto:hello@stivate.com" className="font-bold underline">hello@stivate.com</a>.</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">10. Changes to This Policy</h2>
          <p className="text-zinc-600 leading-relaxed">We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically. Continued use of our website after any changes means you accept the updated policy.</p>
        </section>

        <section className="space-y-6 border-t border-slate-400 pt-8">
          <h2 className="text-2xl font-bold">11. Contact Us</h2>
          <div className="space-y-2 text-zinc-600">
            <p className="font-bold text-zinc-900">Stivate</p>
            <p>Email: <a href="mailto:hello@stivate.com" className="underline font-medium">hello@stivate.com</a></p>
            <p>Website: <a href="https://stivate.com" className="underline font-medium">stivate.com</a></p>
          </div>
        </section>
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </main>
  );
}


