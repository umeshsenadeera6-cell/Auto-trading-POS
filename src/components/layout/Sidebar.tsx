"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Tags,
  Users,
  Truck,
  ShoppingBag,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Bell,
  Car,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    group: "Main",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/" },
      { icon: ShoppingCart, label: "POS Billing", href: "/pos", highlight: true },
    ],
  },
  {
    group: "Inventory",
    items: [
      { icon: Package, label: "Products", href: "/products" },
      { icon: Tags, label: "Categories", href: "/categories" },
      { icon: Car, label: "Vehicle Parts", href: "/vehicle-parts" },
    ],
  },
  {
    group: "Business",
    items: [
      { icon: Users, label: "Customers", href: "/customers" },
      { icon: Truck, label: "Suppliers", href: "/suppliers" },
      { icon: ShoppingBag, label: "Purchases", href: "/purchases" },
    ],
  },
  {
    group: "Analytics",
    items: [
      { icon: BarChart3, label: "Reports", href: "/reports" },
    ],
  },
  {
    group: "System",
    items: [
      { icon: Settings, label: "Settings", href: "/settings" },
    ],
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);

  useState(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  });

  const filteredNavItems = navItems.map(group => ({
    ...group,
    items: group.items.filter(item => {
      if (user?.role === "cashier") {
        return item.href === "/pos";
      }
      return true;
    })
  })).filter(group => group.items.length > 0);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen bg-[#0f1117] border-r border-white/5 z-30 flex flex-col overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 bg-green-gradient rounded-xl flex items-center justify-center flex-shrink-0 shadow-green-glow">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="min-w-0"
              >
                <p className="text-white font-bold text-sm leading-none">AutoParts</p>
                <p className="text-gray-500 text-xs mt-0.5">POS System</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={onToggle}
          className="ml-auto p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-200 flex-shrink-0"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto custom-scroll py-4 px-2">
        {filteredNavItems.map((group) => (
          <div key={group.group} className="mb-4">
            <AnimatePresence>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-3 mb-1"
                >
                  {group.group}
                </motion.p>
              )}
            </AnimatePresence>

            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ x: collapsed ? 0 : 2 }}
                    className={cn(
                      "sidebar-nav-item",
                      isActive && "active",
                      collapsed && "justify-center px-0",
                      item.highlight && !isActive && "text-green-400"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <item.icon
                      className={cn(
                        "nav-icon w-5 h-5 flex-shrink-0 transition-colors duration-200",
                        isActive && "text-green-400",
                        item.highlight && !isActive && "text-green-400"
                      )}
                    />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.15 }}
                          className="truncate"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {item.highlight && !collapsed && (
                      <span className="ml-auto bg-green-500/20 text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                        POS
                      </span>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-white/5 p-2 space-y-1">
        <button
          className={cn(
            "sidebar-nav-item w-full",
            collapsed && "justify-center px-0"
          )}
          title={collapsed ? "Notifications" : undefined}
        >
          <div className="relative">
            <Bell className="nav-icon w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="truncate"
              >
                Notifications
              </motion.span>
            )}
          </AnimatePresence>
          {!collapsed && (
            <span className="ml-auto bg-red-500/20 text-red-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
              3
            </span>
          )}
        </button>

        <button
          className={cn(
            "sidebar-nav-item w-full",
            collapsed && "justify-center px-0"
          )}
          title={collapsed ? "Help" : undefined}
        >
          <HelpCircle className="nav-icon w-5 h-5" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="truncate"
              >
                Help
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* User Profile */}
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 cursor-pointer transition-all duration-200 mt-2",
            collapsed && "justify-center px-0"
          )}
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          <div className="w-8 h-8 rounded-full bg-green-gradient flex items-center justify-center flex-shrink-0 text-white text-xs font-bold uppercase">
            {user?.name?.[0] || "U"}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0 flex-1"
              >
                <p className="text-white text-sm font-medium truncate">{user?.name || "User"}</p>
                <p className="text-gray-500 text-xs truncate capitalize">{user?.role || "Role"}</p>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <LogOut className="w-4 h-4 text-gray-500 hover:text-red-400 transition-colors flex-shrink-0" />
          )}
        </div>
      </div>
    </motion.aside>
  );
}
