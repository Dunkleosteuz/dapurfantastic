"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, Star, ChefHat, Users, Bookmark } from "lucide-react";
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

  // Ambil user login dari Supabase Auth
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);
    };
    getUser();

    // Ambil resep
    const fetchRecipes = async () => {
      const { data } = await supabase.from("recipes").select("*").order("id", { ascending: true });
      if (data) setRecipes(data);
    };
    fetchRecipes();
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
              <div className="relative overflow-hidden rounded-t-lg">
                <Link href={`/recipe/${recipe.id}`}>
                  <img src={recipe.image_url || "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg"} alt={recipe.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                </Link>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {recipe.rating ?? 4.5}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
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

              <CardContent className="p-6">
                <Link href={`/recipe/${recipe.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">{recipe.title}</h3>
                </Link>
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

                <Link href={`/recipe/${recipe.id}`}>
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">Lihat Resep Lengkap</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
