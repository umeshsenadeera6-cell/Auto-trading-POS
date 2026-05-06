"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Truck,
  Phone,
  Mail,
  MapPin,
  MoreVertical,
  Star,
  ChevronRight,
  ShieldCheck,
  Clock,
  DollarSign,
  AlertCircle,
  FileText,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { suppliers } from "@/lib/mockData";
import { formatCurrency, cn } from "@/lib/utils";

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout pageTitle="Suppliers" pageSubtitle="Manage parts suppliers and purchase orders">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by supplier name or contact person..."
              className="input-field pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary">
              <FileText className="w-4 h-4" />
              Purchase Orders
            </button>
            <button className="btn-primary">
              <Plus className="w-4 h-4" />
              Add Supplier
            </button>
          </div>
        </div>

        {/* Supplier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier) => (
            <motion.div
              key={supplier.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 border border-gray-100">
                      <Truck className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900">{supplier.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="badge badge-green text-[10px] uppercase">Active</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("w-2.5 h-2.5 fill-amber-400 text-amber-400", i >= supplier.rating && "fill-gray-100 text-gray-100")} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span className="font-bold">{supplier.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Phone className="w-4 h-4" />
                    {supplier.phone}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Mail className="w-4 h-4" />
                    {supplier.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{supplier.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Terms</span>
                    </div>
                    <p className="font-black text-gray-900 text-sm">{supplier.paymentTerms}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payable</span>
                    </div>
                    <p className={cn("font-black text-sm", supplier.outstandingBalance > 0 ? "text-red-500" : "text-gray-900")}>
                      {formatCurrency(supplier.outstandingBalance)}
                    </p>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-green-50 text-gray-600 hover:text-green-600 font-bold text-sm rounded-2xl transition-all duration-300">
                  View Ledger <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions / Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 flex-shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-amber-900">Upcoming Payments</h4>
              <p className="text-sm text-amber-700 mt-1 mb-4">You have 3 payments due within the next 7 days totaling {formatCurrency(245000)}.</p>
              <button className="text-sm font-bold text-amber-900 bg-amber-200/50 hover:bg-amber-200 px-4 py-2 rounded-xl transition-colors">
                Process Payments
              </button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-blue-900">Pending Purchase Orders</h4>
              <p className="text-sm text-blue-700 mt-1 mb-4">There are 5 purchase orders awaiting approval or delivery from your suppliers.</p>
              <button className="text-sm font-bold text-blue-900 bg-blue-200/50 hover:bg-blue-200 px-4 py-2 rounded-xl transition-colors">
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
