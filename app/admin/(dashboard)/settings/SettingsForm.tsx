"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Coins, Percent, Bell, Shield, Eye, Check, Save, RotateCcw, AlertCircle } from "lucide-react"

export default function SettingsForm() {
  const [mounted, setMounted] = useState(false)
  
  // State for settings
  const [theme, setTheme] = useState("light")
  const [defaultCurrency, setDefaultCurrency] = useState("AED")
  const [defaultTaxRate, setDefaultTaxRate] = useState(0)
  const [autoTax, setAutoTax] = useState(false)
  const [leadAlerts, setLeadAlerts] = useState(true)
  const [backupDigest, setBackupDigest] = useState(false)
  const [defaultTerms, setDefaultTerms] = useState("Payment is due within 15 days of invoice date.")
  
  // Action status
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  // Initialize from localStorage on mount
  useEffect(() => {
    setMounted(true)
    
    const localTheme = localStorage.getItem("theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    setTheme(localTheme)
    
    setDefaultCurrency(localStorage.getItem("settings_defaultCurrency") || "AED")
    setDefaultTaxRate(Number(localStorage.getItem("settings_defaultTaxRate") || "0"))
    setAutoTax(localStorage.getItem("settings_autoTax") === "true")
    setLeadAlerts(localStorage.getItem("settings_leadAlerts") !== "false") // default to true
    setBackupDigest(localStorage.getItem("settings_backupDigest") === "true")
    setDefaultTerms(localStorage.getItem("settings_defaultTerms") || "Payment is due within 15 days of invoice date.")
  }, [])

  // Handle immediate theme switch
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
    
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  // Save all settings to localStorage
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    
    // Simulate minor network delay for premium feel
    setTimeout(() => {
      localStorage.setItem("settings_defaultCurrency", defaultCurrency)
      localStorage.setItem("settings_defaultTaxRate", defaultTaxRate.toString())
      localStorage.setItem("settings_autoTax", autoTax.toString())
      localStorage.setItem("settings_leadAlerts", leadAlerts.toString())
      localStorage.setItem("settings_backupDigest", backupDigest.toString())
      localStorage.setItem("settings_defaultTerms", defaultTerms)
      
      setSaving(false)
      setSuccess(true)
      
      // Clear success notification after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    }, 600)
  }

  // Reset to default settings
  const handleReset = () => {
    if (confirm("Are you sure you want to reset all preferences to defaults?")) {
      setDefaultCurrency("AED")
      setDefaultTaxRate(0)
      setAutoTax(false)
      setLeadAlerts(true)
      setBackupDigest(false)
      setDefaultTerms("Payment is due within 15 days of invoice date.")
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
      {success && (
        <div className="flex items-center gap-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4 text-emerald-800 dark:text-emerald-400 animate-in fade-in slide-in-from-top-4 duration-300">
          <Check className="h-5 w-5 text-emerald-500 shrink-0" />
          <p className="text-sm font-medium">Preferences saved successfully!</p>
        </div>
      )}

      {/* Grid containing Settings sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Appearance Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-indigo-650 dark:text-indigo-400">
              {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Appearance Theme</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Customize the application look and feel.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme Mode</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 dark:bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none ring-2 ring-offset-2 ring-transparent dark:ring-offset-gray-900 focus:ring-indigo-500"
              >
                <span className="sr-only">Toggle theme</span>
                <span
                  className={`${
                    theme === "dark" ? "translate-x-5" : "translate-x-0"
                  } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-900 shadow-sm ring-0 transition duration-200 ease-in-out`}
                >
                  <span
                    className={`${
                      theme === "dark" ? "opacity-0 duration-100 ease-out" : "opacity-100 duration-200 ease-in"
                    } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                    aria-hidden="true"
                  >
                    <Sun className="h-3 w-3 text-amber-500" />
                  </span>
                  <span
                    className={`${
                      theme === "dark" ? "opacity-100 duration-200 ease-in" : "opacity-0 duration-100 ease-out"
                    } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
                    aria-hidden="true"
                  >
                    <Moon className="h-3 w-3 text-indigo-400" />
                  </span>
                </span>
              </button>
            </div>
            
            <div className="rounded-lg bg-gray-50 dark:bg-gray-800/40 p-4 border border-gray-150 dark:border-gray-800">
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Currently using <span className="font-semibold text-indigo-650 dark:text-indigo-400 capitalize">{theme} Mode</span>. Switch modes to update the dashboard style.
              </p>
            </div>
          </div>
        </div>

        {/* Default Financial Settings Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg text-amber-655 dark:text-amber-450">
              <Coins className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Document Defaults</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Prepopulate settings for new quotations & invoices.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Default Currency
              </label>
              <select
                value={defaultCurrency}
                onChange={(e) => setDefaultCurrency(e.target.value)}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-850 dark:text-white dark:ring-gray-700"
              >
                <option value="AED">AED (د.إ)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
                <option value="CAD">CAD (CA$)</option>
                <option value="AUD">AUD (A$)</option>
                <option value="SGD">SGD (SG$)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                  Default Tax Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={defaultTaxRate}
                    onChange={(e) => setDefaultTaxRate(Number(e.target.value))}
                    className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-850 dark:text-white dark:ring-gray-700"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <Percent className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex items-end pb-1.5">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoTax"
                    checked={autoTax}
                    onChange={(e) => setAutoTax(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
                  />
                  <label htmlFor="autoTax" className="ml-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer selection:bg-transparent">
                    Auto-apply tax
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Preference Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-50 dark:bg-rose-950/40 rounded-lg text-rose-650 dark:text-rose-455">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">System Alerts</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Configure email & dashboard notifications.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block">Lead Alerts</span>
                <span className="text-xs text-gray-550 dark:text-gray-400">Notify when new lead submits contact form.</span>
              </div>
              <button
                type="button"
                onClick={() => setLeadAlerts(!leadAlerts)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ring-2 ring-offset-2 ring-transparent dark:ring-offset-gray-900 focus:ring-indigo-500 ${
                  leadAlerts ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`${
                    leadAlerts ? "translate-x-5" : "translate-x-0"
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>

            <hr className="border-gray-150 dark:border-gray-800" />

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 block">Backup Digests</span>
                <span className="text-xs text-gray-550 dark:text-gray-400">Email daily backup snapshots summary.</span>
              </div>
              <button
                type="button"
                onClick={() => setBackupDigest(!backupDigest)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ring-2 ring-offset-2 ring-transparent dark:ring-offset-gray-900 focus:ring-indigo-500 ${
                  backupDigest ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`${
                    backupDigest ? "translate-x-5" : "translate-x-0"
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security & Access Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-650 dark:text-emerald-450">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Workspace Security</h2>
              <p className="text-xs text-gray-550 dark:text-gray-400">General administration lock preferences.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-250 dark:border-amber-900/50 p-4">
              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400">Strict Administration Active</h4>
                <p className="text-xs text-amber-700 dark:text-amber-500 leading-relaxed mt-1">
                  Only users logged in with pre-approved corporate Google accounts are allowed inside the panel layout.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>MFA Integration</span>
              <span className="font-semibold text-gray-750 dark:text-gray-300">Managed by Google Auth</span>
            </div>
          </div>
        </div>

        {/* Default Terms & Conditions Textarea */}
        <div className="md:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-50 dark:bg-purple-950/40 rounded-lg text-purple-650 dark:text-purple-400">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Default Invoice Terms</h2>
              <p className="text-xs text-gray-550 dark:text-gray-400">Appends standard statements to new PDF invoice prints.</p>
            </div>
          </div>

          <div>
            <textarea
              rows={3}
              value={defaultTerms}
              onChange={(e) => setDefaultTerms(e.target.value)}
              className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm dark:bg-gray-850 dark:text-white dark:ring-gray-700 font-sans"
              placeholder="e.g. Payment is due within 15 days of invoice date."
            />
          </div>
        </div>

      </div>

      {/* Actions buttons */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 rounded-md bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition"
        >
          <RotateCcw className="w-4 h-4 text-gray-500" />
          Reset to Defaults
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-1.5 rounded-md bg-blue-650 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 transition"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving Preferences..." : "Save Preferences"}
        </button>
      </div>
    </form>
  )
}
