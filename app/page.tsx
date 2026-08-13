import Image from "next/image";
import CollectionGallery from "@/components/collection-gallery";
import FeaturedSection from "@/components/featured-section";
import { getCollectionItems, getFeaturedCollectionItems } from "@/lib/collection";
import { getFeaturedCatalogCount } from "@/lib/settings";

export const revalidate = 120;

export default async function Home() {
  const featuredCount = await getFeaturedCatalogCount();
  const [items, featuredItems] = await Promise.all([
    getCollectionItems(),
    getFeaturedCollectionItems(featuredCount),
  ]);

  return (
    <div className="flex-1 flex flex-col">
      <nav className="border-b border-[var(--border)] bg-[var(--bg-card)]">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <Image src="/megumi-logo.png" alt="Megumi Beauty Studio" width={40} height={40} priority />
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold tracking-wide">MEGUMI BEAUTY STUDIO</p>
            <p className="text-[11px] text-[var(--ink-faint)]">Makeup • Attire • Accessories</p>
          </div>
        </div>
      </nav>

      <header className="bg-[var(--bg-card)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10 text-center">
          <h1 className="font-display text-3xl sm:text-4xl">Koleksi Baju</h1>
          <p className="mt-2 max-w-md mx-auto text-sm text-[var(--ink-soft)]">
            Gaun, kebaya, busana adat, dan aksesoris rental dari Megumi Beauty Studio.
            Pilih salah satu item untuk melihat detailnya.
          </p>
        </div>
      </header>

      <FeaturedSection items={featuredItems} />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 flex-1">
        <CollectionGallery items={items} />
      </main>

      <footer className="border-t border-[var(--border)] py-8 text-center text-xs text-[var(--ink-faint)]">
        © {new Date().getFullYear()} Megumi Beauty Studio — Makeup • Attire • Accessories
      </footer>
    </div>
  );
}
