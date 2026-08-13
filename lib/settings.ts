import "server-only";
import { supabaseAdmin } from "./supabase";

const DEFAULT_FEATURED_COUNT = 8;

// Controlled from megumi-dashboard's "Website" admin page. Falls back to a
// sane default if the site_settings table/row doesn't exist yet.
export async function getFeaturedCatalogCount(): Promise<number> {
  try {
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("featured_catalog_count")
      .eq("id", 1)
      .maybeSingle();
    if (error) throw error;
    return Number(data?.featured_catalog_count) || DEFAULT_FEATURED_COUNT;
  } catch {
    return DEFAULT_FEATURED_COUNT;
  }
}
