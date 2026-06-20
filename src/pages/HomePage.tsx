import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { adsApi } from "../api/adsApi";
import type { IAdvertisement } from "../types/ad";

import AdCard from "../components/AdCard";
import AdCardSkeleton from "../components/AdCardSkeleton";
import CategoryTabs from "../components/CategoryTabs";

export default function HomePage() {
  const [ads, setAds] = useState<IAdvertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [params] = useSearchParams();
  const category = params.get("category");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    adsApi
      .getAll()
      .then((data) => {
        if (cancelled) return;
        const filtered = category
          ? data.filter((a) => a.category === category)
          : data;
        setAds(filtered);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category]);

  if (loading) {
    return (
      <div>
        <CategoryTabs />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <AdCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <CategoryTabs />
        <div className="text-center mt-10 text-navy/50">
          Не удалось загрузить объявления. Попробуйте обновить страницу.
        </div>
      </div>
    );
  }

  return (
    <div>
      <CategoryTabs />

      {!ads.length ? (
        <div className="text-center mt-10 text-navy/50">
          Объявлений пока нет
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </div>
  );
}