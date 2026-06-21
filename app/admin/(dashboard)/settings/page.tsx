import SettingsForm from "./SettingsForm"
import { Settings } from "lucide-react"

export const metadata = {
  title: "Settings — Stivate Admin",
  description: "Manage system preferences, default invoice rates, notification alerts, and theme visual parameters.",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Settings Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-650 dark:text-blue-400">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Workspace Settings</h1>
          <p className="text-sm text-gray-550 dark:text-gray-400">Configure visual themes, invoice defaults, and administrative notification rules.</p>
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-800" />

      {/* Main Settings Form */}
      <SettingsForm />
    </div>
  )
}
