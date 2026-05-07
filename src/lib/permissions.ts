export type Permission =
  | "dashboard"
  | "pos"
  | "products"
  | "categories"
  | "vehicle-parts"
  | "customers"
  | "suppliers"
  | "purchases"
  | "reports"
  | "settings";

export interface PermissionItem {
  id: Permission;
  label: string;
  description: string;
}

export const APP_PERMISSIONS: PermissionItem[] = [
  { id: "dashboard", label: "Dashboard", description: "Access to the main dashboard and overview" },
  { id: "pos", label: "POS Billing", description: "Access to the Point of Sale billing interface" },
  { id: "products", label: "Products", description: "Manage product inventory and stock" },
  { id: "categories", label: "Categories", description: "Manage product categories" },
  { id: "vehicle-parts", label: "Vehicle Parts", description: "Manage vehicle-specific parts data" },
  { id: "customers", label: "Customers", description: "View and manage customer information" },
  { id: "suppliers", label: "Suppliers", description: "Manage supplier details and contacts" },
  { id: "purchases", label: "Purchases", description: "Record and manage stock purchases" },
  { id: "reports", label: "Reports", description: "View sales and business analytics reports" },
  { id: "settings", label: "Settings", description: "Access system-wide configuration and user management" },
];

export const DEFAULT_CASHIER_PERMISSIONS: Permission[] = ["pos"];

export function getCashierPermissions(): Permission[] {
  if (typeof window === "undefined") return DEFAULT_CASHIER_PERMISSIONS;
  const stored = localStorage.getItem("cashier_permissions");
  return stored ? JSON.parse(stored) : DEFAULT_CASHIER_PERMISSIONS;
}

export function setCashierPermissions(permissions: Permission[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cashier_permissions", JSON.stringify(permissions));
}

export function hasPermission(userRole: string, path: string): boolean {
  if (userRole === "admin" || userRole === "Owner" || userRole === "Manager") return true;
  if (userRole !== "cashier") return false;

  const permissions = getCashierPermissions();
  
  // Map path to permission ID
  const pathMap: Record<string, Permission> = {
    "/": "dashboard",
    "/pos": "pos",
    "/products": "products",
    "/categories": "categories",
    "/vehicle-parts": "vehicle-parts",
    "/customers": "customers",
    "/suppliers": "suppliers",
    "/purchases": "purchases",
    "/reports": "reports",
    "/settings": "settings",
  };

  // Find the closest match for the path
  const matchedPermission = pathMap[path];
  
  if (!matchedPermission) {
    // Check for subpaths if needed, but for now exact match is fine
    return false;
  }
  
  return permissions.includes(matchedPermission);
}
