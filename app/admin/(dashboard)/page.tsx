import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import {
  TrendingUp,
  TrendingDown,
  Scale,
  CheckCircle2,
  Clock,
  Activity as ActivityIcon,
  Calendar,
  AlertCircle,
  Building
} from "lucide-react"
import Link from "next/link"
import DashboardCharts from "./DashboardCharts"

const exchangeRates: Record<string, number> = {
  USD: 1.0,
  EUR: 1.08,
  GBP: 1.27,
  INR: 0.012,
  AED: 0.272,
  CAD: 0.73,
  AUD: 0.66,
  SGD: 0.74,
}

export default async function AdminDashboard() {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  // Fetch actual data from database
  const invoices = await prisma.invoice.findMany({
    where: { isArchived: false },
  })

  const expenses = await prisma.expense.findMany({
    where: { isArchived: false },
  })

  const recentActivities = await prisma.activity.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: true,
    },
  })

  // Calculate upcoming deadlines (projects that are not completed/archived and have due dates)
  const upcomingProjects = await prisma.project.findMany({
    where: {
      isArchived: false,
      status: { notIn: ["COMPLETED", "ARCHIVED"] },
      dueDate: { not: null },
    },
    include: {
      client: true,
    },
    orderBy: {
      dueDate: "asc",
    },
    take: 5,
  })

  // Currency Converter to USD Base
  const convertToUSD = (amount: number, currency: string) => {
    const rate = exchangeRates[currency.toUpperCase()] || 1.0
    return amount * rate
  }

  // Group last 6 months cashflow trend
  const last6Months = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    return {
      monthName: d.toLocaleString("default", { month: "short" }),
      year: d.getFullYear(),
      monthNum: d.getMonth(),
      revenue: 0,
      expenses: 0,
    }
  }).reverse()

  // Aggregate Metrics
  let totalRevenue = 0
  let completedPayments = 0
  let pendingPayments = 0

  invoices.forEach((inv) => {
    const amountUSD = convertToUSD(inv.amount, inv.currency)
    const paidUSD = convertToUSD(inv.paidAmount, inv.currency)

    // Total Revenue: Sum of all PAID invoices
    if (inv.status === "PAID") {
      totalRevenue += amountUSD
    }

    // Completed Payments: Total paid amount across all invoices
    completedPayments += paidUSD

    // Pending Payments: Sum of outstanding balances on SENT or OVERDUE invoices
    if (inv.status === "SENT" || inv.status === "OVERDUE") {
      const balance = amountUSD - paidUSD
      if (balance > 0) {
        pendingPayments += balance
      }
    }

    // Add paid amount to month's revenue if paid
    if (inv.status === "PAID" && inv.issueDate) {
      const date = new Date(inv.issueDate)
      const monthIndex = last6Months.findIndex(
        (m) => m.monthNum === date.getMonth() && m.year === date.getFullYear()
      )
      if (monthIndex !== -1) {
        last6Months[monthIndex].revenue += amountUSD
      }
    }
  })

  // Total Expenses: Sum of all active expenses, and aggregate by category
  const categoryTotals: Record<string, number> = {}
  expenses.forEach((exp) => {
    const amtUSD = convertToUSD(exp.amount, exp.currency)
    // Add to monthly cashflow
    if (exp.date) {
      const date = new Date(exp.date)
      const monthIndex = last6Months.findIndex(
        (m) => m.monthNum === date.getMonth() && m.year === date.getFullYear()
      )
      if (monthIndex !== -1) {
        last6Months[monthIndex].expenses += amtUSD
      }
    }
    // Add to categories
    const cat = exp.category || "Other"
    categoryTotals[cat] = (categoryTotals[cat] || 0) + amtUSD
  })

  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + convertToUSD(exp.amount, exp.currency),
    0
  )

  const netProfit = totalRevenue - totalExpenses

  // Convert categories to format needed for the charts
  const totalCategoryExpenses = Object.values(categoryTotals).reduce((a, b) => a + b, 0)
  const categoryData = Object.entries(categoryTotals).map(([category, value]) => ({
    category,
    value,
    percentage: totalCategoryExpenses > 0 ? (value / totalCategoryExpenses) * 100 : 0,
  })).sort((a, b) => b.value - a.value)

  const summaryData = {
    totalRevenue,
    totalExpenses,
    netProfit,
    completedPayments,
    pendingPayments,
  }

  const monthlyData = last6Months.map((m) => ({
    monthName: m.monthName,
    revenue: m.revenue,
    expenses: m.expenses,
  }))

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Financial Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Real-time summary of revenue, operating expenses, and invoicing cashflow in USD equivalent.
        </p>
      </div>

      {/* Metrics Row and Charts */}
      <DashboardCharts monthlyData={monthlyData} categoryData={categoryData} summaryData={summaryData} />

      {/* Two Column Layout: Activity and Deadlines */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity Card */}
        <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <ActivityIcon className="h-5 w-5 text-gray-400" />
              Recent Activity Logs
            </h3>
          </div>
          <div className="p-6">
            {recentActivities.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
                No recent activity records.
              </p>
            ) : (
              <div className="flow-root">
                <ul className="-mb-8">
                  {recentActivities.map((act: any, actIdx: number) => {
                    const actionName = act.action.toUpperCase()
                    let colorClass = "bg-gray-400"
                    if (actionName === "CREATED") colorClass = "bg-blue-500"
                    else if (actionName === "UPDATED" || actionName === "PAID") colorClass = "bg-emerald-500"
                    else if (actionName === "ARCHIVED") colorClass = "bg-red-500"

                    return (
                      <li key={act.id}>
                        <div className="relative pb-8">
                          {actIdx !== recentActivities.length - 1 ? (
                            <span
                              className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-800"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span
                                className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-900 ${colorClass} text-white font-bold text-xs`}
                              >
                                {act.entityType[0]}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0 pt-1.5">
                              <p className="text-sm text-gray-700 dark:text-gray-300">
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  {act.user.name || act.user.email}
                                </span>{" "}
                                {act.action.toLowerCase()}{" "}
                                a <span className="font-medium text-blue-650 dark:text-blue-400">{act.entityType}</span>
                              </p>
                              {act.metadata && typeof act.metadata === "object" && (
                                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/40 px-2 py-1 rounded border border-gray-100 dark:border-gray-800 inline-block">
                                  {JSON.stringify(act.metadata)}
                                </div>
                              )}
                              <span className="text-xs text-gray-400 dark:text-gray-500 block mt-1">
                                {new Date(act.createdAt).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Deadlines Card */}
        <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-150 dark:border-gray-800 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              Upcoming Project Deadlines
            </h3>
          </div>
          <div className="p-6">
            {upcomingProjects.length === 0 ? (
              <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center space-y-2">
                <AlertCircle className="h-8 w-8 text-gray-300" />
                <p>No upcoming project deadlines found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingProjects.map((project) => {
                  const today = new Date()
                  const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
                  const projectDue = project.dueDate ? new Date(project.dueDate) : null
                  
                  let daysRemaining: number | null = null
                  let formattedDate = ""

                  if (projectDue) {
                    const dueUTC = Date.UTC(projectDue.getUTCFullYear(), projectDue.getUTCMonth(), projectDue.getUTCDate())
                    const diffTime = dueUTC - todayUTC
                    daysRemaining = Math.round(diffTime / (1000 * 60 * 60 * 24))
                    
                    // Format date in UTC to match the DB calendar day exactly
                    formattedDate = projectDue.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "UTC"
                    })
                  }

                  let badgeText = "No date"
                  let badgeColor = "bg-slate-50 text-slate-700 ring-slate-600/10 dark:bg-slate-800 dark:text-slate-400"

                  if (daysRemaining !== null) {
                    if (daysRemaining < 0) {
                      const absoluteDays = Math.abs(daysRemaining)
                      badgeText = `${absoluteDays} ${absoluteDays === 1 ? "day" : "days"} overdue`
                      badgeColor = "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-950/30 dark:text-red-400 font-bold border border-red-200/20"
                    } else if (daysRemaining === 0) {
                      badgeText = "Due today"
                      badgeColor = "bg-rose-50 text-rose-750 ring-rose-650/20 dark:bg-rose-950/40 dark:text-rose-450 font-bold animate-pulse border border-rose-200/30"
                    } else if (daysRemaining === 1) {
                      badgeText = "Due tomorrow"
                      badgeColor = "bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200/20"
                    } else if (daysRemaining <= 7) {
                      badgeText = `${daysRemaining} days left`
                      badgeColor = "bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200/20"
                    } else {
                      badgeText = `${daysRemaining} days left`
                      badgeColor = "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200/10"
                    }
                  }

                  return (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition gap-4"
                    >
                      <div className="min-w-0">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 hover:underline block truncate"
                        >
                          {project.name}
                        </Link>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          <Building className="w-3.5 h-3.5 text-gray-400" />
                          <span>{project.client.name}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${badgeColor}`}
                        >
                          {badgeText}
                        </span>
                        <span className="text-2xs text-gray-450 dark:text-gray-500 block mt-1 font-medium">
                          {formattedDate}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
