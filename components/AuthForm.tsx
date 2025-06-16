"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

type AuthFormProps = {
  onClose?: () => void;
};

export default function AuthForm({ onClose }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        toast.error("Login gagal: " + error.message);
      } else {
        toast.success("Login berhasil!");
        if (onClose) onClose();
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
        toast.error("Sign up gagal: " + error.message);
      } else {
        toast.success("Sign up berhasil! Silakan cek email untuk verifikasi.");
        if (onClose) onClose();
      }
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logout berhasil!");
    if (onClose) onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full border p-2 rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="text-red-500">{error}</div>}
        <button type="submit" className="w-full bg-teal-600 text-white p-2 rounded" disabled={loading}>
          {loading ? "Memproses..." : mode === "login" ? "Masuk" : "Daftar"}
        </button>
      </form>
      <div className="mt-4 text-center">
        {mode === "login" ? (
          <>
            Belum punya akun?{" "}
            <button className="text-teal-600" onClick={() => setMode("signup")}>
              Daftar sekarang
            </button>
          </>
        ) : (
          <>
            Sudah punya akun?{" "}
            <button className="text-teal-600" onClick={() => setMode("login")}>
              Masuk
            </button>
          </>
        )}
      </div>
      <button onClick={handleLogout} className="mt-4 w-full bg-gray-200 p-2 rounded">
        Logout
      </button>
    </div>
  );
}
