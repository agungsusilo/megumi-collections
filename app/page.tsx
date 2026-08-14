import Image from "next/image";
import CollectionGallery from "@/components/collection-gallery";
import FeaturedSection from "@/components/featured-section";
import HeroRotator from "@/components/hero-rotator";
import TrustBand from "@/components/trust-band";
import { getCollectionItems, getFeaturedCollectionItems } from "@/lib/collection";
import { getFeaturedCatalogCount } from "@/lib/settings";

export const revalidate = 120;

export default async function Home() {
  const featuredCount = await getFeaturedCatalogCount();
  const [items, featuredItems] = await Promise.all([
    getCollectionItems(),
    getFeaturedCollectionItems(featuredCount),
  ]);

  const heroItems = featuredItems.length > 0 ? featuredItems : items.slice(0, 6);

  return (
    <div className="flex-1 flex flex-col">
      <nav className="border-b border-[var(--border)] bg-[var(--bg-card)]">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image src="/megumi-logo.png" alt="Megumi Beauty Studio" width={40} height={40} priority />
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold tracking-wide">MEGUMI BEAUTY STUDIO</p>
              <p className="text-[11px] text-[var(--ink-faint)]">Makeup • Attire • Accessories</p>
            </div>
          </div>
          <a
            href="https://wa.me/6281807429240"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--ink-soft)] hover:border-[var(--gold-light)] hover:text-[var(--ink)] transition-colors"
          >
            Hubungi via WhatsApp
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-[var(--gold-soft)]">
        <div className="hidden sm:block absolute inset-y-0 left-0 w-1/2 bg-[var(--bg)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20 grid gap-10 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--gold)]">
              Makeup • Attire • Accessories
            </p>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.08] mt-3">
              Koleksi Baju &amp;
              <br />
              Aksesoris Pengantin
            </h1>
            <p className="mt-4 max-w-md text-sm text-[var(--ink-soft)]">
              Gaun, kebaya, busana adat, dan aksesoris rental dari Megumi Beauty Studio —
              siap disewa untuk hari spesial Anda.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#koleksi"
                className="inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--gold-light)] transition-colors"
              >
                Lihat Koleksi
              </a>
              <a
                href="https://wa.me/6281807429240"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[var(--ink)]/20 px-6 py-2.5 text-sm font-medium text-[var(--ink)] hover:bg-[var(--bg-card)] transition-colors"
              >
                Hubungi via WhatsApp
              </a>
            </div>
          </div>

          <HeroRotator items={heroItems} />
        </div>
      </section>

      <TrustBand />

      <FeaturedSection items={featuredItems} />

      <main id="koleksi" className="mx-auto w-full max-w-6xl px-4 py-10 flex-1 scroll-mt-16">
        <CollectionGallery items={items} />
      </main>

      <footer className="bg-[var(--ink)] text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 grid gap-10 sm:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-display text-xl tracking-wide">MEGUMI BEAUTY STUDIO</p>
            <p className="mt-1 text-sm text-white/50">Makeup • Attire • Accessories</p>
            <p className="mt-4 max-w-sm text-sm text-white/70 leading-relaxed">
              Koleksi baju &amp; aksesoris pengantin siap disewa untuk momen spesial Anda.
            </p>
            <a
              href="https://wa.me/6281807429240"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Hubungi via WhatsApp
            </a>
          </div>

          <div className="sm:justify-self-end">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40 mb-3">
              Jelajahi
            </p>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a href="#koleksi-terbaru" className="hover:text-white transition-colors">
                  Koleksi Terbaru
                </a>
              </li>
              <li>
                <a href="#koleksi" className="hover:text-white transition-colors">
                  Semua Koleksi
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-5 text-xs text-white/40">
            © {new Date().getFullYear()} Megumi Beauty Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
