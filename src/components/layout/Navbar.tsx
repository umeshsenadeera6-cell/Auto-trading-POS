"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Plus,
  ScanLine,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/utils";

interface NavbarProps {
  sidebarCollapsed: boolean;
  pageTitle: string;
  pageSubtitle?: string;
}

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Low Stock Alert",
    message: "Honda Civic Brake Pads - Only 3 units remaining",
    time: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
  },
  {
    id: 2,
    type: "success",
    title: "Purchase Order Received",
    message: "PO-24-0088 from Bosch Lanka has been received",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
  },
  {
    id: 3,
    type: "info",
    title: "New Customer Registration",
    message: "Priya Jayawardena has been added as a customer",
    time: new Date(Date.now() - 1000 * 60 * 60 * 5),
    read: true,
  },
];

export default function Navbar({ sidebarCollapsed, pageTitle, pageSubtitle }: NavbarProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-16 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-20 flex items-center px-6 gap-4 transition-all duration-300",
        sidebarCollapsed ? "left-[72px]" : "left-[240px]"
      )}
    >
      {/* Page Title */}
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-bold text-gray-900 truncate">{pageTitle}</h1>
        {pageSubtitle && (
          <p className="text-xs text-gray-500 truncate">{pageSubtitle}</p>
        )}
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center relative">
        <div className={cn(
          "flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 transition-all duration-200",
          showSearch ? "w-72" : "w-52"
        )}>
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search products, invoices..."
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none flex-1 min-w-0"
            onFocus={() => setShowSearch(true)}
            onBlur={() => setShowSearch(false)}
          />
          <div className="flex items-center gap-1 flex-shrink-0">
            <kbd className="text-[10px] text-gray-400 bg-gray-100 border border-gray-200 rounded px-1 py-0.5">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2">
        {/* Barcode Scanner */}
        <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-200 relative group">
          <ScanLine className="w-5 h-5" />
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Scan Barcode
          </span>
        </button>

        {/* Refresh */}
        <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-200">
          <RefreshCw className="w-5 h-5" />
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-200"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-all duration-200 relative"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="max-h-80 overflow-y-auto custom-scroll">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={cn(
                        "flex gap-3 p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors",
                        !notif.read && "bg-green-50/30"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        notif.type === "alert" && "bg-red-100",
                        notif.type === "success" && "bg-green-100",
                        notif.type === "info" && "bg-blue-100"
                      )}>
                        {notif.type === "alert" && <AlertCircle className="w-4 h-4 text-red-600" />}
                        {notif.type === "success" && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {notif.type === "info" && <Info className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1">{formatDateTime(notif.time)}</p>
                      </div>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                  ))}
                </div>

                <div className="px-4 py-3">
                  <button className="w-full text-center text-sm text-green-600 font-medium hover:text-green-700">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200" />

        {/* User */}
        <button className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition-all duration-200">
          <div className="w-7 h-7 rounded-full bg-green-gradient flex items-center justify-center text-white text-xs font-bold">
            A
          </div>
          <span className="text-sm font-medium text-gray-700 hidden lg:block">Admin</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden lg:block" />
        </button>
      </div>
    </header>
  );
}
