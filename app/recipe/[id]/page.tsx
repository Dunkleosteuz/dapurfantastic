"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Clock, Star, ChefHat, Users, Bookmark, ArrowLeft, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient"; // Jika pakai Supabase Auth

type Recipe = {
  id: string | number;
  title: string;
  summary?: string;
  description: string;
  cookTime: string;
  prepTime: string;
  difficulty: string;
  rating: number;
  servings: string;
  ingredients: string[];
  equipment: string[];
  instructions: string[];
};

export default function RecipeDetailPage() {
  const params = useParams();
  const recipeId = params.id as string;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // Ambil user login dari Supabase Auth (atau ganti sesuai auth-mu)
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);
    };
    getUser();
  }, []);

  // Ambil data resep
  useEffect(() => {
    setLoading(true);
    fetch(`/api/recipes/${recipeId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Resep tidak ditemukan");
        return res.json();
      })
      .then((data) => setRecipe(data))
      .catch(() => setRecipe(null))
      .finally(() => setLoading(false));
  }, [recipeId]);

  // Cek status bookmark saat halaman dibuka
  useEffect(() => {
    if (!userId || !recipeId) return;
    fetch(`/api/bookmarks?user_id=${userId}&recipe_id=${recipeId}`)
      .then((res) => res.json())
      .then((data) => setIsBookmarked(data.isBookmarked));
  }, [userId, recipeId]);

  const handleBookmark = async () => {
    if (!userId) {
      toast.error("Silakan login untuk menyimpan favorit.");
      return;
    }
    setLoadingBookmark(true);
    if (isBookmarked) {
      await fetch("/api/bookmarks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, recipe_id: recipeId }),
      });
      setIsBookmarked(false);
      toast.success("Dihapus dari Favorit");
    } else {
      await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, recipe_id: recipeId }),
      });
      setIsBookmarked(true);
      toast.success("Disimpan ke Favorit");
    }
    setLoadingBookmark(false);
  };

  const toggleStep = (stepIndex: number) => {
    setCompletedSteps((prev) => (prev.includes(stepIndex) ? prev.filter((i) => i !== stepIndex) : [...prev, stepIndex]));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-beige-100">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resep tidak ditemukan</h1>
          <Link href="/recipes">
            <Button className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700">Kembali ke Semua Resep</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-beige-100">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/recipes" className="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Semua Resep
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipe Basic Info (TANPA GAMBAR) */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white mb-8">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Badge className="bg-white/90 text-gray-800 mr-2">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {recipe.rating}
                  </Badge>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{recipe.title}</h1>
                </div>
                {recipe.summary && <p className="text-lg text-gray-600 mb-6">{recipe.summary}</p>}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-beige-50 rounded-lg">
                    <Clock className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Waktu Masak</p>
                    <p className="font-semibold">{recipe.cookTime}</p>
                  </div>
                  <div className="text-center p-4 bg-beige-50 rounded-lg">
                    <ChefHat className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Tingkat</p>
                    <p className="font-semibold">{recipe.difficulty}</p>
                  </div>
                  <div className="text-center p-4 bg-beige-50 rounded-lg">
                    <Users className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Porsi</p>
                    <p className="font-semibold">{recipe.servings}</p>
                  </div>
                  <div className="text-center p-4 bg-beige-50 rounded-lg">
                    <Clock className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Persiapan</p>
                    <p className="font-semibold">{recipe.prepTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Cara Membuat</h2>
                <div className="space-y-4">
                  {recipe.instructions.map((step: string, index: number) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-4 p-4 rounded-lg transition-all cursor-pointer ${completedSteps.includes(index) ? "bg-teal-50 border-2 border-teal-200" : "bg-gray-50 hover:bg-gray-100"}`}
                      onClick={() => toggleStep(index)}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${completedSteps.includes(index) ? "bg-teal-500 text-white" : "bg-gray-300 text-gray-700"}`}>
                        {completedSteps.includes(index) ? <CheckCircle className="h-5 w-5" /> : index + 1}
                      </div>
                      <p className={`text-gray-700 ${completedSteps.includes(index) ? "line-through" : ""}`}>{step}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ingredients */}
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Bahan-bahan</h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Equipment */}
            <Card className="border-0 shadow-xl bg-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Peralatan</h3>
                <ul className="space-y-2">
                  {recipe.equipment.map((item: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-beige-400 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700" onClick={handleBookmark} disabled={loadingBookmark}>
                <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-teal-500 text-teal-500" : ""}`} />
                {isBookmarked ? "Hapus dari Favorit" : "Simpan ke Favorit"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
