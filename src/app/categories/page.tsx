"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Package,
  ChevronRight,
  PlusCircle,
  X,
  Palette,
  LayoutGrid,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { categories } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout pageTitle="Categories" pageSubtitle="Organize your spare parts inventory by groups">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              className="input-field pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button onClick={() => setShowAddModal(true)} className="btn-primary">
            <Plus className="w-4 h-4" />
            New Category
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-50 transition-transform group-hover:scale-110 duration-300"
                    style={{ backgroundColor: `${category.color}15`, color: category.color }}
                  >
                    {category.icon}
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                      <Edit className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <h3 className="text-xl font-black text-gray-900 mb-2">{category.name}</h3>
                <p className="text-xs text-gray-500 font-medium mb-6 line-clamp-2 h-8">
                  {category.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-300" />
                    <span className="text-sm font-bold text-gray-900">{category.productCount}</span>
                    <span className="text-xs text-gray-400 font-medium">Products</span>
                  </div>
                  <button className="text-green-600 hover:text-green-700 font-bold text-xs flex items-center gap-1 group/btn">
                    View Products <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              <div 
                className="h-1.5 w-full"
                style={{ backgroundColor: category.color }}
              />
            </motion.div>
          ))}

          {/* Add New Card */}
          <motion.div
            onClick={() => setShowAddModal(true)}
            whileHover={{ scale: 0.98 }}
            className="border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-4 p-8 cursor-pointer hover:border-green-300 hover:bg-green-50/30 transition-all duration-300 group"
          >
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-green-100 group-hover:scale-110 transition-all duration-300">
              <PlusCircle className="w-8 h-8 text-gray-300 group-hover:text-green-600" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-900">Add Category</h3>
              <p className="text-xs text-gray-400 mt-1">Create a new group for parts</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="modal-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="modal-content max-w-lg"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-gray-900">New Category</h3>
                  <p className="text-sm text-gray-500">Define a new inventory group</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Category Name</label>
                  <div className="relative">
                    <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                    <input type="text" className="input-field pl-12" placeholder="e.g. Braking System" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Description</label>
                  <textarea 
                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-green-500/20 min-h-[100px] resize-none"
                    placeholder="Brief description of parts in this category..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Icon / Emoji</label>
                    <input type="text" className="input-field text-center text-xl" placeholder="⚙️" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Theme Color</label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500 cursor-pointer shadow-sm" />
                      <div className="flex-1 relative">
                        <Palette className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" className="input-field pl-9 text-xs font-mono" placeholder="#22C55E" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 font-bold text-gray-500">Cancel</button>
                  <button className="flex-1 btn-primary justify-center py-3">Create Category</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
