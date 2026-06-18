import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { adsApi } from "../api/adsApi";
import type { IAdvertisement } from "../types/ad";
import AdCard from "../components/AdCard";
import CategoryTabs from "../components//CategoryTabs";

export default function HomePage() {
  const [ads, setAds] = useState<IAdvertisement[]>([]);
  const [params] = useSearchParams();

  const category = params.get("category");

  useEffect(() => {
    adsApi.getAll().then((data) => {
      if (!category) {
        setAds(data);
      } else {
        setAds(data.filter((a) => a.category === category));
      }
    });
  }, [category]);

  return (
    <div>
      <CategoryTabs />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}