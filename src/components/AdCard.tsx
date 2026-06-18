import { Link } from "react-router-dom";
import type { IAdvertisement } from "../types/ad";

export default function AdCard({ ad }: { ad: IAdvertisement }) {
  return (
    <Link
      to={`/ads/${ad.id}`}
      className="border rounded-xl p-4 shadow hover:shadow-md transition bg-white"
    >
      <div className="flex justify-between items-start">
        <h2 className="font-bold text-lg">{ad.title}</h2>

        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
          {ad.category}
        </span>
      </div>

      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
        {ad.description}
      </p>

      <p className="text-xs text-gray-400 mt-3">
        {ad.createdAt}
      </p>
    </Link>
  );
}