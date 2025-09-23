import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("engineer");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          full_name: fullName,
          role,
        }),
      });

      const payload = await res.json();
      if (!res.ok) {
        // try to show server error
        setError(payload.detail || payload.message || "Ошибка регистрации");
        setLoading(false);
        return;
      }

      // success -> redirect to login
      navigate("/login");
    } catch (err) {
      setError("Сетевая ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">Регистрация</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <div className="text-red-600">{error}</div>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-2">
              <label className="block text-sm font-medium">Почта</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md px-3 py-2"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium">ФИО</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full rounded-md px-3 py-2"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium">Пароль</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md px-3 py-2"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium">Роль</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="mt-1 block w-full rounded-md px-3 py-2">
                <option value="engineer">Инженер</option>
                <option value="manager">Менеджер</option>
                <option value="observer">Наблюдатель</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-500"
            >
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600">
          Уже есть аккаунт? <a className="text-indigo-600 hover:underline" href="/login">Войти</a>
        </p>
      </div>
    </div>
  );
}
