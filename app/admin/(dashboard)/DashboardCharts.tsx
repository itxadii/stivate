"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Scale, CheckCircle2, Clock, Info } from "lucide-react"

interface MonthlyData {
  monthName: string
  revenue: number
  expenses: number
}

interface CategoryData {
  category: string
  value: number
  percentage: number
}

interface SummaryData {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  completedPayments: number
  pendingPayments: number
}

interface DashboardChartsProps {
  monthlyData: MonthlyData[]
  categoryData: CategoryData[]
  summaryData: SummaryData
}

const PALETTE = [
  "stroke-indigo-500 fill-indigo-500 bg-indigo-500",
  "stroke-blue-500 fill-blue-500 bg-blue-500",
  "stroke-emerald-500 fill-emerald-500 bg-emerald-500",
  "stroke-amber-500 fill-amber-500 bg-amber-500",
  "stroke-rose-500 fill-rose-500 bg-rose-500",
  "stroke-purple-500 fill-purple-500 bg-purple-500",
  "stroke-pink-500 fill-pink-500 bg-pink-500",
]

const HEX_PALETTE = [
  "#6366f1", // indigo
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#f43f5e", // rose
  "#8b5cf6", // purple
  "#ec4899", // pink
]

export default function DashboardCharts({ monthlyData, categoryData, summaryData }: DashboardChartsProps) {
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null)
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState<number | null>(null)

  const formatUSD = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val)
  }

  // --- Donut Chart Computations ---
  const totalCategoryExpenses = categoryData.reduce((sum, item) => sum + item.value, 0)
  const radius = 50
  const strokeWidth = 14
  const circumference = 2 * Math.PI * radius // ~314.16

  let accumulatedPercentage = 0
  const donutSegments = categoryData.map((item, index) => {
    const percentage = totalCategoryExpenses > 0 ? (item.value / totalCategoryExpenses) * 100 : 0
    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
    const strokeDashoffset = -((accumulatedPercentage / 100) * circumference)
    accumulatedPercentage += percentage

    return {
      ...item,
      percentage,
      strokeDasharray,
      strokeDashoffset,
      colorClass: PALETTE[index % PALETTE.length],
      hexColor: HEX_PALETTE[index % HEX_PALETTE.length],
    }
  })

  // --- Monthly Bar Chart Computations ---
  const maxVal = Math.max(
    ...monthlyData.map((d) => Math.max(d.revenue, d.expenses)),
    1000 // default minimum height boundary
  )
  const chartHeight = 200

  // --- Metrics Computations ---
  const totalRev = summaryData.totalRevenue
  const totalExp = summaryData.totalExpenses
  const maxFlow = Math.max(totalRev, totalExp, 1)
  const revPercent = (totalRev / maxFlow) * 100
  const expPercent = (totalExp / maxFlow) * 100

  const profit = summaryData.netProfit
  const profitMargin = totalRev > 0 ? (profit / totalRev) * 100 : 0

  const compPay = summaryData.completedPayments
  const pendPay = summaryData.pendingPayments
  const totalPayments = compPay + pendPay
  const collectionRate = totalPayments > 0 ? (compPay / totalPayments) * 100 : 0

  return (
    <div className="space-y-8">
      {/* 1. Summary Metric Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Cash Flow Balance Card */}
        <div className="group overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-150 dark:border-gray-800 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Cash Flow Balance
              </h3>
              <TrendingUp className="h-4 w-4 text-emerald-500 animate-pulse" />
            </div>
            
            <div className="space-y-3">
              {/* Revenue progress */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-2xs">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Total Revenue</span>
                  <span className="text-gray-950 dark:text-white font-bold">{formatUSD(totalRev)}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${revPercent}%` }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  />
                </div>
              </div>

              {/* Expenses progress */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-2xs">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Total Expenses</span>
                  <span className="text-gray-950 dark:text-white font-bold">{formatUSD(totalExp)}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${expPercent}%` }}
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-gray-100 dark:border-gray-800 text-3xs text-gray-400 flex items-center justify-between">
            <span>Operating Cashflow</span>
            <span className="font-semibold text-emerald-500">
              {totalRev >= totalExp ? "Surplus Mode" : "Deficit Mode"}
            </span>
          </div>
        </div>

        {/* Net Profitability Card */}
        <div className="group overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-150 dark:border-gray-800 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Net Profitability
            </h3>
            <Scale className="h-4 w-4 text-indigo-500" />
          </div>

          <div className="flex items-center gap-6 py-2">
            {/* SVG Semi-Circle Gauge */}
            <div className="relative shrink-0 flex flex-col items-center">
              <svg className="w-28 h-14" viewBox="0 0 100 50">
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  className="stroke-gray-100 dark:stroke-gray-800"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 10 50 A 40 40 0 0 1 90 50"
                  fill="none"
                  stroke={profit >= 0 ? "#10b981" : "#f43f5e"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="125.66"
                  strokeDashoffset={125.66 * (1 - Math.min(Math.max(profit >= 0 ? profitMargin : 0, 0), 100) / 100)}
                  className="transition-all duration-700 ease-out"
                />
                <text
                  x="50"
                  y="41"
                  textAnchor="middle"
                  className="fill-current text-gray-900 dark:text-white font-extrabold text-[8px]"
                >
                  {profitMargin.toFixed(1)}%
                </text>
                <text
                  x="50"
                  y="48"
                  textAnchor="middle"
                  className="fill-current text-gray-450 dark:text-gray-500 font-bold text-[4px] tracking-wider uppercase"
                >
                  Margin
                </text>
              </svg>
            </div>

            {/* Metrics */}
            <div className="space-y-1">
              <span className="text-3xs text-gray-400 uppercase tracking-wider block">Net Profit</span>
              <h3 className={`text-lg font-black ${profit >= 0 ? "text-emerald-650 dark:text-emerald-400" : "text-rose-650 dark:text-rose-400"}`}>
                {formatUSD(profit)}
              </h3>
              <span className={`text-3xs px-2 py-0.5 rounded-full inline-block mt-1 font-semibold ${
                profit >= 0 ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400" : "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400"
              }`}>
                {profit >= 0 ? "Profit" : "Loss"}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-3xs text-gray-400">
            <span>Net Operating Margin</span>
          </div>
        </div>

        {/* Payment Collection Card */}
        <div className="group overflow-hidden rounded-xl bg-white dark:bg-gray-900 p-6 shadow-sm border border-gray-150 dark:border-gray-800 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Payment Collection
            </h3>
            <Clock className="h-4 w-4 text-blue-500" />
          </div>

          <div className="flex items-center gap-6 py-2">
            {/* SVG Donut Ring */}
            <div className="relative h-16 w-16 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  className="stroke-gray-100 dark:stroke-gray-800"
                  strokeWidth="3.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="transparent"
                  stroke="#3b82f6"
                  strokeWidth="3.5"
                  strokeDasharray={`${collectionRate} ${100 - collectionRate}`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out text-blue-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <span className="text-2xs font-extrabold text-gray-900 dark:text-white leading-none">
                  {collectionRate.toFixed(0)}%
                </span>
                <span className="text-4xs text-gray-400 dark:text-gray-500 uppercase mt-0.5">Paid</span>
              </div>
            </div>

            {/* Collection breakdown values */}
            <div className="space-y-2 text-2xs flex-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-blue-500 block shrink-0" />
                  Collected
                </span>
                <span className="text-gray-905 dark:text-white font-bold">{formatUSD(compPay)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-amber-500 block shrink-0" />
                  Pending
                </span>
                <span className="text-gray-905 dark:text-white font-bold">{formatUSD(pendPay)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-3xs text-gray-400">
            <span>Invoicing Collection Rate</span>
          </div>
        </div>
      </div>

      {/* 2. Visual Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Monthly Trend Chart */}
        <div className="lg:col-span-2 rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-150 dark:border-gray-800 p-6 space-y-6 relative flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              Monthly Cashflow Trend <span className="text-2xs text-gray-400 font-normal normal-case">(Last 6 Months in USD)</span>
            </h3>
            <p className="text-2xs text-gray-400 dark:text-gray-500 mt-0.5">Compare monthly paid revenue vs outgoing operating expenses.</p>
          </div>

          {/* Interactive Chart Wrapper */}
          <div className="relative pt-6 flex-1 flex flex-col justify-end min-h-[220px]">
            {/* Grid Line Helpers */}
            <div className="absolute inset-x-0 top-6 bottom-8 flex flex-col justify-between pointer-events-none">
              <div className="border-t border-gray-100 dark:border-gray-800/80 w-full flex items-center justify-between">
                <span className="text-3xs text-gray-400 -mt-2.5 bg-white dark:bg-gray-900 pr-1">{formatUSD(maxVal)}</span>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800/80 w-full flex items-center justify-between">
                <span className="text-3xs text-gray-400 -mt-2.5 bg-white dark:bg-gray-900 pr-1">{formatUSD(maxVal * 0.66)}</span>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800/80 w-full flex items-center justify-between">
                <span className="text-3xs text-gray-400 -mt-2.5 bg-white dark:bg-gray-900 pr-1">{formatUSD(maxVal * 0.33)}</span>
              </div>
              <div className="border-b border-gray-200 dark:border-gray-700 w-full" />
            </div>

            {/* Monthly Columns */}
            <div className="relative flex justify-between items-end h-[200px] z-10 pl-12 pr-4">
              {monthlyData.map((d, index) => {
                const revHeight = (d.revenue / maxVal) * chartHeight
                const expHeight = (d.expenses / maxVal) * chartHeight
                const isHovered = hoveredMonthIndex === index

                return (
                  <div 
                    key={d.monthName}
                    className="flex flex-col items-center flex-1 group"
                    onMouseEnter={() => setHoveredMonthIndex(index)}
                    onMouseLeave={() => setHoveredMonthIndex(null)}
                  >
                    {/* Hover tooltip values overlay */}
                    {isHovered && (
                      <div className="absolute top-0 bg-gray-950 text-white dark:bg-white dark:text-gray-950 p-2 rounded-lg text-3xs shadow-md border border-gray-800 dark:border-gray-200 transition duration-150 z-20 flex gap-3 -mt-6">
                        <div>
                          <span className="font-semibold text-emerald-400 dark:text-emerald-600 mr-1">Rev:</span>
                          {formatUSD(d.revenue)}
                        </div>
                        <div>
                          <span className="font-semibold text-rose-400 dark:text-rose-600 mr-1">Exp:</span>
                          {formatUSD(d.expenses)}
                        </div>
                      </div>
                    )}

                    {/* Side-by-side bars */}
                    <div className="flex items-end gap-1.5 w-full justify-center h-[180px]">
                      {/* Revenue Bar (Green) */}
                      <div 
                        style={{ height: `${Math.max(revHeight, 2)}px` }}
                        className={`w-3 sm:w-4.5 rounded-t-sm transition-all duration-300 bg-gradient-to-t from-emerald-600 to-emerald-400 ${
                          hoveredMonthIndex !== null && !isHovered ? "opacity-40" : "opacity-100 shadow-sm"
                        }`}
                      />
                      {/* Expenses Bar (Rose) */}
                      <div 
                        style={{ height: `${Math.max(expHeight, 2)}px` }}
                        className={`w-3 sm:w-4.5 rounded-t-sm transition-all duration-300 bg-gradient-to-t from-rose-600 to-rose-400 ${
                          hoveredMonthIndex !== null && !isHovered ? "opacity-40" : "opacity-100 shadow-sm"
                        }`}
                      />
                    </div>

                    {/* Month Label */}
                    <span className={`text-2xs font-semibold mt-2.5 transition ${
                      isHovered ? "text-blue-600 dark:text-blue-400 font-bold scale-105" : "text-gray-400 dark:text-gray-550"
                    }`}>
                      {d.monthName}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Chart Legends */}
          <div className="flex gap-4 border-t border-gray-100 dark:border-gray-800 pt-3 text-2xs justify-center">
            <span className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
              <span className="h-2.5 w-2.5 rounded bg-emerald-500 block shrink-0" />
              Paid Revenue
            </span>
            <span className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
              <span className="h-2.5 w-2.5 rounded bg-rose-500 block shrink-0" />
              Operating Expenses
            </span>
          </div>
        </div>

        {/* Expenses Allocation Donut */}
        <div className="rounded-xl bg-white dark:bg-gray-900 shadow-sm border border-gray-150 dark:border-gray-800 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-rose-500" />
              Operating Cost Allocation
            </h3>
            <p className="text-2xs text-gray-400 dark:text-gray-500 mt-0.5">Breakdown of operational overheads by categories.</p>
          </div>

          {/* Interactive Donut Illustration */}
          <div className="relative flex justify-center items-center py-6">
            {totalCategoryExpenses === 0 ? (
              <div className="h-32 w-32 rounded-full border-8 border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-center text-center p-2">
                <span className="text-3xs text-gray-400 font-medium leading-tight">No recorded expenses</span>
              </div>
            ) : (
              <div className="relative h-32 w-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r={radius}
                    fill="transparent"
                    className="stroke-gray-100 dark:stroke-gray-800"
                    strokeWidth={strokeWidth}
                  />
                  {donutSegments.map((segment, index) => {
                    const isHovered = hoveredCategoryIndex === index
                    return (
                      <circle
                        key={segment.category}
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke={segment.hexColor}
                        strokeWidth={isHovered ? strokeWidth + 2 : strokeWidth}
                        strokeDasharray={segment.strokeDasharray}
                        strokeDashoffset={segment.strokeDashoffset}
                        className="transition-all duration-300 cursor-pointer"
                        onMouseEnter={() => setHoveredCategoryIndex(index)}
                        onMouseLeave={() => setHoveredCategoryIndex(null)}
                      />
                    )
                  })}
                </svg>
                {/* Center Hole Text */}
                <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                  <span className="text-3xs font-bold text-gray-400 uppercase tracking-wider">Total</span>
                  <span className="text-xs font-extrabold text-gray-900 dark:text-white leading-none mt-0.5">
                    {formatUSD(totalCategoryExpenses)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Legend Items */}
          <div className="space-y-2 border-t border-gray-100 dark:border-gray-800 pt-3 text-2xs overflow-y-auto max-h-[140px] pr-1">
            {totalCategoryExpenses === 0 ? (
              <div className="text-center text-3xs text-gray-400 py-4 flex items-center gap-1.5 justify-center">
                <Info className="w-3.5 h-3.5" />
                Add expenses in CRM to see category distribution.
              </div>
            ) : (
              donutSegments.map((seg, idx) => {
                const isHovered = hoveredCategoryIndex === idx
                return (
                  <div
                    key={seg.category}
                    className={`flex items-center justify-between p-1 rounded transition duration-150 ${
                      isHovered ? "bg-gray-50 dark:bg-gray-800/60 font-semibold" : ""
                    }`}
                    onMouseEnter={() => setHoveredCategoryIndex(idx)}
                    onMouseLeave={() => setHoveredCategoryIndex(null)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: seg.hexColor }} />
                      <span className="text-gray-700 dark:text-gray-300 truncate max-w-[100px]">{seg.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-right shrink-0">
                      <span className="text-gray-900 dark:text-white font-bold">{formatUSD(seg.value)}</span>
                      <span className="text-gray-400 text-3xs">({seg.percentage.toFixed(0)}%)</span>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
