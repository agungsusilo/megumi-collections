import Image from "next/image";
import CollectionGallery from "@/components/collection-gallery";
import { getCollectionItems } from "@/lib/collection";

export const revalidate = 120;

export default async function Home() {
  const items = await getCollectionItems();

  return (
    <div className="flex-1">
      <header className="border-b border-[var(--border)] bg-[var(--bg-card)]">
        <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col items-center text-center sm:py-14">
          <Image
            src="/megumi-logo.png"
            alt="Megumi Beauty Studio"
            width={140}
            height={140}
            className="mb-4"
            priority
          />
          <h1 className="font-display text-3xl sm:text-4xl">Koleksi Baju</h1>
          <p className="mt-2 max-w-md text-sm text-[var(--ink-soft)]">
            Gaun, kebaya, busana adat, dan aksesoris rental dari Megumi Beauty Studio.
            Sentuh salah satu item untuk melihat detailnya.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <CollectionGallery items={items} />
      </main>

      <footer className="border-t border-[var(--border)] py-8 text-center text-xs text-[var(--ink-faint)]">
        Megumi Beauty Studio — Makeup • Attire • Accessories
      </footer>
    </div>
  );
}
