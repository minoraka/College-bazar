import { Link } from "react-router-dom";
import type { IAdvertisement } from "../types/ad";

const categoryLabels: Record<string, string> = {
  textbooks: "Учебники",
  clothes: "Одежда",
  electronics: "Электроника",
  other: "Другое",
};

const badgeColors: Record<string, string> = {
  textbooks: "bg-accent text-navy",
  clothes: "bg-pink-200 text-navy",
  electronics: "bg-purple-200 text-navy",
  other: "bg-green-200 text-navy",
};

export default function AdCard({ ad }: { ad: IAdvertisement }) {
  return (
    <Link
      to={`/ads/${ad.id}`}
      className="block bg-white border-2 border-navy p-4 shadow-hard transition hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px]"
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className={`text-xs px-2 py-1 rounded-md font-medium border border-navy/20 ${
            badgeColors[ad.category] ?? "bg-gray-200 text-navy"
          }`}
        >
          {categoryLabels[ad.category] ?? ad.category}
        </span>

        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          aria-label="Добавить в избранное"
          className="w-7 h-7 flex items-center justify-center text-navy hover:text-navy/60"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-5 h-5"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      <div className="aspect-[4/3] border-2 border-dashed border-navy bg-navy-50 flex items-center justify-center overflow-hidden mb-4">
        {ad.image ? (
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-10 h-10 text-navy/30"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        )}
      </div>

      <h2 className="font-bold text-xl text-navy leading-snug">{ad.title}</h2>

      <p className="text-sm text-navy/60 mt-1.5 line-clamp-2">
        {ad.description}
      </p>

      <div className="mt-4 pt-3 border-t border-dotted border-navy/40 flex justify-between items-end">
        <div>
          <div className="text-[10px] tracking-wide text-navy/40 uppercase">
            Цена
          </div>
          <div className="font-bold text-xl text-navy">
            {ad.price != null
              ? ad.price === 0
                ? "Бесплатно"
                : `${ad.price.toLocaleString("ru-RU")} Сом`
              : ad.contacts}
          </div>
        </div>
        <span className="text-xs text-navy/40">{ad.createdAt}</span>
      </div>
    </Link>
  );
}
