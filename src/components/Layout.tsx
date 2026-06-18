import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="flex justify-between p-4 shadow">
        <Link to="/" className="font-bold text-xl">
          College Bazar
        </Link>

        <Link to="/create" className="text-blue-600">
          + Create Ad
        </Link>
      </header>

      <main className="p-4">{children}</main>
    </div>
  );
}