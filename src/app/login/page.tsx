"use client"; //client side login page
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUser } = useUser();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const me = await fetch("/api/auth/me", { credentials: "include" });
      const user = await me.json();
      setUser(user);
      router.push("/");
    } else {
      const err = await res.json();
      setError(err.message || "Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-white px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-white px-3 py-2 border rounded"
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
