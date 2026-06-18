import { useEffect, useState } from "react";
import { adsApi } from "../api/adsApi";
import type { IAdvertisement } from "../types/ad";
import AdCard from "../components/AdCard";

export default function HomePage() {
  const [ads, setAds] = useState    <IAdvertisement[]>([]);

  useEffect(() => {
    adsApi.getAll().then(setAds);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
}