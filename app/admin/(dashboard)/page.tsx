import { Users, FolderKanban, Receipt, Activity as ActivityIcon } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  // Fetch actual counts from Neon PostgreSQL database
  const totalClients = await prisma.client.count({
    where: { isArchived: false }
  })

  const activeProjects = await prisma.project.count({
    where: { isArchived: false }
  })

  const pendingInvoices = await prisma.invoice.count({
    where: { isArchived: false, status: { in: ["SENT", "OVERDUE"] } }
  })

  const recentActivitiesCount = await prisma.activity.count({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    }
  })

  // Fetch actual recent activities list
  const recentActivities = await prisma.activity.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      user: true
    }
  })

  const stats = [
    { name: "Total Clients", value: totalClients.toString(), icon: Users, change: "+0%" },
    { name: "Active Projects", value: activeProjects.toString(), icon: FolderKanban, change: "+0%" },
    { name: "Pending Invoices", value: pendingInvoices.toString(), icon: Receipt, change: "0" },
    { name: "Recent Activities", value: recentActivitiesCount.toString(), icon: ActivityIcon, change: "Today" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-xl bg-white dark:bg-gray-900 px-4 py-5 shadow-sm border border-gray-100 dark:border-gray-800 sm:p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-blue-50 dark:bg-blue-900/30 p-3">
                <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.name}
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
              <div className="text-sm">
                <span className="font-medium text-blue-600 dark:text-blue-400">{stat.change}</span>
                <span className="text-gray-500 dark:text-gray-400"> vs last month</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="p-6">
            {recentActivities.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No recent activity.</p>
            ) : (
              <ul className="space-y-4">
                {recentActivities.map((act: any) => (
                  <li key={act.id} className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-900 dark:text-white">{act.user.name || act.user.email}</span>{" "}
                    {act.action.toLowerCase() === "created" ? "created" : act.action.toLowerCase() === "updated" ? "updated" : "archived"}{" "}
                    a <span className="font-medium text-blue-600 dark:text-blue-400">{act.entityType.toLowerCase()}</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 block mt-0.5">
                      {new Date(act.createdAt).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Upcoming Deadlines</h3>
          </div>
          <div className="p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">No upcoming deadlines.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
