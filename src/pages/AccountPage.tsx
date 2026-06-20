import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adsApi } from "../api/adsApi";
import { favoritesApi } from "../api/favoritesApi";
import type { IAdvertisement } from "../types/ad";
import AdCard from "../components/AdCard";
import AdCardSkeleton from "../components/AdCardSkeleton";

interface StoredUser {
  name?: string;
  email: string;
}

type Tab = "my" | "favorites";

export default function AccountPage() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [tab, setTab] = useState<Tab>("my");

  const [myAds, setMyAds] = useState<IAdvertisement[]>([]);
  const [favoriteAds, setFavoriteAds] = useState<IAdvertisement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      setUser(raw ? (JSON.parse(raw) as StoredUser) : null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    Promise.all([
      adsApi.getMyAds(),
      adsApi.getByIds(favoritesApi.getAll()),
    ]).then(([mine, favs]) => {
      if (cancelled) return;
      setMyAds(mine);
      setFavoriteAds(favs);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [user, tab]);

  if (!user) {
    return (
      <div className="text-center py-16">
        <p className="text-xl font-bold text-navy mb-2">Вы не вошли в аккаунт</p>
        <p className="text-navy/60 mb-6">
          Войдите, чтобы увидеть свои объявления и избранное.
        </p>
        <Link
          to="/login"
          className="inline-block bg-accent border-2 border-navy text-navy px-4 py-2 rounded-lg font-semibold shadow-hard-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition"
        >
          Войти
        </Link>
      </div>
    );
  }

  const activeAds = tab === "my" ? myAds : favoriteAds;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-accent border-2 border-navy flex items-center justify-center font-bold text-navy text-lg shrink-0">
          {(user.name || user.email).charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-bold text-navy">{user.name || "Студент"}</p>
          <p className="text-sm text-navy/50">{user.email}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setTab("my")}
          className={`px-3 py-1.5 rounded-lg border-2 text-sm font-medium transition ${
            tab === "my"
              ? "bg-navy text-white border-navy shadow-hard-sm"
              : "bg-white text-navy/70 border-navy/20 hover:border-navy"
          }`}
        >
          Мои объявления ({myAds.length})
        </button>
        <button
          onClick={() => setTab("favorites")}
          className={`px-3 py-1.5 rounded-lg border-2 text-sm font-medium transition ${
            tab === "favorites"
              ? "bg-navy text-white border-navy shadow-hard-sm"
              : "bg-white text-navy/70 border-navy/20 hover:border-navy"
          }`}
        >
          Избранное ({favoriteAds.length})
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <AdCardSkeleton key={i} />
          ))}
        </div>
      ) : activeAds.length === 0 ? (
        <div className="text-center mt-10 text-navy/50">
          {tab === "my"
            ? "Вы пока не создали ни одного объявления"
            : "Список избранного пуст"}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </div>
  );
}