import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { adsApi } from "../api/adsApi";
import type { IAdvertisement } from "../types/ad";

export default function AdDetailPage() {
  const { id } = useParams();
  const [ad, setAd] = useState<IAdvertisement | null>(null);

  useEffect(() => {
    if (id) {
      adsApi.getAll().then((ads) => {
        const found = ads.find((a) => a.id === id);
        setAd(found || null);
      });
    }
  }, [id]);

  if (!ad) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto border p-6 rounded-xl">
      <h1 className="text-2xl font-bold">{ad.title}</h1>

      <p className="text-sm text-gray-500 mt-1">{ad.category}</p>

      <p className="mt-4">{ad.description}</p>

      <div className="mt-6 p-3 bg-gray-100 rounded">
        <p className="font-semibold">Contacts:</p>
        <p>{ad.contacts}</p>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        {ad.createdAt}
      </p>
    </div>
  );
}