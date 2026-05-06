"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Store,
  Percent,
  Printer,
  Shield,
  Bell,
  Globe,
  Database,
  Smartphone,
  Save,
  ChevronRight,
  User,
  Check,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { cn } from "@/lib/utils";

const settingSections = [
  { id: "general", label: "General Settings", icon: Store },
  { id: "tax", label: "Tax & Compliance", icon: Percent },
  { id: "printer", label: "Printer & POS", icon: Printer },
  { id: "users", label: "Users & Roles", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "backup", label: "Data & Backup", icon: Database },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");

  return (
    <MainLayout pageTitle="Settings" pageSubtitle="Configure your store preferences and system parameters">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Settings Nav */}
        <div className="w-full lg:w-72 space-y-2">
          {settingSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200",
                activeSection === section.id
                  ? "bg-white text-green-600 shadow-sm border border-gray-100"
                  : "text-gray-500 hover:bg-white hover:text-gray-900 border border-transparent"
              )}
            >
              <section.icon className={cn("w-5 h-5", activeSection === section.id ? "text-green-500" : "text-gray-400")} />
              {section.label}
              {activeSection === section.id && <ChevronRight className="ml-auto w-4 h-4" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-black text-gray-900">
                {settingSections.find(s => s.id === activeSection)?.label}
              </h3>
              <p className="text-sm text-gray-500">Manage your store's {activeSection} configurations</p>
            </div>
            <button className="btn-primary">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>

          <div className="p-8 space-y-8">
            {activeSection === "general" && (
              <div className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Store Name</label>
                    <input type="text" className="input-field" defaultValue="AutoParts Trading POS" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Business Email</label>
                    <input type="email" className="input-field" defaultValue="contact@autoparts.lk" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Phone Number</label>
                    <input type="text" className="input-field" defaultValue="+94 11 234 5678" />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Store Address</label>
                    <textarea className="input-field min-h-[80px]" defaultValue="123 Main Street, Colombo 03, Sri Lanka" />
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-50">
                  <h4 className="font-black text-gray-900 mb-4">Localization</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Currency</label>
                      <select className="input-field">
                        <option>Sri Lankan Rupee (LKR)</option>
                        <option>US Dollar (USD)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Time Zone</label>
                      <select className="input-field">
                        <option>(GMT+05:30) Colombo</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "tax" && (
              <div className="space-y-6 max-w-2xl">
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-600 font-black">%</div>
                    <div>
                      <p className="font-black text-gray-900">Value Added Tax (VAT)</p>
                      <p className="text-xs text-gray-500">Enable or disable VAT on all invoices</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer p-1">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">VAT Percentage</label>
                    <div className="relative">
                      <input type="number" className="input-field pr-10" defaultValue="18" />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Tax Identification Number</label>
                    <input type="text" className="input-field" defaultValue="TIN-889021" />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50">
                  <h4 className="font-black text-gray-900 mb-4">Additional Taxes</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-bold text-gray-700">NBT (Nation Building Tax)</span>
                      </div>
                      <span className="text-sm font-black text-gray-900">2.0%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-bold text-gray-700">SSCL (Social Security Levy)</span>
                      </div>
                      <span className="text-sm font-black text-gray-900">2.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "printer" && (
              <div className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-white border-2 border-green-500 rounded-3xl shadow-sm relative">
                    <div className="absolute top-4 right-4 bg-green-500 text-white p-1 rounded-full">
                      <Check className="w-3 h-3" />
                    </div>
                    <Printer className="w-10 h-10 text-green-500 mb-4" />
                    <h4 className="font-black text-gray-900">Thermal Receipt</h4>
                    <p className="text-xs text-gray-500 mt-1">Standard 80mm thermal roll for fast billing</p>
                  </div>
                  <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:border-gray-200 cursor-pointer transition-all">
                    <FileText className="w-10 h-10 text-gray-300 mb-4" />
                    <h4 className="font-black text-gray-900">A4 Invoice</h4>
                    <p className="text-xs text-gray-500 mt-1">Standard office printer for full size reports</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Auto-print on checkout</p>
                      <p className="text-xs text-gray-500">Automatically trigger print dialog after sale</p>
                    </div>
                    <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer p-1">
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Customer Copy</p>
                      <p className="text-xs text-gray-500">Print an additional copy for the customer</p>
                    </div>
                    <div className="w-10 h-5 bg-green-500 rounded-full relative cursor-pointer p-1">
                      <div className="w-3 h-3 bg-white rounded-full absolute right-1" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "users" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-gray-900">System Users</h4>
                  <button className="text-xs font-bold text-green-600 hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors">+ Add User</button>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: "Admin User", role: "Owner", email: "admin@autoparts.lk" },
                    { name: "Kasun Perera", role: "Cashier", email: "kasun@autoparts.lk" },
                    { name: "Nimal Silva", role: "Manager", email: "nimal@autoparts.lk" },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-gradient rounded-xl flex items-center justify-center text-white text-xs font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "badge text-[10px] uppercase font-black",
                          user.role === "Owner" ? "badge-green" : user.role === "Manager" ? "badge-blue" : "badge-gray"
                        )}>
                          {user.role}
                        </span>
                        <button className="p-2 text-gray-300 hover:text-gray-900 transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
