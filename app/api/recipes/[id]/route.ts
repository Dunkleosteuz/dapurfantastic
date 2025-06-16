import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Ambil data resep utama
    const { data: recipe, error } = await supabase.from("recipes").select("*").eq("id", id).single();

    if (error || !recipe) {
      return NextResponse.json({ message: "Resep tidak ditemukan" }, { status: 404 });
    }

    // Ambil bahan-bahan
    const { data: ingredients } = await supabase.from("recipe_ingredients").select("ingredient_id, ingredients(name)").eq("recipe_id", id);

    // Ambil langkah-langkah
    const { data: instructions } = await supabase.from("instructions").select("step_number, description").eq("recipe_id", id).order("step_number", { ascending: true });

    // Ambil peralatan
    const { data: equipment } = await supabase.from("recipe_equipment").select("equipment_id, equipment(name)").eq("recipe_id", id);

    return NextResponse.json({
      id: recipe.id,
      title: recipe.title,
      summary: recipe.summary, // <-- tambahkan summary di sini
      description: recipe.description,
      image: recipe.image_url,
      cookTime: recipe.cook_time,
      prepTime: recipe.prep_time,
      difficulty: recipe.difficulty,
      rating: recipe.rating,
      servings: recipe.servings,
      ingredients: ingredients?.map((i) => i.ingredients?.name) || [],
      equipment: equipment?.map((e) => e.equipment?.name) || [],
      instructions: instructions?.map((i) => i.description) || [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
