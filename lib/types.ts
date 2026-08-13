export const clothingInventoryCategories = [
  "Aksesoris",
  "Baju Anak",
  "Baju Party",
  "Blangkon",
  "Busana Adat",
  "Ekor Gaun",
  "Gaun",
  "Kain",
  "Kebaya",
  "Kerudung/Jilbab",
  "Longtorso",
  "Manset",
  "Pengantin Pria",
  "Pengantin Wanita",
  "Selop",
  "Veil",
  "Lainnya",
] as const;

export type ClothingInventoryCategory = (typeof clothingInventoryCategories)[number];

export type ClothingInventoryStatus = "Tersedia" | "Dipakai" | "Perawatan" | "Rusak";

export type CollectionItem = {
  id: string;
  kategoriBaju: ClothingInventoryCategory;
  fotoBaju: string;
  jumlah: number;
  namaBaju: string;
  jenisModel: string;
  warna: string;
  ukuran: string;
  status: ClothingInventoryStatus;
};
