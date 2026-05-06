"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Car,
  CreditCard,
  ShoppingBag,
  MoreVertical,
  ChevronRight,
  Star,
  ExternalLink,
  X,
  History,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { customers } from "@/lib/mockData";
import { Customer } from "@/lib/types";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout pageTitle="Customers" pageSubtitle="Manage customer relationships and credit accounts">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone or email..."
              className="input-field pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary">
              <History className="w-4 h-4" />
              Transactions
            </button>
            <button onClick={() => setShowAddModal(true)} className="btn-primary">
              <UserPlus className="w-4 h-4" />
              New Customer
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Customers</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-gray-900">{customers.length}</h3>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">+4 this week</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Active Credit</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-amber-600">{formatCurrency(145000)}</h3>
              <span className="text-xs text-gray-400">across 12 accounts</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Loyalty Points</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-blue-600">42,850</h3>
              <span className="text-xs text-gray-400">issued points</span>
            </div>
          </div>
        </div>

        {/* Customer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <motion.div
              key={customer.id}
              layoutId={customer.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-gradient rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-green-glow">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 group-hover:text-green-600 transition-colors">{customer.name}</h3>
                      <p className="text-xs text-gray-400 font-medium">Customer since {formatDate(customer.joinedAt)}</p>
                      <div className="flex items-center gap-1 mt-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("w-3 h-3 fill-amber-400 text-amber-400", i > 3 && "fill-gray-100 text-gray-100")} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-green-500" />
                    {customer.phone}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-green-500" />
                    {customer.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-green-500" />
                    <span className="truncate">{customer.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-blue-500" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Orders</span>
                    </div>
                    <p className="font-black text-gray-900">{customer.totalPurchases}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <CreditCard className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Credit Balance</span>
                    </div>
                    <p className={cn("font-black", customer.creditBalance > 0 ? "text-red-500" : "text-gray-900")}>
                      {formatCurrency(customer.creditBalance)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  {customer.vehicleInfo.slice(0, 2).map((v, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-bold border border-green-100">
                      <Car className="w-3 h-3" />
                      {v.brand} {v.model}
                    </div>
                  ))}
                  {customer.vehicleInfo.length > 2 && (
                    <span className="text-[10px] font-bold text-gray-400">+{customer.vehicleInfo.length - 2} more</span>
                  )}
                </div>

                <button
                  onClick={() => setSelectedCustomer(customer)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-green-50 text-gray-600 hover:text-green-600 font-bold text-sm rounded-2xl transition-all duration-300"
                >
                  View Profile <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Profile Drawer-like Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <div className="modal-overlay">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-black text-gray-900">Customer Profile</h3>
                <button onClick={() => setSelectedCustomer(null)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scroll">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-24 h-24 bg-green-gradient rounded-3xl flex items-center justify-center text-white text-4xl font-black shadow-green-glow">
                    {selectedCustomer.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">{selectedCustomer.name}</h2>
                    <p className="text-gray-500 font-medium">Customer ID: {selectedCustomer.id}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="badge badge-green px-3 py-1 text-sm">Platinum Member</span>
                      <span className="flex items-center gap-1.5 text-amber-500 font-bold">
                        <Star className="w-4 h-4 fill-amber-500" /> 2,875 Points
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Contact Information</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-green-600">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase">Phone Number</p>
                          <p className="font-bold text-gray-900">{selectedCustomer.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-green-600">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase">Email Address</p>
                          <p className="font-bold text-gray-900">{selectedCustomer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-green-600">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 font-bold uppercase">Home Address</p>
                          <p className="font-bold text-gray-900">{selectedCustomer.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Vehicle Information</h4>
                    <div className="space-y-3">
                      {selectedCustomer.vehicleInfo.map((v, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Car className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-bold text-gray-900">{v.brand} {v.model}</p>
                              <p className="text-xs text-gray-500">{v.regNo} • {v.year}</p>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-300" />
                        </div>
                      ))}
                      <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-xs font-bold text-gray-400 hover:border-green-300 hover:text-green-600 transition-all">
                        + Add Vehicle
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Recent Transactions</h4>
                  <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase">Invoice</th>
                          <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase">Date</th>
                          <th className="px-4 py-3 text-left text-[10px] font-bold text-gray-400 uppercase">Amount</th>
                          <th className="px-4 py-3 text-right text-[10px] font-bold text-gray-400 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {[1, 2, 3].map(i => (
                          <tr key={i} className="hover:bg-gray-50/50 cursor-pointer">
                            <td className="px-4 py-4 font-mono font-bold text-gray-600">INV-24-00{80+i}</td>
                            <td className="px-4 py-4 text-gray-500">{formatDate("2024-05-0" + i)}</td>
                            <td className="px-4 py-4 font-bold text-gray-900">{formatCurrency(12500 * i)}</td>
                            <td className="px-4 py-4 text-right">
                              <span className="badge badge-green">Paid</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 flex items-center gap-3">
                <button className="flex-1 btn-secondary justify-center py-3">Edit Profile</button>
                <button className="flex-1 btn-primary justify-center py-3">Make Payment</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
