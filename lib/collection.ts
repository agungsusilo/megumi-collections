import "server-only";
import { SUPABASE_URL, supabaseAdmin } from "./supabase";
import type { CollectionItem } from "./types";

const STORAGE_PREFIX = "storage:";
const SELECT_COLUMNS =
  "id, kategori_baju, foto_baju, jumlah, nama_baju, jenis_model, warna, ukuran, status, butuh_perbaikan, updated_at, created_at";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDisplayable(row: any) {
  return row.status !== "Rusak" && !row.butuh_perbaikan;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): CollectionItem {
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
}

export async function getCollectionItems(): Promise<CollectionItem[]> {
  const { data, error } = await supabaseAdmin
    .from("clothing_inventory")
    .select(SELECT_COLUMNS)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).filter(isDisplayable).map(mapRow);
}

// Items the admin marked as featured (Website settings page in megumi-dashboard),
// in their chosen order. Falls back to the newest items when nothing has been
// featured yet — or when the is_featured/featured_order columns don't exist yet
// (migration not applied) — so the "Koleksi Terbaru" section is never empty.
export async function getFeaturedCollectionItems(limit: number): Promise<CollectionItem[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from("clothing_inventory")
      .select(`${SELECT_COLUMNS}, is_featured, featured_order`)
      .eq("is_featured", true)
      .order("featured_order", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(limit * 2);
    if (error) throw error;

    const featured = (data ?? []).filter(isDisplayable).map(mapRow).slice(0, limit);
    if (featured.length > 0) return featured;
  } catch {
    // is_featured / featured_order columns not present yet — fall through to newest items.
  }

  const all = await getCollectionItems();
  return all.slice(0, limit);
}
