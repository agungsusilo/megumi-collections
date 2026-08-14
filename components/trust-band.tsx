const items = [
  {
    title: "Konsultasi Gratis",
    desc: "Bantuan pilih baju sesuai acara",
    icon: (
      <path d="M4 5h16v10H9l-4 4V5z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: "Kualitas Terawat",
    desc: "Diperiksa sebelum disewakan",
    icon: (
      <path
        d="M12 3l2 5 5 .7-3.6 3.5.9 5-4.3-2.3-4.3 2.3.9-5L5 8.7 10 8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Coba di Studio",
    desc: "Fitting langsung sebelum hari-H",
    icon: (
      <>
        <path d="M4 20V9l8-5 8 5v11" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 20v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Booking Mudah",
    desc: "Proses cepat lewat WhatsApp",
    icon: (
      <path
        d="M5 19l1.4-3.8A7 7 0 1112 19a7 7 0 01-3.4-.9L5 19z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function TrustBand() {
  return (
    <section className="bg-[var(--gold-soft)] border-y border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col items-start gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--gold)] text-[var(--gold)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
                {item.icon}
              </svg>
            </span>
            <p className="font-display text-[15px] leading-snug">{item.title}</p>
            <p className="text-xs text-[var(--ink-faint)] leading-snug">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
