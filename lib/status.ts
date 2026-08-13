import type { ClothingInventoryStatus } from "./types";

export const statusLabel: Record<ClothingInventoryStatus, string> = {
  Tersedia: "Tersedia",
  Dipakai: "Sedang Disewa",
  Perawatan: "Perawatan",
  Rusak: "Rusak",
};

export const statusClass: Record<ClothingInventoryStatus, string> = {
  Tersedia: "bg-[var(--s-available-bg)] text-[var(--s-available-tx)]",
  Dipakai: "bg-[var(--s-used-bg)] text-[var(--s-used-tx)]",
  Perawatan: "bg-[var(--s-maintenance-bg)] text-[var(--s-maintenance-tx)]",
  Rusak: "bg-[var(--s-maintenance-bg)] text-[var(--s-maintenance-tx)]",
};
