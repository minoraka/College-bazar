import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { adsApi } from "../api/adsApi";
import type { IAdvertisement } from "../types/ad";

import AdCard from "../components/AdCard";
import CategoryTabs from "../components/CategoryTabs";

export default function HomePage() {
  const [ads, setAds] = useState<IAdvertisement[]>([]);
  const [loading, setLoading] = useState(true);

  const [params] = useSearchParams();
  const category = params.get("category");

  useEffect(() => {
    setLoading(true);

    adsApi.getAll().then((data) => {
      const filtered = category
        ? data.filter((a) => a.category === category)
        : data;

      setAds(filtered);
      setLoading(false);
    });
  }, [category]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  if (!ads.length) {
    return <div className="text-center mt-10 text-gray-500">No ads found</div>;
  }

  return (
    <div>
      <CategoryTabs />

      {/* GRID как в HTML */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}


<button onClick={() => alert("clicked")}>
  TEST BUTTON
</button>