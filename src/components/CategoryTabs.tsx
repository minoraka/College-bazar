import { useSearchParams } from "react-router-dom";

const categories = ["all", "textbooks", "clothes", "electronics", "other"];

export default function CategoryTabs() {
  const [params, setParams] = useSearchParams();

  const active = params.get("category") || "all";

  const setCategory = (cat: string) => {
    console.log("CLICK!", cat);
    if (cat === "all") {
      setParams({});
    } else {
      setParams({ category: cat });
    }
  };

  return (
    <div className="flex gap-2 flex-wrap mb-5">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-3 py-1 rounded-full border text-sm transition ${
            active === cat
              ? "bg-black text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}