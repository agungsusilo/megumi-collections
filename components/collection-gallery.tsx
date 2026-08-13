"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CollectionItem } from "@/lib/types";
import { statusClass, statusLabel } from "@/lib/status";

const ALL = "Semua";
const ITEMS_PER_PAGE = 24;

export default function CollectionGallery({ items }: { items: CollectionItem[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>(ALL);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<CollectionItem | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setPage(1);
  }, [search, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * ITEMS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  function goToPage(next: number) {
    const clamped = Math.min(Math.max(1, next), totalPages);
    setPage(clamped);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div>
      <div ref={topRef} className="scroll-mt-20" />

      <div className="sticky top-0 z-30 -mx-4 px-4 py-4 mb-6 bg-[var(--bg)]/95 backdrop-blur border-b border-[var(--border)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:flex-wrap sm:overflow-visible">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-[var(--gold)] border-[var(--gold)] text-white"
                    : "border-[var(--border)] bg-[var(--bg-card)] text-[var(--ink-soft)] hover:border-[var(--gold-light)] hover:text-[var(--ink)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72 shrink-0">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--ink-faint)]"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="m18 18-4.5-4.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, model, atau warna..."
              className="w-full rounded-full border border-[var(--border)] bg-[var(--bg-card)] pl-9 pr-4 py-2 text-sm outline-none focus:border-[var(--gold-light)] focus:ring-2 focus:ring-[var(--gold-soft)]"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-[var(--ink-faint)]">
          Tidak ada item yang cocok dengan pencarian.
        </p>
      ) : (
        <>
          <p className="mb-4 text-sm text-[var(--ink-faint)]">
            Menampilkan {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)} dari{" "}
            {filtered.length} koleksi
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {paginated.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className="group text-left rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
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
                    <div className="flex h-full w-full items-center justify-center text-sm text-[var(--gold)]">
                      Tanpa Foto
                    </div>
                  )}
                  <span
                    className={`absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-sm ${statusClass[item.status]}`}
                  >
                    {statusLabel[item.status]}
                  </span>
                </div>
                <div className="p-3.5">
                  <p className="font-display text-[15px] font-semibold leading-snug line-clamp-1">
                    {item.namaBaju}
                  </p>
                  <p className="mt-1 text-xs text-[var(--ink-faint)] line-clamp-1">
                    {item.kategoriBaju}
                    {item.ukuran ? ` · ${item.ukuran}` : ""}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <Pagination page={safePage} totalPages={totalPages} onChange={goToPage} />
        </>
      )}

      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = new Set<number>([1, totalPages, page, page - 1, page + 1]);
  const items = Array.from(pages)
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  const withGaps: (number | "gap")[] = [];
  items.forEach((p, i) => {
    if (i > 0 && p - items[i - 1] > 1) withGaps.push("gap");
    withGaps.push(p);
  });

  return (
    <nav className="mt-8 flex items-center justify-center gap-1.5" aria-label="Navigasi halaman">
      <PageButton disabled={page === 1} onClick={() => onChange(page - 1)} label="Sebelumnya">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="M12 15 7 10l5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </PageButton>

      {withGaps.map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} className="px-1.5 text-sm text-[var(--ink-faint)]">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`h-9 min-w-9 rounded-full px-2 text-sm font-medium transition-colors ${
              p === page
                ? "bg-[var(--gold)] text-white"
                : "text-[var(--ink-soft)] hover:bg-[var(--gold-soft)] hover:text-[var(--ink)]"
            }`}
          >
            {p}
          </button>
        )
      )}

      <PageButton disabled={page === totalPages} onClick={() => onChange(page + 1)} label="Selanjutnya">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
          <path d="m8 5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </PageButton>
    </nav>
  );
}

function PageButton({
  children,
  disabled,
  onClick,
  label,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="h-9 w-9 flex items-center justify-center rounded-full text-[var(--ink-soft)] hover:bg-[var(--gold-soft)] hover:text-[var(--ink)] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
    >
      {children}
    </button>
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
            aria-label="Tutup"
            className="self-end -mr-1.5 -mt-1.5 flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-faint)] hover:bg-[var(--gold-soft)] hover:text-[var(--ink)] transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
              <path d="m5 5 10 10M15 5 5 15" strokeLinecap="round" />
            </svg>
          </button>
          <span
            className={`self-start rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide mb-3 ${statusClass[item.status]}`}
          >
            {statusLabel[item.status]}
          </span>
          <h2 className="font-display text-2xl leading-snug">{item.namaBaju}</h2>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">{item.kategoriBaju}</p>

          <dl className="mt-5 space-y-2.5 text-sm">
            {item.jenisModel && <Row label="Model" value={item.jenisModel} />}
            {item.warna && <Row label="Warna" value={item.warna} />}
            {item.ukuran && <Row label="Ukuran" value={item.ukuran} />}
            {item.jumlah > 1 && <Row label="Stok" value={`${item.jumlah} pcs`} />}
          </dl>

          <a
            href="https://wa.me/6281807429240"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--gold-light)] transition-colors"
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
