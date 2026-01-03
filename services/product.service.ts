import { apiFetch } from "@/lib/api";

export const getProducts = () =>
  apiFetch("/api/new-products/", {
    cache: "no-store",
  });
