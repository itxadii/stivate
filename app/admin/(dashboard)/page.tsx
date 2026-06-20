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

  // Calculate upcoming deadlines (projects that are not completed/archived and have due dates in future)
  const upcomingProjects = await prisma.project.findMany({
    where: {
      isArchived: false,
      status: { notIn: ["COMPLETED", "ARCHIVED"] },
      dueDate: { gte: new Date() },
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
  })

  // Total Expenses: Sum of all active expenses
  const totalExpenses = expenses.reduce(
    (sum, exp) => sum + convertToUSD(exp.amount, exp.currency),
    0
  )

  // Net Profit: Total Revenue - Total Expenses
  const netProfit = totalRevenue - totalExpenses

  // Format Helper
  const formatUSD = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(val)
  }

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

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {/* Total Revenue Card */}
        <div className="group overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm border border-gray-150 dark:border-gray-800 hover:shadow-md hover:scale-[1.01] transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md bg-emerald-50 dark:bg-emerald-950/30 p-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition">
              <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="ml-4 w-0 flex-1">
              <p className="truncate text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Total Revenue
              </p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
                {formatUSD(totalRevenue)}
              </h3>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Paid invoices total value
            </span>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="group overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm border border-gray-150 dark:border-gray-800 hover:shadow-md hover:scale-[1.01] transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md bg-rose-50 dark:bg-rose-950/30 p-3 group-hover:bg-rose-100 dark:group-hover:bg-rose-900/40 transition">
              <TrendingDown className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
            <div className="ml-4 w-0 flex-1">
              <p className="truncate text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Total Expenses
              </p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
                {formatUSD(totalExpenses)}
              </h3>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Active operating costs
            </span>
            <Link
              href="/admin/expenses"
              className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              View list
            </Link>
          </div>
        </div>

        {/* Net Profit Card */}
        <div className="group overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm border border-gray-150 dark:border-gray-800 hover:shadow-md hover:scale-[1.01] transition-all duration-200">
          <div className="flex items-center">
            <div
              className={`flex-shrink-0 rounded-md p-3 transition ${
                netProfit >= 0
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 group-hover:bg-emerald-100"
                  : "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-400 group-hover:bg-rose-100"
              }`}
            >
              <Scale className="h-6 w-6" />
            </div>
            <div className="ml-4 w-0 flex-1">
              <p className="truncate text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Net Profit
              </p>
              <h3
                className={`text-xl font-bold mt-0.5 ${
                  netProfit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                }`}
              >
                {formatUSD(netProfit)}
              </h3>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-3">
            <span
              className={`text-xs font-semibold ${
                netProfit >= 0 ? "text-emerald-650 dark:text-emerald-400" : "text-rose-655 dark:text-rose-400"
              }`}
            >
              {netProfit >= 0 ? "Operating Profitably" : "Net Operating Loss"}
            </span>
          </div>
        </div>

        {/* Completed Payments Card */}
        <div className="group overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm border border-gray-150 dark:border-gray-800 hover:shadow-md hover:scale-[1.01] transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md bg-blue-50 dark:bg-blue-950/30 p-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition">
              <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4 w-0 flex-1">
              <p className="truncate text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Completed Payments
              </p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
                {formatUSD(completedPayments)}
              </h3>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total collected cashflow
            </span>
          </div>
        </div>

        {/* Pending Payments Card */}
        <div className="group overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-5 shadow-sm border border-gray-150 dark:border-gray-800 hover:shadow-md hover:scale-[1.01] transition-all duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0 rounded-md bg-amber-50 dark:bg-amber-950/30 p-3 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/40 transition">
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="ml-4 w-0 flex-1">
              <p className="truncate text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Pending Payments
              </p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
                {formatUSD(pendingPayments)}
              </h3>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-3 flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Outstanding sent/overdue balance
            </span>
            <Link
              href="/admin/invoices"
              className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
            >
              Collect
            </Link>
          </div>
        </div>
      </div>

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
                  const daysRemaining = project.dueDate
                    ? Math.ceil(
                        (new Date(project.dueDate).getTime() - new Date().getTime()) /
                          (1000 * 60 * 60 * 24)
                      )
                    : null

                  return (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
                    >
                      <div className="min-w-0">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-650 hover:underline block truncate"
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
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset ${
                            daysRemaining !== null && daysRemaining <= 7
                              ? "bg-red-50 text-red-700 ring-red-650/10 dark:bg-red-950/30 dark:text-red-400"
                              : "bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-950/30 dark:text-amber-400"
                          }`}
                        >
                          {daysRemaining !== null
                            ? daysRemaining === 0
                              ? "Due today"
                              : daysRemaining === 1
                              ? "1 day left"
                              : `${daysRemaining} days left`
                            : "No date"}
                        </span>
                        <span className="text-2xs text-gray-400 dark:text-gray-500 block mt-1">
                          {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : ""}
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
