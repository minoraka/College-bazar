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
      className="block bg-white border-2 border-navy rounded-xl2 p-4 shadow-hard transition hover:shadow-hard-sm hover:translate-x-[2px] hover:translate-y-[2px]"
    >
      <div className="aspect-[4/3] border-2 border-navy/20 rounded-lg mb-3 overflow-hidden bg-navy-50 flex items-center justify-center">
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

      <span
        className={`inline-block text-xs px-2 py-1 rounded-full font-medium mb-2 ${
          badgeColors[ad.category] ?? "bg-gray-200 text-navy"
        }`}
      >
        {categoryLabels[ad.category] ?? ad.category}
      </span>

      <h2 className="font-semibold text-base text-navy">{ad.title}</h2>

      <p className="text-sm text-navy/60 mt-1 line-clamp-2">
        {ad.description}
      </p>

      <div className="flex justify-between items-baseline mt-4 pt-3 border-t border-navy/10">
        <span className="font-bold text-navy">
          {ad.price != null ? `${ad.price.toLocaleString("ru-RU")} Сом` : ad.contacts}
        </span>
        <span className="text-xs text-navy/40">{ad.createdAt}</span>
      </div>
    </Link>
  );
}