import { Link } from "react-router-dom";
import type { IAdvertisement } from "../types/ad";

export default function AdCard({ ad }: { ad: IAdvertisement }) {
  return (
    <Link
      to={`/ads/${ad.id}`}
      className="border rounded p-4 shadow hover:shadow-lg transition"
    >
      <h2 className="font-bold text-lg">{ad.title}</h2>

      <p className="text-sm text-gray-500">{ad.category}</p>

      <p className="text-sm mt-2 line-clamp-2">
        {ad.description}
      </p>
    </Link>
  );
}