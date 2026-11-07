export default function Navbar({
  section,
  setSection,
  sections,
  likedCount,
  readingCount,
}) {
  const counts = { liked: likedCount, reading: readingCount };

  return (
    <header className="sticky top-0 z-20 border-b border-[#e9e6de] bg-[#fbfaf6]/95 backdrop-blur-md">
      <nav
        aria-label="Navigation principale"
        className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12"
      >
        <a href="#" className="flex items-center gap-3 self-start sm:self-auto">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#183d35] text-[#e6c99f]">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path d="M4.5 5.5c3.1-.9 5.6-.4 7.5 1.2v12c-1.9-1.6-4.4-2.1-7.5-1.2v-12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M19.5 5.5c-3.1-.9-5.6-.4-7.5 1.2v12c1.9-1.6 4.4-2.1 7.5-1.2v-12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </span>
          <span>
            <span className="block font-serif text-xl font-bold leading-none tracking-tight text-[#233b32]">
              BookBox
            </span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#86877e]">
              Ma bibliothèque
            </span>
          </span>
        </a>

        <div className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-[#f0eee7] p-1">
          {sections.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSection(item.id)}
              aria-current={section === item.id ? "page" : undefined}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition sm:px-4 ${
                section === item.id
                  ? "bg-white text-[#203c32] shadow-sm"
                  : "text-[#777a71] hover:text-[#203c32]"
              }`}
            >
              {item.label}
              {counts[item.id] > 0 && (
                <span
                  className={`grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] ${
                    section === item.id
                      ? "bg-[#e6c99f] text-[#183d35]"
                      : "bg-white/70 text-[#73766e]"
                  }`}
                >
                  {counts[item.id]}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
