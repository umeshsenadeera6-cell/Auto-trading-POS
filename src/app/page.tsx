"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  Users,
  AlertTriangle,
  DollarSign,
  Activity,
  ArrowRight,
  Plus,
  ScanLine,
  FileText,
  RefreshCcw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import MainLayout from "@/components/layout/MainLayout";
import { dashboardStats, salesChartData, topProducts, recentSales, products } from "@/lib/mockData";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const statCards = [
  {
    title: "Today's Sales",
    value: formatCurrency(dashboardStats.todaySales),
    change: "+12.5%",
    positive: true,
    icon: DollarSign,
    color: "green",
    sub: `${dashboardStats.todayOrders} orders today`,
  },
  {
    title: "Monthly Revenue",
    value: formatCurrency(dashboardStats.monthRevenue),
    change: "+8.3%",
    positive: true,
    icon: TrendingUp,
    color: "blue",
    sub: formatCurrency(dashboardStats.monthProfit) + " profit",
  },
  {
    title: "Total Products",
    value: dashboardStats.totalProducts.toString(),
    change: "-",
    positive: true,
    icon: Package,
    color: "purple",
    sub: `${dashboardStats.lowStockItems} low stock`,
  },
  {
    title: "Customers",
    value: dashboardStats.totalCustomers.toString(),
    change: "+23",
    positive: true,
    icon: Users,
    color: "orange",
    sub: "This month",
  },
];

const lowStockProducts = products.filter((p) => p.stock <= p.minStock);

const colorMap = {
  green: {
    bg: "bg-green-50",
    icon: "bg-green-500",
    text: "text-green-600",
    border: "border-green-100",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "bg-blue-500",
    text: "text-blue-600",
    border: "border-blue-100",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "bg-purple-500",
    text: "text-purple-600",
    border: "border-purple-100",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "bg-orange-500",
    text: "text-orange-600",
    border: "border-orange-100",
  },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-semibold text-gray-900 mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={i} style={{ color: entry.color }} className="text-xs">
            {entry.name}: {entry.name === "orders" ? entry.value : formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  return (
    <MainLayout pageTitle="Dashboard" pageSubtitle="Welcome back, Admin — Here's what's happening today">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
          <button className="btn-primary">
            <Plus className="w-4 h-4" />
            New Sale
          </button>
          <button className="btn-secondary">
            <ScanLine className="w-4 h-4" />
            Scan Barcode
          </button>
          <button className="btn-secondary">
            <Package className="w-4 h-4" />
            Add Product
          </button>
          <button className="btn-secondary">
            <FileText className="w-4 h-4" />
            View Reports
          </button>
        </motion.div>

        {/* Stat Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((card) => {
            const colors = colorMap[card.color as keyof typeof colorMap];
            return (
              <motion.div
                key={card.title}
                whileHover={{ y: -2 }}
                className="stat-card group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                  </div>
                  <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", colors.bg)}>
                    <card.icon className={cn("w-5 h-5", colors.text)} />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{card.sub}</p>
                  {card.change !== "-" && (
                    <span className={cn(
                      "flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full",
                      card.positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    )}>
                      {card.positive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {card.change}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Revenue Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Revenue Overview</h2>
                <p className="text-sm text-gray-500 mt-0.5">Last 7 months performance</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-200" />
                  <span className="text-gray-600">Profit</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={salesChartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#86efac" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#86efac" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" name="revenue" stroke="#22c55e" strokeWidth={2.5} fill="url(#revenueGrad)" />
                <Area type="monotone" dataKey="profit" name="profit" stroke="#86efac" strokeWidth={2} fill="url(#profitGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Orders Chart */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">Monthly Orders</h2>
              <p className="text-sm text-gray-500 mt-0.5">Order volume trend</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={salesChartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #f0f0f0", fontSize: "12px" }}
                  cursor={{ fill: "#f9fafb" }}
                />
                <Bar dataKey="orders" name="Orders" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Recent Sales */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Recent Sales</h2>
              <button className="text-sm text-green-600 font-medium hover:text-green-700 flex items-center gap-1">
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Invoice</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale) => (
                    <tr key={sale.id} className="cursor-pointer">
                      <td>
                        <span className="font-mono text-xs font-semibold text-gray-600">{sale.invoiceNo}</span>
                      </td>
                      <td>
                        <span className="text-gray-700">{sale.customer?.name || "Walk-in"}</span>
                      </td>
                      <td>
                        <span className="font-semibold text-gray-900">{formatCurrency(sale.total)}</span>
                      </td>
                      <td>
                        <span className={cn("badge", {
                          "badge-green": sale.paymentMethod === "cash",
                          "badge-blue": sale.paymentMethod === "card",
                          "badge-yellow": sale.paymentMethod === "credit",
                          "badge-gray": sale.paymentMethod === "transfer",
                        })}>
                          {sale.paymentMethod}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-green">{sale.status}</span>
                      </td>
                      <td>
                        <span className="text-xs text-gray-400">{formatDateTime(sale.createdAt)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Low Stock Alerts */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <h2 className="font-bold text-gray-900 text-sm">Low Stock Alerts</h2>
                </div>
                <span className="badge badge-red">{lowStockProducts.length}</span>
              </div>
              <div className="divide-y divide-gray-50">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.sku}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-red-600">{product.stock}</p>
                      <p className="text-[10px] text-gray-400">Min: {product.minStock}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Top Products */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900 text-sm">Top Products</h2>
                <Activity className="w-4 h-4 text-gray-400" />
              </div>
              <div className="divide-y divide-gray-50 p-2">
                {topProducts.slice(0, 4).map((product, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-800 truncate">{product.name}</p>
                      <p className="text-[10px] text-gray-500">{product.sales} sold</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {product.trend > 0 ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      )}
                      <span className={cn("text-xs font-semibold", product.trend > 0 ? "text-green-600" : "text-red-600")}>
                        {Math.abs(product.trend)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
