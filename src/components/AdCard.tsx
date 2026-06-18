import { Link } from "react-router-dom";
import type { IAdvertisement } from "../types/ad";

const colors: Record<string, string> = {
  textbooks: "bg-blue-100 text-blue-700",
  clothes: "bg-pink-100 text-pink-700",
  electronics: "bg-green-100 text-green-700",
  other: "bg-gray-100 text-gray-700",
};

export default function AdCard({ ad }: { ad: IAdvertisement }) {
  return (
    <Link
      to={`/ads/${ad.id}`}
      className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition hover:-translate-y-1"
    >
      <div className="flex justify-between items-start">
        <h2 className="font-semibold text-lg">{ad.title}</h2>

        <span
          className={`text-xs px-2 py-1 rounded-full ${colors[ad.category]}`}
        >
          {ad.category}
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
        {ad.description}
      </p>

      <div className="flex justify-between text-xs text-gray-400 mt-4">
        <span>{ad.contacts}</span>
        <span>{ad.createdAt}</span>
      </div>
    </Link>
  );
}