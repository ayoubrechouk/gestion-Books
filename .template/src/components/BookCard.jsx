import { useDispatch } from "react-redux";
import {
  removeBook,
  toggleLike,
  toggleReadingList,
} from "../features/BookReducer";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export default function BookCard({ book }) {
  const dispatch = useDispatch();

  function handleRemove() {
    if (window.confirm(`Supprimer « ${book.title} » de la bibliothèque ?`)) {
      dispatch(removeBook(book.id));
    }
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_6px_24px_rgba(27,42,33,0.06)] ring-1 ring-[#e9e6de] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(27,42,33,0.14)]">
      <div className="relative overflow-hidden bg-[#e9e6de]">
        <img
          src={book.coverImage}
          alt={`Couverture de ${book.title}`}
          loading="lazy"
          className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#fbfaf6]/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#315d4f] shadow-sm">
          {book.category}
        </span>
        <button
          type="button"
          onClick={() => dispatch(toggleLike(book.id))}
          aria-label={book.liked ? `Retirer ${book.title} des favoris` : `Ajouter ${book.title} aux favoris`}
          aria-pressed={book.liked}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315d4f] ${
            book.liked ? "text-rose-600" : "text-[#777a71] hover:text-rose-600"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={book.liked ? "currentColor" : "none"}
            className="h-[18px] w-[18px]"
            aria-hidden="true"
          >
            <path d="M20.8 8.7c0 4.2-8.8 10-8.8 10s-8.8-5.8-8.8-10a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-[#183d35]/90 px-2.5 py-1 text-xs font-bold text-white">
          <span className="text-[#e6c99f]" aria-hidden="true">★</span>
          {book.rating.toFixed(1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 font-serif text-xl font-semibold leading-snug text-[#242a25]">
              {book.title}
            </h3>
            <p className="mt-1 text-sm text-[#7b7d75]">{book.author}</p>
          </div>
          <span className="shrink-0 pt-1 text-sm font-bold text-[#315d4f]">
            {priceFormatter.format(book.price)}
          </span>
        </div>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#74786f]">
          {book.description}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-5">
          <button
            type="button"
            onClick={() => dispatch(toggleReadingList(book.id))}
            aria-pressed={book.inReadingList}
            className={`flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315d4f] ${
              book.inReadingList
                ? "bg-[#e9efe8] text-[#315d4f] hover:bg-[#dce8da]"
                : "bg-[#183d35] text-white hover:bg-[#315d4f]"
            }`}
          >
            <span aria-hidden="true">{book.inReadingList ? "✓" : "+"}</span>
            {book.inReadingList ? "Dans ma liste" : "À lire"}
          </button>
          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Supprimer ${book.title}`}
            title="Supprimer le livre"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[#a2a39b] transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
