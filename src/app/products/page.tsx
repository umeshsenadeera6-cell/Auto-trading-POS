"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Filter,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Package,
  Car,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  History,
  X,
  PlusCircle,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { products, categories } from "@/lib/mockData";
import { Product } from "@/lib/types";
import { formatCurrency, cn, VEHICLE_BRANDS, getModelsForBrand } from "@/lib/utils";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout pageTitle="Products Management" pageSubtitle="Manage your inventory and vehicle spare parts catalog">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name, SKU or brand..."
                className="input-field pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <select
                className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm appearance-none pr-10 outline-none focus:ring-2 focus:ring-green-500/20"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
              <Filter className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="btn-secondary">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button onClick={() => setShowAddModal(true)} className="btn-primary">
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Items</p>
              <p className="text-lg font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Low Stock</p>
              <p className="text-lg font-bold text-gray-900">8 Items</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Compatible Vehicles</p>
              <p className="text-lg font-bold text-gray-900">120+</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
              <History className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Recently Added</p>
              <p className="text-lg font-bold text-gray-900">12 Items</p>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-12">
                    <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  </th>
                  <th>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                      Product Name <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th>SKU / Barcode</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Vehicle Compatibility</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="group">
                    <td>
                      <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100 flex-shrink-0">
                          {product.image ? (
                            <img src={product.image} className="w-8 h-8 object-contain" alt="" />
                          ) : (
                            <Car className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900 leading-tight">{product.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs font-mono font-semibold text-gray-600">{product.sku}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{product.barcode}</p>
                    </td>
                    <td>
                      <span className="badge badge-gray">{product.category}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-bold",
                          product.stock <= product.minStock ? "text-red-600" : "text-gray-900"
                        )}>
                          {product.stock}
                        </span>
                        <span className="text-xs text-gray-400">{product.unit}</span>
                      </div>
                      <div className="w-16 h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            product.stock <= product.minStock ? "bg-red-500" : "bg-green-500"
                          )}
                          style={{ width: `${Math.min((product.stock / (product.minStock * 2)) * 100, 100)}%` }}
                        />
                      </div>
                    </td>
                    <td>
                      <p className="font-bold text-gray-900">{formatCurrency(product.price)}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Cost: {formatCurrency(product.costPrice)}</p>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {product.vehicleCompatibility.map((vc, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold">
                            {vc.brand} {vc.models[0]}
                            {vc.models.length > 1 && `+${vc.models.length - 1}`}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-900">1</span> to <span className="font-semibold text-gray-900">10</span> of <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 transition-all" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="px-3.5 py-1.5 bg-green-500 text-white font-bold rounded-lg shadow-sm">1</button>
              <button className="px-3.5 py-1.5 hover:bg-white border border-transparent hover:border-gray-200 rounded-lg font-medium transition-all">2</button>
              <button className="px-3.5 py-1.5 hover:bg-white border border-transparent hover:border-gray-200 rounded-lg font-medium transition-all">3</button>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-white transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="modal-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="modal-content max-w-4xl max-h-[90vh] overflow-hidden p-0 flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Add New Product</h3>
                  <p className="text-sm text-gray-500">Add a new spare part to your inventory</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 custom-scroll">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Image Upload */}
                  <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700">Product Image</label>
                    <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-100 transition-colors group">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <PlusCircle className="w-6 h-6 text-green-500" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-gray-900">Upload Image</p>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">PNG, JPG up to 5MB</p>
                      </div>
                    </div>
                  </div>

                  {/* General Info */}
                  <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Product Name</label>
                        <input type="text" className="input-field" placeholder="e.g. Toyota Corolla Front Brake Pads" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Category</label>
                        <select className="input-field appearance-none">
                          <option>Select Category</option>
                          {categories.map(c => <option key={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Brand</label>
                        <input type="text" className="input-field" placeholder="e.g. OEM, Bosch, Brembo" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">SKU Code</label>
                        <input type="text" className="input-field font-mono" placeholder="BRK-001" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Barcode (EAN-13)</label>
                        <div className="relative">
                          <input type="text" className="input-field font-mono" placeholder="890123456789" />
                          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 font-bold text-[10px] uppercase">Generate</button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Selling Price</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">LKR</span>
                          <input type="number" className="input-field pl-12 font-bold" placeholder="0.00" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Cost Price</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-bold">LKR</span>
                          <input type="number" className="input-field pl-12 font-bold" placeholder="0.00" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Unit</label>
                        <select className="input-field">
                          <option>Piece</option>
                          <option>Set</option>
                          <option>Litre</option>
                          <option>Kg</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Initial Stock</label>
                        <input type="number" className="input-field" placeholder="0" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 block">Minimum Stock Alert</label>
                        <input type="number" className="input-field text-red-500 font-bold" placeholder="5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Compatibility Section */}
                <div className="mt-10 border-t border-gray-100 pt-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">Vehicle Compatibility</h4>
                      <p className="text-sm text-gray-500">Specify which vehicles this part fits</p>
                    </div>
                    <button className="btn-secondary text-xs">
                      <Plus className="w-3 h-3" /> Add Compatibility
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase mb-1.5 block">Brand</label>
                      <select className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500/20">
                        <option>Select Brand</option>
                        {VEHICLE_BRANDS.map(b => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-bold text-gray-500 uppercase mb-1.5 block">Models</label>
                      <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500/20" placeholder="e.g. Corolla, Aqua, Premio" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase mb-1.5 block">Year Range</label>
                      <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500/20" placeholder="e.g. 2012-2020" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-end gap-3">
                <button onClick={() => setShowAddModal(false)} className="px-6 py-2.5 font-bold text-gray-600 hover:text-gray-900">Cancel</button>
                <button className="btn-primary px-10">Save Product</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
