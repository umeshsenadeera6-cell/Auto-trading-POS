"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";
import { hasPermission } from "@/lib/permissions";

interface MainLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  pageSubtitle?: string;
}

export default function MainLayout({ children, pageTitle, pageSubtitle }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    const pathname = window.location.pathname;

    if (!hasPermission(user.role, pathname)) {
      // If no permission for current page, redirect to POS or Dashboard if they have access
      if (hasPermission(user.role, "/pos")) {
        router.push("/pos");
      } else if (hasPermission(user.role, "/")) {
        router.push("/");
      } else {
        // Absolute fallback if everything is restricted (shouldn't happen with defaults)
        localStorage.removeItem("user");
        router.push("/login");
      }
    }
  }, [router]);

  if (!isMounted) return null;

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

