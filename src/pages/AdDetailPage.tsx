import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { adsApi } from "../api/adsApi";
import type { IAdvertisement } from "../types/ad";

export default function AdDetailPage() {
  const { id } = useParams();
  const [ad, setAd] = useState<IAdvertisement | null>(null);

  useEffect(() => {
    if (id) {
      adsApi.getById(id).then((data) => {
        if (data) setAd(data);
      });
    }
  }, [id]);

  if (!ad) return <div>Loading...</div>;

  return (
    <div className="p-4 border rounded">
      <h1 className="text-2xl font-bold">{ad.title}</h1>
      <p className="mt-2">{ad.description}</p>
      <p className="mt-2 text-blue-600">{ad.contacts}</p>
    </div>
  );
}