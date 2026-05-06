"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  ArrowUpRight,
  ChevronDown,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import MainLayout from "@/components/layout/MainLayout";
import { salesChartData, topProducts, dashboardStats } from "@/lib/mockData";
import { formatCurrency, cn } from "@/lib/utils";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

const categorySalesData = [
  { name: "Engine Parts", value: 45 },
  { name: "Brake System", value: 25 },
  { name: "Electrical", value: 15 },
  { name: "Lubricants", value: 10 },
  { name: "Suspension", value: 5 },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("Last 30 Days");

  return (
    <MainLayout pageTitle="Reports & Analytics" pageSubtitle="Comprehensive business intelligence and sales performance">
      <div className="space-y-6">
        {/* Reports Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <button className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4 text-green-500" />
                {dateRange}
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <button className="btn-secondary">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="btn-secondary">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button className="btn-primary">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> +14.2%
              </span>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Gross Revenue</p>
            <h3 className="text-2xl font-black text-gray-900">{formatCurrency(2845900)}</h3>
            <p className="text-[10px] text-gray-400 mt-2">Target: {formatCurrency(3000000)}</p>
            <div className="w-full h-1 bg-gray-50 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }} />
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> +8.1%
              </span>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Net Profit</p>
            <h3 className="text-2xl font-black text-gray-900">{formatCurrency(942600)}</h3>
            <p className="text-[10px] text-gray-400 mt-2">Margin: 33.1%</p>
            <div className="w-full h-1 bg-gray-50 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "33%" }} />
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                <TrendingDown className="w-3 h-3" /> -2.4%
              </span>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Avg. Order Value</p>
            <h3 className="text-2xl font-black text-gray-900">{formatCurrency(12450)}</h3>
            <p className="text-[10px] text-gray-400 mt-2">From 482 orders</p>
            <div className="w-full h-1 bg-gray-50 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full" style={{ width: "65%" }} />
            </div>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                <Package className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3" /> +5.2%
              </span>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Inventory Value</p>
            <h3 className="text-2xl font-black text-gray-900">{formatCurrency(4850200)}</h3>
            <p className="text-[10px] text-gray-400 mt-2">620 unique SKUs</p>
            <div className="w-full h-1 bg-gray-50 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: "90%" }} />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-gray-900">Revenue Growth</h3>
                <p className="text-sm text-gray-500">Monthly sales performance comparison</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-gray-50 rounded-lg text-green-600"><LineChartIcon className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"><BarChart3 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesChartData}>
                  <defs>
                    <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} tickFormatter={(v) => `${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#revenue)" />
                  <Area type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={3} fillOpacity={0} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-card">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-gray-900">Sales by Category</h3>
                <p className="text-sm text-gray-500">Distribution of sales volume</p>
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"><PieChartIcon className="w-4 h-4" /></button>
            </div>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySalesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {categorySalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3 min-w-[150px]">
                {categorySalesData.map((c, i) => (
                  <div key={c.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-xs font-bold text-gray-600">{c.name}</span>
                    </div>
                    <span className="text-xs font-black text-gray-900">{c.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Best Sellers & Reports List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900">Top Selling Products</h3>
              <button className="text-xs font-bold text-green-600 hover:underline">View All Products</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Product</th>
                    <th className="px-6 py-4 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Orders</th>
                    <th className="px-6 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue</th>
                    <th className="px-6 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {topProducts.map((p, i) => (
                    <tr key={i} className="hover:bg-gray-50/30 transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-xs">
                            {i+1}
                          </div>
                          <span className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-gray-700">{p.sales}</td>
                      <td className="px-6 py-4 text-right font-black text-gray-900">{formatCurrency(p.revenue)}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={cn(
                          "inline-flex items-center gap-1 font-bold text-xs",
                          p.trend > 0 ? "text-green-600" : "text-red-500"
                        )}>
                          {p.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {Math.abs(p.trend)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#0f1117] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-green-500/30 transition-all duration-500" />
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-6">Inventory Audit</h3>
              <p className="text-gray-400 text-sm mb-10 leading-relaxed">
                Run a comprehensive audit of your current stock levels, valuation, and potential losses due to expiration or damage.
              </p>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Active SKUs</span>
                  <span className="font-bold">620</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Low Stock Items</span>
                  <span className="text-red-400 font-bold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Out of Stock</span>
                  <span className="text-red-400 font-bold">3</span>
                </div>
              </div>

              <button className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-black rounded-2xl shadow-green-glow transition-all active:scale-95 flex items-center justify-center gap-2">
                Generate Report <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
