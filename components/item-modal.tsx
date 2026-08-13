"use client";

import type { CollectionItem } from "@/lib/types";
import { statusClass, statusLabel } from "@/lib/status";

export function ItemModal({ item, onClose }: { item: CollectionItem; onClose: () => void }) {
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
