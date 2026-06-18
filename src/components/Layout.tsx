import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <Link to="/" className="font-bold text-lg">
            College Bazar
          </Link>

          <Link
            to="/create"
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            + Create
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}