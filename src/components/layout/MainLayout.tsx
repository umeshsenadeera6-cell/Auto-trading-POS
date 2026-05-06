"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  pageSubtitle?: string;
}

export default function MainLayout({ children, pageTitle, pageSubtitle }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <Navbar
        sidebarCollapsed={sidebarCollapsed}
        pageTitle={pageTitle}
        pageSubtitle={pageSubtitle}
      />

      <motion.main
        initial={false}
        animate={{ marginLeft: sidebarCollapsed ? 72 : 240 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="pt-16 min-h-screen"
      >
        <div className="p-6 max-w-[1600px]">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
