"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, Star, ChefHat, Users, Bookmark, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

type Recipe = {
  id: string | number;
  title: string;
  description: string;
  image_url?: string;
  rating?: number;
  cook_time?: number | string;
  difficulty?: string;
  servings?: number | string;
};

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState<(string | number)[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(true);

  // Ambil user login dari Supabase Auth
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);
      setLoading(false);
    };
    getUser();
  }, []);

  // Ambil bookmark user jika sudah login
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!userId) return;
      const { data } = await supabase.from("bookmarks").select("recipe_id").eq("user_id", userId);
      if (data) setBookmarkedRecipes(data.map((b) => b.recipe_id));
    };
    fetchBookmarks();
  }, [userId]);

  // Ambil resep dari Supabase
  useEffect(() => {
    const fetchRecipes = async () => {
      const { data } = await supabase.from("recipes").select("*").order("id", { ascending: true });
      if (data) setRecipes(data);
    };
    fetchRecipes();
  }, []);

  // Toggle bookmark ke database
  const toggleBookmark = async (recipeId: string | number) => {
    if (!userId) {
      alert("Silakan login untuk menyimpan bookmark.");
      return;
    }
    if (bookmarkedRecipes.includes(recipeId)) {
      // Hapus bookmark di database
      await fetch("/api/bookmarks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, recipe_id: recipeId }),
      });
      setBookmarkedRecipes((prev) => prev.filter((id) => id !== recipeId));
    } else {
      // Tambah bookmark di database
      await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, recipe_id: recipeId }),
      });
      setBookmarkedRecipes((prev) => [...prev, recipeId]);
    }
  };

  // Hapus resep dari Supabase
  const handleDelete = async (id: string | number) => {
    if (!confirm("Yakin ingin menghapus resep ini?")) return;
    setDeletingId(id);
    await supabase.from("recipes").delete().eq("id", id);
    setRecipes((prev) => prev.filter((r) => r.id !== id));
    setDeletingId(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Tampilkan pesan jika user belum login (lebih menarik & rapi)
  if (!userId && !loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-beige-50 via-white to-beige-100">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center">
          <div className="bg-white/90 rounded-xl shadow-lg px-8 py-10 flex flex-col items-center max-w-md w-full border border-beige-200 mt-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-50 mb-4">
              <svg width="32" height="32" fill="none">
                <circle cx="16" cy="16" r="16" fill="#14b8a6" fillOpacity="0.1" />
                <path d="M16 18c3.866 0 7 1.343 7 3v2H9v-2c0-1.657 3.134-3 7-3Z" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="16" cy="12" r="4" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Akses Terbatas</h2>
            <p className="mb-6 text-gray-600 text-center">
              Silakan <span className="text-teal-600 font-semibold">login</span> terlebih dahulu untuk melihat semua resep favorit dan fitur lengkap KitchenBuddy.
            </p>
            <Link href="/login" className="w-full">
              <button className="w-full px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold shadow hover:from-teal-600 hover:to-teal-700 transition">Login Sekarang</button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-beige-100">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Semua Resep</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Jelajahi koleksi lengkap resep masakan Indonesia yang lezat dan mudah dibuat</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/recipe/${recipe.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">{recipe.title}</h3>
                  </Link>
                  <div className="flex gap-2">
                    <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                      <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {recipe.rating ?? 4.5}
                    </Badge>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 hover:bg-white"
                      onClick={async (e) => {
                        e.preventDefault();
                        await toggleBookmark(recipe.id);
                      }}
                    >
                      <Bookmark className={`h-4 w-4 ${bookmarkedRecipes.includes(recipe.id) ? "fill-teal-500 text-teal-500" : ""}`} />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {recipe.cook_time ?? "30 menit"}
                  </div>
                  <div className="flex items-center">
                    <ChefHat className="h-4 w-4 mr-1" />
                    {recipe.difficulty ?? "Mudah"}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {recipe.servings ?? "2-3 porsi"}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link href={`/recipe/${recipe.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">Lihat Resep Lengkap</Button>
                  </Link>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(recipe.id)} disabled={deletingId === recipe.id} title="Hapus Resep">
                    {deletingId === recipe.id ? <span className="animate-spin">⏳</span> : <Trash2 className="h-5 w-5" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
