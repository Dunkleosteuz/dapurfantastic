"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SearchInterface from "@/components/SearchInterface";
import RecipeResults from "@/components/RecipeResults";
import Footer from "@/components/Footer";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ...existing code...
  const handleSearch = async (ingredients: string) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredients.split(",").map((i) => i.trim()) }),
      });
      const data = await res.json();
      if (data.recipe) {
        setSearchResults([data.recipe]); // Gunakan data.recipe langsung, ID sudah dari backend
      } else {
        setSearchResults([]);
        setError(data.error || "Tidak ada resep ditemukan.");
      }
    } catch (err: any) {
      setSearchResults([]);
      setError("Terjadi kesalahan.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-beige-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <SearchInterface onSearch={handleSearch} isLoading={isLoading} />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <RecipeResults results={searchResults} isLoading={isLoading} />
      </div>
      <Footer />
    </div>
  );
}
