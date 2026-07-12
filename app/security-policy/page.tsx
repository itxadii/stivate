import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Policy | Stivate",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/security-policy",
  },
};


export default function SecurityPolicy() {
  return (
    <main className="relative w-full bg-transparent text-zinc-900 font-sans pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 border-b border-slate-400 pb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Security Policy</h1>
          <p className="text-zinc-500 font-medium italic">Last updated: June 2026</p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">1. Security Commitment</h2>
          <p className="text-zinc-600 leading-relaxed">
            At Stivate, we understand that client and business operational data is highly sensitive. We are committed to maintaining the confidentiality, integrity, and availability of all data processed within our CRM and customer systems. This Security Policy outlines the practices we follow to protect our systems and your data.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">2. Infrastructure & Data Hosting</h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            <p>Our infrastructure is designed for high-availability, scalability, and security:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-bold text-zinc-900">Hosting:</span> Our web servers are hosted on Vercel's global edge network, providing secure, DDoS-resistant, and high-performance serverless endpoints.</li>
              <li><span className="font-bold text-zinc-900">Database:</span> Operations data is hosted on Neon serverless PostgreSQL, executing within secure AWS clouds with automatic scaling and replication.</li>
              <li><span className="font-bold text-zinc-900">Encryption in Transit:</span> All web connections are encrypted using modern SSL/TLS (HTTPS) protocols, enforcing secure cryptographic suites.</li>
              <li><span className="font-bold text-zinc-900">Backups:</span> Database snapshots are captured automatically every 24 hours and retained securely for recovery in case of hardware failures.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">3. Authentication & Access Control</h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            <p>We restrict systems access strictly based on the principle of least privilege:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-bold text-zinc-900">NextAuth Verification:</span> Internal admin views are guarded by NextAuth v5 session checks linked to Google Workspace OAuth. Only whitelisted workspace emails are permitted to create a session.</li>
              <li><span className="font-bold text-zinc-900">Role-Based Access Control (RBAC):</span> Access to business tools (clients, invoices, pricing estimations) is regulated by roles: <code className="bg-zinc-100 px-1 py-0.5 rounded text-xs font-mono text-zinc-800">ADMIN</code>, <code className="bg-zinc-100 px-1 py-0.5 rounded text-xs font-mono text-zinc-800">MANAGER</code>, and <code className="bg-zinc-100 px-1 py-0.5 rounded text-xs font-mono text-zinc-800">STAFF</code>.</li>
              <li><span className="font-bold text-zinc-900">Session Expiry:</span> Session JSON Web Tokens (JWT) are signed cryptographically and automatically expire after a set period of inactivity, requiring re-authentication.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">4. Software & Application Security</h2>
          <div className="space-y-4 text-zinc-600 leading-relaxed">
            <p>We build our codebases using secure coding standards to mitigate threat vectors:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-bold text-zinc-900">Prisma ORM Protection:</span> All SQL queries are compiled and parameterized using Prisma ORM to completely eliminate SQL injection vulnerabilities.</li>
              <li><span className="font-bold text-zinc-900">XSS Prevention:</span> React and Next.js natively sanitize variable rendering to prevent cross-site scripting (XSS) attacks.</li>
              <li><span className="font-bold text-zinc-900">Package Auditing:</span> We regularly audit our project dependencies using automated vulnerability checking tools to resolve outdated package alerts.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold">5. Vulnerability Disclosure</h2>
          <p className="text-zinc-600 leading-relaxed">
            Stivate welcomes reports from security researchers and operators. If you discover a potential vulnerability or security issue within our applications or website, please contact us immediately at <a href="mailto:hello@stivate.com" className="font-bold underline text-zinc-900 hover:text-black">hello@stivate.com</a>. We commit to acknowledging your report within 48 hours and working promptly to investigate and patch the issue.
          </p>
        </section>

        <section className="space-y-6 border-t border-slate-400 pt-8">
          <h2 className="text-2xl font-bold">6. Contact Information</h2>
          <div className="space-y-2 text-zinc-600">
            <p className="font-bold text-zinc-900">Stivate Security Operations</p>
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
