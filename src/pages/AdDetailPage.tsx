import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { adsApi } from "../api/adsApi";

export default function AdDetailPage() {
  const { id } = useParams();
  const [ad, setAd] = useState<any>(null);

  useEffect(() => {
    if (id) {
      adsApi.getAll().then((ads) => {
        setAd(ads.find((a) => a.id === id));
      });
    }
  }, [id]);

  if (!ad) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white border rounded-2xl p-6">
      <h1 className="text-2xl font-bold">{ad.title}</h1>

      <p className="text-gray-500 mt-2">{ad.category}</p>

      <p className="mt-4">{ad.description}</p>

      <div className="mt-6 p-4 bg-gray-50 border rounded-xl">
        <p className="font-semibold">Contacts</p>
        <p className="text-sm">{ad.contacts}</p>
      </div>
    </div>
  );
}