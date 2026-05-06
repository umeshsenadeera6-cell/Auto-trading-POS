"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ScanLine,
  UserPlus,
  CreditCard,
  Banknote,
  Wallet,
  ChevronDown,
  Info,
  X,
  CheckCircle2,
  Printer,
  FileText,
  Car,
  History,
  Tag,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { products, categories, customers } from "@/lib/mockData";
import { Product, CartItem, Customer } from "@/lib/types";
import { formatCurrency, cn, calculateTotal, generateInvoiceNumber } from "@/lib/utils";

export default function POSPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [discount, setDiscount] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "credit" | "transfer">("cash");
  const [isSuccess, setIsSuccess] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState("");
  
  const barcodeRef = useRef<HTMLInputElement>(null);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.barcode.includes(searchQuery);
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Cart Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  const { total, vat, discount: discountAmount } = useMemo(() => {
    return calculateTotal(subtotal, discount, 18); // 18% VAT
  }, [subtotal, discount]);

  // Handlers
  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1, discount: 0 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => 
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find(p => p.barcode === barcodeInput || p.sku === barcodeInput);
    if (product) {
      addToCart(product);
      setBarcodeInput("");
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowCheckout(true);
  };

  const completeOrder = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setShowCheckout(false);
      setIsSuccess(false);
      setCart([]);
      setDiscount(0);
      setSelectedCustomer(null);
    }, 2000);
  };

  return (
    <MainLayout pageTitle="POS Billing" pageSubtitle="Process sales and generate invoices">
      <div className="pos-layout gap-6 -mt-2">
        {/* Left Side: Product Selection */}
        <div className="space-y-6 overflow-hidden flex flex-col">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name, SKU or barcode (⌘F)"
                className="input-field pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <form onSubmit={handleBarcodeSubmit} className="relative w-full sm:w-48">
              <ScanLine className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
              <input
                ref={barcodeRef}
                type="text"
                placeholder="Barcode Scan"
                className="input-field pl-10 border-green-200 focus:ring-green-500/20"
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
              />
            </form>
          </div>

          {/* Category Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scroll no-scrollbar">
            <button
              onClick={() => setSelectedCategory("All")}
              className={cn(
                "px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap",
                selectedCategory === "All"
                  ? "bg-green-500 text-white shadow-green-glow"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
              )}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={cn(
                  "px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center gap-2",
                  selectedCategory === cat.name
                    ? "bg-green-500 text-white shadow-green-glow"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
                )}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto custom-scroll pr-2">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product)}
                  className={cn(
                    "product-card flex flex-col h-full",
                    product.stock <= 0 && "opacity-60 cursor-not-allowed",
                    product.stock <= product.minStock && product.stock > 0 && "border-amber-200"
                  )}
                >
                  <div className="relative aspect-square mb-3 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-50">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="object-cover" />
                    ) : (
                      <Car className="w-12 h-12 text-gray-200" />
                    )}
                    <div className="absolute top-2 right-2">
                      <span className={cn(
                        "badge text-[10px]",
                        product.stock > product.minStock ? "badge-green" : "badge-red"
                      )}>
                        {product.stock} {product.unit}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-0.5">{product.category}</p>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 leading-snug">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                    <p className="text-sm font-bold text-green-600">
                      {formatCurrency(product.price)}
                    </p>
                    <button className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No products found</h3>
                <p className="text-gray-500 max-w-xs mx-auto mt-1">
                  Try adjusting your search or category filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Cart Panel */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden h-[calc(100vh-100px)]">
          {/* Cart Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 leading-none">Current Sale</h2>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                  {generateInvoiceNumber()}
                </p>
              </div>
            </div>
            <button
              onClick={() => setCart([])}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Customer Selection */}
          <div className="px-5 py-3 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Customer</label>
              <button className="text-[10px] font-bold text-green-600 hover:underline flex items-center gap-1">
                <UserPlus className="w-3 h-3" /> New Customer
              </button>
            </div>
            <div className="relative">
              <select
                className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm appearance-none cursor-pointer focus:ring-2 focus:ring-green-500/20"
                onChange={(e) => setSelectedCustomer(customers.find(c => c.id === e.target.value) || null)}
                value={selectedCustomer?.id || ""}
              >
                <option value="">Walk-in Customer</option>
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.phone})</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto custom-scroll p-5 space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="cart-item group"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate mb-1">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-gray-500 font-medium">
                      {formatCurrency(item.product.price)} / unit
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden h-8">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="px-2 hover:bg-gray-50 text-gray-500 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="px-2 hover:bg-gray-50 text-gray-500 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <p className="text-sm font-bold text-gray-900">
                        {formatCurrency(item.product.price * item.quantity)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {cart.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
                <ShoppingCart className="w-12 h-12 mb-3" />
                <p className="text-sm font-medium">Your cart is empty</p>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="p-5 bg-gray-50 border-t border-gray-100 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-semibold text-gray-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Discount (%)</span>
                <input
                  type="number"
                  className="w-12 bg-white border border-gray-200 rounded px-1.5 py-0.5 text-xs text-center font-bold"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                />
              </div>
              <span className="font-semibold text-red-500">-{formatCurrency(discountAmount)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">VAT (18%)</span>
              <span className="font-semibold text-gray-900">{formatCurrency(vat)}</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <span className="text-2xl font-black text-green-600">{formatCurrency(total)}</span>
            </div>

            <button
              disabled={cart.length === 0}
              onClick={handleCheckout}
              className={cn(
                "w-full btn-primary py-4 mt-2 justify-center text-lg",
                cart.length === 0 && "opacity-50 cursor-not-allowed"
              )}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <div className="modal-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="modal-content max-w-2xl overflow-hidden p-0"
            >
              <div className="flex h-[500px]">
                {/* Left: Summary */}
                <div className="w-1/2 p-8 border-r border-gray-100 bg-gray-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                  <div className="space-y-4 max-h-[280px] overflow-y-auto mb-6 pr-2 custom-scroll">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-800 leading-tight">{item.product.name}</p>
                          <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900">{formatCurrency(item.product.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2 border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-semibold">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Discount</span>
                      <span className="font-semibold text-red-500">-{formatCurrency(discountAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">VAT</span>
                      <span className="font-semibold">{formatCurrency(vat)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-2 text-green-600">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Payment */}
                <div className="w-1/2 p-8 flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold text-gray-900">Payment</h3>
                    <button onClick={() => setShowCheckout(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <button
                      onClick={() => setPaymentMethod("cash")}
                      className={cn(
                        "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                        paymentMethod === "cash" ? "border-green-500 bg-green-50 text-green-700" : "border-gray-100 hover:border-gray-200 text-gray-500"
                      )}
                    >
                      <Banknote className="w-8 h-8" />
                      <span className="text-sm font-bold">Cash</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={cn(
                        "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                        paymentMethod === "card" ? "border-green-500 bg-green-50 text-green-700" : "border-gray-100 hover:border-gray-200 text-gray-500"
                      )}
                    >
                      <CreditCard className="w-8 h-8" />
                      <span className="text-sm font-bold">Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("credit")}
                      className={cn(
                        "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                        paymentMethod === "credit" ? "border-green-500 bg-green-50 text-green-700" : "border-gray-100 hover:border-gray-200 text-gray-500"
                      )}
                    >
                      <Wallet className="w-8 h-8" />
                      <span className="text-sm font-bold">Credit</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod("transfer")}
                      className={cn(
                        "p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                        paymentMethod === "transfer" ? "border-green-500 bg-green-50 text-green-700" : "border-gray-100 hover:border-gray-200 text-gray-500"
                      )}
                    >
                      <History className="w-8 h-8" />
                      <span className="text-sm font-bold">Transfer</span>
                    </button>
                  </div>

                  {paymentMethod === "cash" && (
                    <div className="space-y-4 mb-auto">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Received Amount</label>
                        <input
                          type="number"
                          className="w-full text-2xl font-bold bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500/20"
                          defaultValue={total}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-auto">
                    <button
                      onClick={completeOrder}
                      className="w-full btn-primary py-4 justify-center text-lg relative overflow-hidden"
                    >
                      {isSuccess ? (
                        <motion.span initial={{ y: 40 }} animate={{ y: 0 }} className="flex items-center gap-2">
                          <CheckCircle2 className="w-6 h-6" /> Success
                        </motion.span>
                      ) : (
                        "Complete Sale"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
