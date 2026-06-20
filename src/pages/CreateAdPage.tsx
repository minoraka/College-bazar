import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { adsApi } from "../api/adsApi";
import type { AdCategory } from "../types/ad";

const categories: { value: AdCategory; label: string }[] = [
  { value: "textbooks", label: "Учебники" },
  { value: "electronics", label: "Техника" },
  { value: "clothes", label: "Одежда" },
  { value: "other", label: "Разное" },
];

export default function CreateAdPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contacts, setContacts] = useState("");
  const [category, setCategory] = useState<AdCategory>("textbooks");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !contacts.trim()) return;

    setSubmitting(true);
    try {
      await adsApi.create({
        title: title.trim(),
        description: description.trim(),
        contacts: contacts.trim(),
        category,
        price: price ? Number(price) : undefined,
        image: image.trim() || undefined,
      });

      navigate("/");
    } catch {
      setError("Не удалось опубликовать объявление. Попробуйте ещё раз.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <Link
        to="/"
        className="text-sm text-navy/60 hover:text-navy inline-block mb-4"
      >
        ← Назад на главную
      </Link>

      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-navy p-6 shadow-hard flex flex-col gap-5"
      >
        <div>
          <h1 className="text-2xl font-bold text-navy">Создать объявление</h1>
          <p className="text-sm text-navy/60 mt-1">
            Заполни поля ниже, чтобы твою вещь увидели другие студенты.
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            Название товара <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border-2 border-navy/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy"
            placeholder="Напр: Учебник по матану, 2 курс"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            Категория
          </label>
          <select
            className="w-full border-2 border-navy/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value as AdCategory)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            Описание
          </label>
          <textarea
            className="w-full border-2 border-navy/30 rounded-lg px-3 py-2 text-sm min-h-[110px] focus:outline-none focus:border-navy"
            placeholder="Расскажи о состоянии вещи, месте встречи..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            Цена (Сом)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              className="w-full border-2 border-navy/30 rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:border-navy"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40">
              ₽
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            Контакты <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border-2 border-navy/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy"
            placeholder="Telegram, WhatsApp или номер телефона"
            value={contacts}
            onChange={(e) => setContacts(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            Фотография
          </label>
          <div className="border-2 border-dashed border-navy/40 rounded-lg p-5 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-7 h-7 mx-auto mb-2 text-navy/50"
            >
              <path d="M3 9a2 2 0 0 1 2-2h.93a2 2 0 0 0 1.664-.89l.812-1.22A2 2 0 0 1 10.07 4h3.86a2 2 0 0 1 1.664.89l.812 1.22A2 2 0 0 0 18.07 7H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <circle cx="12" cy="13" r="3.5" />
              <path d="M16 8h.5" />
            </svg>
            <input
              type="text"
              className="w-full border border-navy/20 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:border-navy bg-white"
              placeholder="Вставь ссылку на фото"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <p className="text-xs text-navy/40 mt-2">
              Загрузка файлов скоро будет доступна — пока вставь ссылку на
              изображение
            </p>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-accent border-2 border-navy text-navy py-2.5 rounded-lg font-semibold shadow-hard-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition disabled:opacity-60 disabled:pointer-events-none"
          >
            {submitting ? "Публикуем..." : "Опубликовать"}
          </button>
          <button
            type="button"
            className="flex-1 bg-white border-2 border-navy text-navy py-2.5 rounded-lg font-semibold hover:bg-navy-50 transition"
          >
            Черновик
          </button>
        </div>
      </form>

      <p className="text-xs text-navy/40 text-center mt-4">
        * Опубликованные объявления проходят модерацию в течение 10 минут.
      </p>
    </div>
  );
}