import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) return;

    // MOCK login (без backend)
    localStorage.setItem("user", JSON.stringify({ email }));

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white border-2 border-navy p-6 shadow-hard flex flex-col gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-navy">Авторизация</h1>
          <p className="text-sm text-navy/60 mt-1">
            Добро пожаловать обратно в кампус!
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            E-mail или Логин
          </label>
          <div className="relative">
            <input
              className="w-full border-2 border-navy/30 rounded-lg pl-3 pr-9 py-2 text-sm focus:outline-none focus:border-navy"
              placeholder="alex@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-navy/40"
            >
              <path d="M20 21a8 8 0 1 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">
            Пароль
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border-2 border-navy/30 rounded-lg pl-3 pr-9 py-2 text-sm focus:outline-none focus:border-navy"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-4 h-4"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-10-7-10-7a18.6 18.6 0 0 1 4.22-5.06M9.9 4.24A9.12 9.12 0 0 1 12 5c7 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <path d="M1 1l22 22" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="w-4 h-4"
                >
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          <div className="text-right mt-1.5">
            <span className="text-xs text-navy/60 underline cursor-pointer">
              Забыли пароль?
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="bg-accent border-2 border-navy text-navy font-semibold py-2.5 rounded-lg shadow-hard-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition"
        >
          Войти
        </button>

        <div className="border-t border-dotted border-navy/30 pt-4 text-center text-sm text-navy/70">
          Еще нет аккаунта?{" "}
          <Link to="/register" className="font-semibold underline text-navy">
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </div>
  );
}
