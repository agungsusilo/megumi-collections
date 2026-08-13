import "server-only";
import { SUPABASE_URL, supabaseAdmin } from "./supabase";
import type { CollectionItem } from "./types";

const STORAGE_PREFIX = "storage:";

function resolveImageUrl(value: string) {
  if (!value) return "";
  if (!value.startsWith(STORAGE_PREFIX)) return value;
  const withoutPrefix = value.slice(STORAGE_PREFIX.length);
  const slashIndex = withoutPrefix.indexOf("/");
  if (slashIndex <= 0) return "";
  const bucket = withoutPrefix.slice(0, slashIndex);
  const path = withoutPrefix.slice(slashIndex + 1);
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}

export async function getCollectionItems(): Promise<CollectionItem[]> {
  const { data, error } = await supabaseAdmin
    .from("clothing_inventory")
    .select(
      "id, kategori_baju, foto_baju, jumlah, nama_baju, jenis_model, warna, ukuran, status, butuh_perbaikan, updated_at, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? [])
    .filter((row) => row.status !== "Rusak" && !row.butuh_perbaikan)
    .map((row) => {
      const base = resolveImageUrl(row.foto_baju || "");
      const fotoBaju = base && row.updated_at ? `${base}?t=${new Date(row.updated_at).getTime()}` : base;
      return {
        id: row.id,
        kategoriBaju: row.kategori_baju || "Lainnya",
        fotoBaju,
        jumlah: Number(row.jumlah || 1),
        namaBaju: row.nama_baju || "",
        jenisModel: row.jenis_model || "",
        warna: row.warna || "",
        ukuran: row.ukuran || "",
        status: row.status || "Tersedia",
      } satisfies CollectionItem;
    });
}
