import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { adsApi } from "../api/adsApi";
import type { IAdvertisement } from "../types/ad";

const categoryLabels: Record<string, string> = {
  textbooks: "Учебники",
  clothes: "Одежда",
  electronics: "Электроника",
  other: "Другое",
};

const badgeColors: Record<string, string> = {
  textbooks: "bg-accent text-navy",
  clothes: "bg-pink-200 text-navy",
  electronics: "bg-purple-200 text-navy",
  other: "bg-green-200 text-navy",
};

export default function AdDetailPage() {
  const { id } = useParams();
  const [ad, setAd] = useState<IAdvertisement | null>(null);
  const [similar, setSimilar] = useState<IAdvertisement[]>([]);

  useEffect(() => {
    if (id) {
      adsApi.getAll().then((ads) => {
        const found = ads.find((a) => a.id === id) ?? null;
        setAd(found);

        if (found) {
          setSimilar(
            ads
              .filter((a) => a.category === found.category && a.id !== found.id)
              .slice(0, 4)
          );
        }
      });
    }
  }, [id]);

  if (!ad) {
    return <div className="text-center mt-10 text-navy/50">Loading...</div>;
  }

  return (
    <div>
      <div className="text-sm text-navy/50 mb-4">
        <Link to="/" className="hover:text-navy">
          Главная
        </Link>{" "}
        / <span>{categoryLabels[ad.category] ?? ad.category}</span> /{" "}
        <span className="text-navy">{ad.title}</span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="aspect-[4/3] border-2 border-navy bg-navy-50 flex items-center justify-center overflow-hidden">
            {ad.image ? (
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-navy/40">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="w-12 h-12 mx-auto mb-2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <p className="text-sm">Фото скоро появится</p>
              </div>
            )}
          </div>

          <p className="text-xs text-navy/30 text-center mt-2">
            ID объявления: #{ad.id}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <span
              className={`inline-block text-xs px-2 py-1 rounded-md font-medium border border-navy/20 mb-2 ${
                badgeColors[ad.category] ?? "bg-gray-200 text-navy"
              }`}
            >
              {categoryLabels[ad.category] ?? ad.category}
            </span>
            <h1 className="text-2xl font-bold text-navy leading-snug">
              {ad.title}
            </h1>
            <p className="text-xs text-navy/40 mt-1">{ad.createdAt}</p>
          </div>

          <div className="bg-navy text-white p-4 rounded-lg flex items-center justify-between">
            <span className="text-sm text-white/60">Цена</span>
            <span className="text-xl font-bold">
              {ad.price != null
                ? ad.price === 0
                  ? "Бесплатно"
                  : `${ad.price.toLocaleString("ru-RU")} Сом`
                : "—"}
            </span>
          </div>

          <div className="bg-white border-2 border-navy p-4">
            <p className="text-xs uppercase tracking-wide text-navy/40 mb-1">
              Контакты
            </p>
            <p className="font-semibold text-navy">{ad.contacts}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-lg text-navy mb-2">Описание</h2>
        <p className="text-sm text-navy/70 leading-relaxed whitespace-pre-line">
          {ad.description}
        </p>
      </div>

      {similar.length > 0 && (
        <div className="mt-10">
          <h2 className="font-bold text-lg text-navy mb-3">Похожие товары</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {similar.map((item) => (
              <Link
                key={item.id}
                to={`/ads/${item.id}`}
                className="block border-2 border-navy bg-white p-2 hover:shadow-hard-sm transition"
              >
                <div className="aspect-square bg-navy-50 border border-navy/20 mb-2 overflow-hidden flex items-center justify-center">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-6 h-6 text-navy/30"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  )}
                </div>
                <p className="text-xs font-medium text-navy truncate">
                  {item.title}
                </p>
                <p className="text-xs text-navy/50">
                  {item.price != null ? `${item.price} Сом` : ""}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
