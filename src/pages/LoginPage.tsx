import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) return;

    // MOCK login (без backend)
    localStorage.setItem(
      "user",
      JSON.stringify({ email })
    );

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm border p-6 rounded-xl shadow flex flex-col gap-3"
      >
        <h1 className="text-xl font-bold text-center">
          Login
        </h1>

        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white p-2 rounded">
          Sign in
        </button>
      </form>
    </div>
  );
}