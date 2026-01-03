import { apiFetch } from "@/lib/api";
import type { PurchaseProductPayload } from "@/types/order";

export const purchaseProduct = (
  data: PurchaseProductPayload,
  token: string
) => {
  return apiFetch("/api/purchase-product/", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
};

export const getUserOrders = (token: string) => {
  return apiFetch("/api/user-orders/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
};
