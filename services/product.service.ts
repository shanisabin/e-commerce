import { apiFetch } from "@/lib/api";

export const getNewProducts = () =>
  apiFetch("/api/new-products/", {
    cache: "no-store",
  });
