"use client";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-beige-50 via-white to-beige-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Masuk ke KitchenBuddy</h1>
        <AuthForm />
        <div className="mt-4 text-center">
          <Link href="/" className="text-teal-600 hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
