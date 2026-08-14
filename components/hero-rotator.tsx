"use client";

import { useEffect, useState } from "react";
import type { CollectionItem } from "@/lib/types";

const ROTATE_INTERVAL_MS = 4500;

export default function HeroRotator({ items }: { items: CollectionItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const photos = items.filter((item) => item.fotoBaju);

  useEffect(() => {
    if (paused || photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, ROTATE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused, photos.length]);

  if (photos.length === 0) {
    return (
      <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-[var(--bg-card)] flex items-center justify-center text-sm text-[var(--gold)]">
        Megumi Beauty Studio
      </div>
    );
  }

  const current = photos[index] ?? photos[0];

  return (
    <div
      className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-[var(--bg-card)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {photos.map((item, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={item.id}
          src={item.fotoBaju}
          alt={item.namaBaju}
          loading={i === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute bottom-4 left-4 rounded-full bg-white/90 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-[var(--ink)] shadow-sm">
        {current.namaBaju}
      </div>

      {photos.length > 1 && (
        <div className="absolute top-4 right-4 flex gap-1.5">
          {photos.map((item, i) => (
            <button
              key={item.id}
              aria-label={`Lihat ${item.namaBaju}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
