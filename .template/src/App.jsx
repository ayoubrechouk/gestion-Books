import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Books from "./components/Books";
import Navbar from "./components/Navbar";

const sections = [
  { id: "all", label: "Tous les livres" },
  { id: "liked", label: "Mes favoris" },
  { id: "reading", label: "À lire" },
];

export default function App() {
  const books = useSelector((state) => state.books);
  const [section, setSection] = useState("all");
  const [category, setCategory] = useState("Toutes les catégories");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => ["Toutes les catégories", ...new Set(books.map((book) => book.category))],
    [books],
  );
  const displayedBooks = books.filter((book) => {
    const matchesSection =
      section === "liked"
        ? book.liked
        : section === "reading"
          ? book.inReadingList
          : true;
    const matchesCategory =
      category === "Toutes les catégories" || book.category === category;
    const searchTerm = query.trim().toLocaleLowerCase("fr");
    const matchesSearch =
      !searchTerm ||
      `${book.title} ${book.author} ${book.category}`
        .toLocaleLowerCase("fr")
        .includes(searchTerm);

    return matchesSection && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#20231f]">
      <Navbar
        section={section}
        setSection={setSection}
        sections={sections}
        likedCount={books.filter((book) => book.liked).length}
        readingCount={books.filter((book) => book.inReadingList).length}
      />

      <main>
        <section className="relative overflow-hidden bg-[#183d35] text-white">
          <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-[#a7c9a4]/10 blur-3xl" />
          <div className="absolute -bottom-36 left-1/4 h-80 w-80 rounded-full bg-[#d69e68]/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-24">
            <div className="max-w-2xl">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#c5d9bb]">
                Votre prochaine belle histoire
              </p>
              <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Les livres qui
                <br />
                <span className="italic text-[#d9c6a5]">vous ressemblent.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/75 sm:text-lg">
                Une bibliothèque à votre image. Explorez, gardez vos coups de
                cœur et composez votre prochaine pile à lire.
              </p>
              <a
                href="#bibliotheque"
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#e6c99f] px-6 py-3 text-sm font-bold text-[#183d35] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explorer la collection <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="hidden items-end justify-center gap-3 lg:flex" aria-hidden="true">
              {books.slice(0, 3).map((book, index) => (
                <div
                  key={book.id}
                  className={`w-36 overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/15 ${
                    index === 1 ? "-translate-y-8" : "translate-y-2"
                  }`}
                >
                  <img
                    src={book.coverImage}
                    alt=""
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="bibliotheque"
          className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12"
        >
          <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-[#738276]">
                À feuilleter sans modération
              </p>
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                {sections.find((item) => item.id === section)?.label}
              </h2>
              <p className="mt-2 text-sm text-[#74786f]">
                {displayedBooks.length}{" "}
                {displayedBooks.length > 1 ? "livres à découvrir" : "livre à découvrir"}
              </p>
            </div>
            <label className="relative block w-full md:max-w-xs">
              <span className="sr-only">Rechercher un livre</span>
              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#74786f]">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                  <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7" />
                  <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Titre, auteur, catégorie..."
                className="w-full rounded-full border border-[#e2e0d8] bg-white py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#999b94] focus:border-[#527568] focus:ring-4 focus:ring-[#527568]/10"
              />
            </label>
          </div>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={category === item}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                    category === item
                      ? "bg-[#183d35] text-white shadow-sm"
                      : "bg-white text-[#61675f] ring-1 ring-[#e2e0d8] hover:bg-[#eeece4]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {displayedBooks.length > 0 ? (
            <Books books={displayedBooks} />
          ) : (
            <div className="rounded-3xl border border-dashed border-[#d6d4ca] bg-white/70 px-6 py-16 text-center">
              <span className="text-4xl" aria-hidden="true">⌕</span>
              <h3 className="mt-4 font-serif text-2xl font-semibold">
                Aucun livre trouvé
              </h3>
              <p className="mt-2 text-sm text-[#74786f]">
                Essayez une autre recherche ou choisissez une autre catégorie.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("Toutes les catégories");
                }}
                className="mt-5 text-sm font-bold text-[#315d4f] underline underline-offset-4 hover:text-[#183d35]"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-[#e6e3da] px-5 py-7 text-center text-xs text-[#81837c]">
        Fait pour les amoureux des livres <span aria-hidden="true">·</span> BookBox
      </footer>
    </div>
  );
}
