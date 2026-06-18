import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-50">
      <header className="bg-white border-b-2 border-navy">
        <div className="max-w-6xl mx-auto flex items-center gap-4 p-4">
          <Link
            to="/"
            className="bg-accent border-2 border-navy rounded-lg px-3 py-1.5 font-bold text-navy shadow-hard-sm shrink-0"
          >
            Колледж.Стафф
          </Link>

          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Поиск вещей..."
              className="w-full border-2 border-navy rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex-1" />

          <Link
            to="/create"
            className="bg-accent border-2 border-navy text-navy px-4 py-2 rounded-lg font-semibold shadow-hard-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition"
          >
            + Подать объявление
          </Link>

          <div className="w-9 h-9 rounded-full border-2 border-navy bg-navy-50 flex items-center justify-center text-navy shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <path d="M20 21a8 8 0 1 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">{children}</main>

      <footer className="border-t-2 border-navy mt-10">
        <div className="max-w-6xl mx-auto p-4 flex flex-wrap items-center justify-between gap-2 text-sm text-navy/70">
          <div>
            <div className="font-bold text-navy">Колледж.Стафф</div>
            <div>© 2026 Колледж.Стафф. Все права защищены.</div>
          </div>
          <div className="flex gap-4">
            <span>О проекте</span>
            <span>Правила</span>
            <span>Помощь</span>
            <span>Контакты</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
