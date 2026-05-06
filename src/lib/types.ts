export interface Product {
  id: string;
  sku: string;
  barcode: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  costPrice: number;
  stock: number;
  minStock: number;
  unit: string;
  image?: string;
  vehicleCompatibility: {
    brand: string;
    models: string[];
    years: string;
  }[];
  description: string;
  location: string;
  supplier: string;
  isActive: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  productCount: number;
  color: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  creditBalance: number;
  totalPurchases: number;
  totalSpent: number;
  loyaltyPoints: number;
  joinedAt: string;
  lastPurchase: string;
  notes: string;
  vehicleInfo: {
    brand: string;
    model: string;
    year: string;
    regNo: string;
  }[];
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  paymentTerms: string;
  outstandingBalance: number;
  totalPurchases: number;
  rating: number;
  isActive: boolean;
  joinedAt: string;
}

export interface SaleItem {
  product: Product;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface Sale {
  id: string;
  invoiceNo: string;
  customer?: Customer;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  paymentMethod: "cash" | "card" | "credit" | "transfer";
  status: "completed" | "pending" | "cancelled" | "refunded";
  cashier: string;
  createdAt: string;
  notes?: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplier: Supplier;
  items: {
    product: Product;
    quantity: number;
    unitCost: number;
    total: number;
  }[];
  subtotal: number;
  total: number;
  status: "pending" | "ordered" | "received" | "cancelled";
  orderDate: string;
  expectedDate: string;
  receivedDate?: string;
  notes?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  discount: number;
}
