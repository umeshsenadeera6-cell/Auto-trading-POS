"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  ShoppingBag,
  Truck,
  Calendar,
  ChevronRight,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  ArrowDownCircle,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { purchaseOrders } from "@/lib/mockData";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

export default function PurchasesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MainLayout pageTitle="Purchases & GRN" pageSubtitle="Manage purchase orders and good received notes">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by PO number or supplier..."
              className="input-field pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary">
              <ArrowDownCircle className="w-4 h-4" />
              Import GRN
            </button>
            <button className="btn-primary">
              <Plus className="w-4 h-4" />
              New Purchase Order
            </button>
          </div>
        </div>

        {/* PO List */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="px-6 py-4">PO Number</th>
                  <th>Supplier</th>
                  <th>Order Date</th>
                  <th>Expected Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((po) => (
                  <tr key={po.id} className="group hover:bg-gray-50/50 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-black text-gray-900">{po.poNumber}</p>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{po.items.length} Items</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-gray-700">{po.supplier.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(po.orderDate)}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(po.expectedDate)}
                      </div>
                    </td>
                    <td>
                      <p className="font-black text-gray-900">{formatCurrency(po.total)}</p>
                    </td>
                    <td>
                      <span className={cn(
                        "badge text-[10px] uppercase font-black",
                        po.status === "received" ? "badge-green" : po.status === "ordered" ? "badge-blue" : "badge-yellow"
                      )}>
                        {po.status}
                      </span>
                    </td>
                    <td className="px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-gray-900 transition-all">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg text-gray-400 hover:text-gray-900 transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Purchase Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0f1117] rounded-3xl p-8 text-white">
            <h4 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-6">Monthly Procurement</h4>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-2xl font-black">{formatCurrency(1250400)}</span>
                  <span className="text-xs text-green-400 font-bold flex items-center gap-1">
                    <Plus className="w-3 h-3" /> 12%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }} />
                </div>
              </div>
              <p className="text-xs text-gray-500">Procurement budget utilization for May 2024</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm col-span-2">
            <h4 className="font-black text-gray-900 mb-6">Inventory Inflow Trend</h4>
            <div className="h-32 flex items-end gap-2">
              {[40, 65, 45, 90, 60, 75, 40, 85, 55, 70, 50, 95].map((h, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-green-100 hover:bg-green-500 rounded-t-lg transition-all duration-300 cursor-pointer group relative"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}k
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
              <span>May 01</span>
              <span>May 15</span>
              <span>May 30</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
