import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "LKR"): string {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-LK", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date));
}

export function formatDateTime(date: string | Date): string {
  return new Intl.DateTimeFormat("en-LK", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function generateInvoiceNumber(): string {
  const prefix = "INV";
  const year = new Date().getFullYear().toString().slice(-2);
  const num = Math.floor(Math.random() * 90000) + 10000;
  return `${prefix}-${year}-${num}`;
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + "..." : str;
}

export function calculateVAT(amount: number, rate = 18): number {
  return (amount * rate) / 100;
}

export function calculateTotal(
  subtotal: number,
  discount: number,
  vatRate: number
): { discount: number; vat: number; total: number } {
  const discountAmount = (subtotal * discount) / 100;
  const afterDiscount = subtotal - discountAmount;
  const vat = (afterDiscount * vatRate) / 100;
  return {
    discount: discountAmount,
    vat,
    total: afterDiscount + vat,
  };
}

export const VEHICLE_BRANDS = [
  "Toyota",
  "Honda",
  "Nissan",
  "Suzuki",
  "Mitsubishi",
  "Mazda",
  "Ford",
  "BMW",
  "Mercedes-Benz",
  "Hyundai",
  "Kia",
  "Volkswagen",
  "Isuzu",
  "Tata",
  "Bajaj",
];

export const VEHICLE_MODELS: Record<string, string[]> = {
  Toyota: [
    "Corolla",
    "Camry",
    "Land Cruiser",
    "Prado",
    "Hilux",
    "Vitz",
    "Aqua",
    "Premio",
    "Allion",
    "KDH Van",
  ],
  Honda: [
    "Civic",
    "Accord",
    "CR-V",
    "Fit",
    "Vezel",
    "Grace",
    "Jazz",
    "City",
    "HR-V",
  ],
  Nissan: [
    "Sunny",
    "Tiida",
    "X-Trail",
    "Navara",
    "Leaf",
    "March",
    "Note",
    "Patrol",
  ],
  Suzuki: [
    "Alto",
    "Swift",
    "Wagon R",
    "Vitara",
    "Jimny",
    "SX4",
    "Celerio",
    "Baleno",
  ],
  Mitsubishi: ["Lancer", "Outlander", "Pajero", "L200", "Colt", "Montero"],
};

export function getModelsForBrand(brand: string): string[] {
  return VEHICLE_MODELS[brand] || [];
}
