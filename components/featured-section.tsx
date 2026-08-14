"use client";

import { useEffect, useRef, useState } from "react";
import type { CollectionItem } from "@/lib/types";
import { ItemModal } from "./item-modal";
import { SectionHeading } from "./section-heading";

const AUTO_SCROLL_INTERVAL_MS = 3500;

export default function FeaturedSection({ items }: { items: CollectionItem[] }) {
  const [selected, setSelected] = useState<CollectionItem | null>(null);
  const [paused, setPaused] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused || selected || items.length < 3) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const step = el.clientWidth * 0.8;
      const next = el.scrollLeft + step;
      if (maxScroll <= 0) return;
      if (next >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollTo({ left: next, behavior: "smooth" });
      }
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused, selected, items.length]);

  if (items.length === 0) return null;

  return (
    <section id="koleksi-terbaru" className="border-b border-[var(--border)] bg-[var(--gold-soft)]/40 scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <SectionHeading eyebrow="Koleksi Terbaru" title="Featured Products" className="mb-5" />

        <div
          ref={scrollerRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scroll-smooth"
        >
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="group shrink-0 w-40 sm:w-48 text-left rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/5] bg-[var(--gold-soft)] overflow-hidden">
                {item.fotoBaju ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.fotoBaju}
                    alt={item.namaBaju}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-[var(--gold)]">
                    Tanpa Foto
                  </div>
                )}
                <span className="absolute top-2 left-2 rounded-full bg-[var(--gold)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
                  Baru
                </span>
              </div>
              <div className="p-2.5">
                <p className="font-display text-[13px] font-semibold leading-snug line-clamp-1">
                  {item.namaBaju}
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--ink-faint)] line-clamp-1">
                  {item.kategoriBaju}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
