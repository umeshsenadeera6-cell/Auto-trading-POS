"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserCircle2, 
  Lock, 
  ShieldCheck, 
  Store, 
  ArrowRight, 
  Eye, 
  EyeOff,
  Terminal,
  CircleDot
} from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "admin" | "cashier";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        // Save mock user to localStorage
        localStorage.setItem("user", JSON.stringify({
          email,
          role,
          name: role === "admin" ? "System Admin" : "Store Cashier",
        }));
        if (role === "cashier") {
          router.push("/pos");
        } else {
          router.push("/");
        }
      } else {
        setError("Please enter both email and password");
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f1117] relative overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-green-500/10 blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20">
          <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(#ffffff05 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
      >
        {/* Left Side - Visual/Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-green-600 to-emerald-800 text-white relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }} />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tighter">AUTO TRADING POS</h1>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                Empower your business with <span className="text-green-300">smart trading</span> solutions.
              </h2>
              <p className="text-green-100/80 text-lg leading-relaxed max-w-md">
                Streamline your inventory, manage sales, and get real-time insights with our premium point of sale system.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-12">
            <div className="flex items-center gap-4 p-4 rounded-3xl bg-black/20 border border-white/10 backdrop-blur-sm max-w-xs">
              <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-green-900" />
              </div>
              <div>
                <p className="text-sm font-bold">Secure Access</p>
                <p className="text-xs text-green-100/60">Enterprise-grade encryption</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-3xl font-bold text-white mb-2">Welcome Back</h3>
            <p className="text-gray-400">Please enter your details to sign in.</p>
          </div>

          {/* Role Switcher */}
          <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl mb-8 gap-1">
            <button
              onClick={() => setRole("admin")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 text-sm font-semibold",
                role === "admin" 
                  ? "bg-green-500 text-white shadow-lg shadow-green-500/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <UserCircle2 className="w-4 h-4" />
              Admin
            </button>
            <button
              onClick={() => setRole("cashier")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 text-sm font-semibold",
                role === "cashier" 
                  ? "bg-green-500 text-white shadow-lg shadow-green-500/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Store className="w-4 h-4" />
              Cashier
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-500 transition-colors">
                  <UserCircle2 className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all placeholder:text-gray-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-12 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all placeholder:text-gray-600"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-green-500 focus:ring-green-500/30" />
                <span className="group-hover:text-gray-200 transition-colors">Remember me</span>
              </label>
              <button type="button" className="text-green-500 hover:text-green-400 font-semibold transition-colors">
                Forgot Password?
              </button>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2"
                >
                  <CircleDot className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative",
                isLoading 
                  ? "bg-green-600/50 cursor-not-allowed" 
                  : "bg-green-500 hover:bg-green-400 shadow-xl shadow-green-500/20 active:scale-[0.98]"
              )}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account? <button className="text-green-500 font-bold hover:text-green-400 transition-colors">Contact Administrator</button>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Footer Decoration */}
      <div className="absolute bottom-8 text-gray-600 text-xs font-medium tracking-widest uppercase">
        © 2026 Auto Trading POS • Premium Experience
      </div>
    </div>
  );
}
