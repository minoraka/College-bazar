import { useSearchParams } from "react-router-dom";

const categories = ["all", "textbooks", "clothes", "electronics", "other"];

export default function CategoryTabs() {
  const [params, setParams] = useSearchParams();

  const active = params.get("category") || "all";

  const setCategory = (cat: string) => {
    if (cat === "all") {
      params.delete("category");
      setParams(params);
    } else {
      setParams({ category: cat });
    }
  };

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-3 py-1 rounded border ${
            active === cat ? "bg-black text-white" : ""
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}   