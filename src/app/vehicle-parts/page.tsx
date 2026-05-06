"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Car,
  ChevronRight,
  Filter,
  Zap,
  CheckCircle2,
  AlertCircle,
  X,
  History,
  Info,
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { VEHICLE_BRANDS, getModelsForBrand, cn, formatCurrency } from "@/lib/utils";
import { products } from "@/lib/mockData";

export default function VehiclePartsFinder() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = () => {
    // Mock search logic
    const filtered = products.filter(p => {
      const matchBrand = !selectedBrand || p.vehicleCompatibility.some(vc => vc.brand === selectedBrand);
      const matchModel = !selectedModel || p.vehicleCompatibility.some(vc => vc.models.includes(selectedModel));
      return matchBrand && matchModel;
    });
    setResults(filtered);
  };

  return (
    <MainLayout pageTitle="Spare Part Finder" pageSubtitle="Find exact matching parts by vehicle make, model and year">
      <div className="space-y-8">
        {/* Finder Hero */}
        <div className="bg-[#0f1117] rounded-[40px] p-8 md:p-12 relative overflow-hidden text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <Car className="w-full h-full -mr-20 -mt-10 rotate-12" />
          </div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Precise Part Identification for <span className="text-green-500">Every Vehicle.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl">
              Use our intelligent compatibility engine to find parts that fit perfectly. Search across 10,000+ SKUs with vehicle-specific accuracy.
            </p>

            <div className="bg-white/5 backdrop-blur-md p-2 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
                <select 
                  className="bg-transparent border-none text-white text-sm font-bold focus:ring-0 outline-none p-3"
                  value={selectedBrand}
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                    setSelectedModel("");
                  }}
                >
                  <option value="" className="text-gray-900">Select Brand</option>
                  {VEHICLE_BRANDS.map(b => <option key={b} value={b} className="text-gray-900">{b}</option>)}
                </select>
                <div className="w-px h-8 bg-white/10 hidden md:block self-center" />
                <select 
                  className="bg-transparent border-none text-white text-sm font-bold focus:ring-0 outline-none p-3"
                  disabled={!selectedBrand}
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  <option value="" className="text-gray-900">Select Model</option>
                  {selectedBrand && getModelsForBrand(selectedBrand).map(m => <option key={m} value={m} className="text-gray-900">{m}</option>)}
                </select>
                <div className="w-px h-8 bg-white/10 hidden md:block self-center" />
                <select 
                  className="bg-transparent border-none text-white text-sm font-bold focus:ring-0 outline-none p-3"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="" className="text-gray-900">Year</option>
                  {Array.from({length: 25}, (_, i) => 2024 - i).map(y => <option key={y} value={y} className="text-gray-900">{y}</option>)}
                </select>
              </div>
              <button 
                onClick={handleSearch}
                className="w-full md:w-auto px-10 py-4 bg-green-500 hover:bg-green-600 text-white font-black rounded-2xl shadow-green-glow transition-all active:scale-95"
              >
                Find Parts
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-gray-900">
              {results.length > 0 ? `Results for ${selectedBrand} ${selectedModel}` : "Popular Matching Parts"}
            </h3>
            {results.length > 0 && (
              <button onClick={() => setResults([])} className="text-sm font-bold text-gray-400 hover:text-gray-900 flex items-center gap-1">
                Clear <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(results.length > 0 ? results : products.slice(0, 4)).map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card hover:shadow-card-hover transition-all group"
              >
                <div className="aspect-square bg-gray-50 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <Car className="w-12 h-12 text-gray-200" />
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-green text-[10px]">Verified Fit</span>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
                <h4 className="font-black text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors mb-4">{product.name}</h4>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Compatibility</span>
                    <span className="font-bold text-gray-900">{product.vehicleCompatibility[0].brand} {product.vehicleCompatibility[0].models[0]}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Availability</span>
                    <span className="font-bold text-green-600">In Stock ({product.stock})</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <p className="text-lg font-black text-gray-900">{formatCurrency(product.price)}</p>
                  <button className="p-2.5 bg-gray-50 hover:bg-green-500 hover:text-white text-gray-400 rounded-xl transition-all">
                    <Zap className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {results.length === 0 && !selectedBrand && (
            <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 flex items-center gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-500">
                <Info className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-black text-blue-900 text-lg">Intelligent Suggestions</h4>
                <p className="text-blue-700 max-w-xl">
                  Select a vehicle make and model to see precision-matched spare parts. Our system uses VIN-level data to ensure zero returns on compatible parts.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
