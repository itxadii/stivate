import Footer from "@/components/layout/Footer";

export default function CookiePolicy() {
  return (
    <main className="relative w-full bg-transparent text-zinc-900 font-sans  pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 border-b border-slate-400 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Cookie Policy</h1>
          <p className="text-zinc-500 font-medium italic">Last updated: May 2026</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">1. What Are Cookies</h2>
          <p className="text-zinc-600 leading-relaxed">
            Cookies are small text files that are placed on your device when you visit a website. They help websites remember your preferences, understand how you use the site, and improve your experience over time. Cookies cannot run programs or deliver viruses to your device.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">2. What Cookies We Use</h2>
          <div className="space-y-6">
            <p className="text-zinc-600 leading-relaxed">We use only the following types of cookies:</p>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Essential Cookies</h3>
              <p className="text-zinc-600">These are required for the website to function properly. Without them, the site cannot load correctly. They do not track you and no consent is required.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden border border-slate-400">
                  <thead className="bg-zinc-50">
                    <tr>
                      <th className="p-4 font-bold text-zinc-900 border-b border-slate-400">Cookie</th>
                      <th className="p-4 font-bold text-zinc-900 border-b border-slate-400">Purpose</th>
                      <th className="p-4 font-bold text-zinc-900 border-b border-slate-400">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-600">
                    <tr>
                      <td className="p-4 border-b border-slate-400">Session cookie</td>
                      <td className="p-4 border-b border-slate-400">Keeps the website functional during your visit</td>
                      <td className="p-4 border-b border-slate-400">Session (deleted when browser closes)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold">Analytics Cookies (if enabled)</h3>
              <p className="text-zinc-600">These help us understand how visitors use our site — which pages are visited most, how long visitors stay, and where they come from. All data is anonymous and aggregated.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden border border-slate-400">
                  <thead className="bg-zinc-50">
                    <tr>
                      <th className="p-4 font-bold text-zinc-900 border-b border-slate-400">Cookie</th>
                      <th className="p-4 font-bold text-zinc-900 border-b border-slate-400">Provider</th>
                      <th className="p-4 font-bold text-zinc-900 border-b border-slate-400">Purpose</th>
                      <th className="p-4 font-bold text-zinc-900 border-b border-slate-400">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-600">
                    <tr>
                      <td className="p-4 border-b border-slate-400">_ga</td>
                      <td className="p-4 border-b border-slate-400">Google Analytics</td>
                      <td className="p-4 border-b border-slate-400">Tracks unique visitors</td>
                      <td className="p-4 border-b border-slate-400">2 years</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-slate-400">_ga_*</td>
                      <td className="p-4 border-b border-slate-400">Google Analytics</td>
                      <td className="p-4 border-b border-slate-400">Session tracking</td>
                      <td className="p-4 border-b border-slate-400">2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-zinc-900 font-bold leading-relaxed pt-4 italic">No marketing or advertising cookies are used on this website.</p>
            <p className="text-zinc-600">We do not run retargeting ads. We do not place Facebook Pixel, TikTok Pixel, or any ad network cookies on this site.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">3. Third Party Cookies</h2>
          <div className="space-y-4">
            <p className="text-zinc-600 leading-relaxed">Our website uses a small number of third party services that may set their own cookies:</p>
            <ul className="list-disc pl-6 text-zinc-600 space-y-2">
              <li><span className="font-bold text-zinc-900">Google Analytics</span> — anonymous website traffic analysis</li>
              <li><span className="font-bold text-zinc-900">Spline</span> — 3D interactive content in the hero section. Spline may set a functional cookie to render the 3D scene correctly.</li>
            </ul>
            <p className="text-zinc-600 leading-relaxed">We have no control over third party cookies. Please refer to each provider's own cookie policy for details.</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">4. How to Control Cookies</h2>
          <div className="space-y-4">
            <p className="text-zinc-600 leading-relaxed">You can control and delete cookies at any time through your browser settings:</p>
            <ul className="list-disc pl-6 text-zinc-600 space-y-2">
              <li><span className="font-bold text-zinc-900">Chrome:</span> Settings → Privacy and Security → Cookies</li>
              <li><span className="font-bold text-zinc-900">Firefox:</span> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><span className="font-bold text-zinc-900">Safari:</span> Preferences → Privacy → Manage Website Data</li>
              <li><span className="font-bold text-zinc-900">Edge:</span> Settings → Cookies and Site Permissions</li>
            </ul>
            <p className="text-zinc-600 leading-relaxed pt-2">Please note that disabling certain cookies may affect how the website works.</p>
            <p className="text-zinc-600 leading-relaxed">You can also opt out of Google Analytics tracking at: <a href="https://tools.google.com/dlpage/gaoptout" className="font-bold underline">tools.google.com/dlpage/gaoptout</a></p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">5. Do We Use Cookie Banners</h2>
          <p className="text-zinc-600 leading-relaxed">We display a cookie notice on first visit to inform you about cookie usage. Analytics cookies are only activated after you accept. Essential cookies run regardless as they are required for the site to function.</p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">6. Changes to This Policy</h2>
          <p className="text-zinc-600 leading-relaxed">We may update this Cookie Policy as our website or applicable laws change. The "Last updated" date at the top of this page will reflect any changes. We recommend checking this page periodically.</p>
        </section>

        <section className="space-y-6 border-t border-slate-400 pt-8">
          <h2 className="text-2xl font-bold">7. Contact Us</h2>
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


