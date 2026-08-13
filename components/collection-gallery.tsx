"use client";

import { useMemo, useState } from "react";
import type { CollectionItem } from "@/lib/types";
import { statusClass, statusLabel } from "@/lib/status";

const ALL = "Semua";

export default function CollectionGallery({ items }: { items: CollectionItem[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const [selected, setSelected] = useState<CollectionItem | null>(null);

  const categories = useMemo(() => {
    const present = Array.from(new Set(items.map((item) => item.kategoriBaju))).sort();
    return [ALL, ...present];
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === ALL || item.kategoriBaju === category;
      const matchesSearch =
        !q ||
        item.namaBaju.toLowerCase().includes(q) ||
        item.jenisModel.toLowerCase().includes(q) ||
        item.warna.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [items, search, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors ${
                category === cat
                  ? "bg-[var(--gold)] border-[var(--gold)] text-white"
                  : "border-[var(--border)] text-[var(--ink-soft)] hover:border-[var(--gold-light)] hover:text-[var(--ink)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama, model, atau warna..."
          className="w-full sm:w-72 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 text-sm outline-none focus:border-[var(--gold-light)]"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-[var(--ink-faint)]">
          Tidak ada item yang cocok dengan pencarian.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {filtered.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="group text-left rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[3/4] bg-[var(--gold-soft)] overflow-hidden">
                {item.fotoBaju ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.fotoBaju}
                    alt={item.namaBaju}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-[var(--gold)]">
                    Tanpa Foto
                  </div>
                )}
                <span
                  className={`absolute top-2 right-2 rounded-full px-2.5 py-1 text-[11px] font-medium ${statusClass[item.status]}`}
                >
                  {statusLabel[item.status]}
                </span>
              </div>
              <div className="p-3">
                <p className="font-display text-[15px] leading-snug line-clamp-1">{item.namaBaju}</p>
                <p className="mt-0.5 text-xs text-[var(--ink-faint)] line-clamp-1">
                  {item.kategoriBaju}
                  {item.ukuran ? ` · ${item.ukuran}` : ""}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ItemModal({ item, onClose }: { item: CollectionItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl bg-[var(--bg-card)] shadow-xl sm:grid sm:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[3/4] sm:aspect-auto bg-[var(--gold-soft)]">
          {item.fotoBaju ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.fotoBaju} alt={item.namaBaju} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-[var(--gold)]">
              Tanpa Foto
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col">
          <button
            onClick={onClose}
            className="self-end text-[var(--ink-faint)] hover:text-[var(--ink)] text-sm mb-2"
            aria-label="Tutup"
          >
            ✕
          </button>
          <span
            className={`self-start rounded-full px-2.5 py-1 text-[11px] font-medium mb-3 ${statusClass[item.status]}`}
          >
            {statusLabel[item.status]}
          </span>
          <h2 className="font-display text-2xl leading-snug">{item.namaBaju}</h2>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">{item.kategoriBaju}</p>

          <dl className="mt-5 space-y-2.5 text-sm">
            {item.jenisModel && (
              <Row label="Model" value={item.jenisModel} />
            )}
            {item.warna && <Row label="Warna" value={item.warna} />}
            {item.ukuran && <Row label="Ukuran" value={item.ukuran} />}
            {item.jumlah > 1 && <Row label="Stok" value={`${item.jumlah} pcs`} />}
          </dl>

          <a
            href="https://wa.me/6281807429240"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--gold-light)] transition-colors"
          >
            Tanya via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[var(--border)] pb-2">
      <dt className="text-[var(--ink-faint)]">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
