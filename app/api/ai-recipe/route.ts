import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

// Fungsi parsing hasil AI menjadi bagian-bagian
function parseAIRecipe(text: string) {
  const lines = text.split("\n").map((l) => l.trim());
  let title = "";
  let rating: number | null = null;
  let cook_time: number | null = null;
  let prep_time: number | null = null;
  let difficulty = "";
  let servings: number | null = null;
  let bahan: string[] = [];
  let langkah: string[] = [];
  let equipment: string[] = [];
  let mode: "none" | "bahan" | "langkah" | "equipment" = "none";

  for (const line of lines) {
    if (/^nama resep[:]?/i.test(line)) {
      title = line.replace(/^nama resep[:]?/i, "").trim();
      continue;
    }
    if (/^rating[:]?/i.test(line)) {
      const val = line.replace(/^rating[:]?/i, "").trim();
      rating = parseFloat(val) || null;
      continue;
    }
    if (/^waktu masak[:]?/i.test(line)) {
      const val = line.replace(/^waktu masak[:]?/i, "").trim();
      cook_time = parseInt(val) || null;
      continue;
    }
    if (/^waktu persiapan[:]?/i.test(line)) {
      const val = line.replace(/^waktu persiapan[:]?/i, "").trim();
      prep_time = parseInt(val) || null;
      continue;
    }
    if (/^tingkat kesulitan[:]?/i.test(line)) {
      difficulty = line.replace(/^tingkat kesulitan[:]?/i, "").trim();
      continue;
    }
    if (/^porsi[:]?/i.test(line)) {
      const val = line.replace(/^porsi[:]?/i, "").trim();
      servings = parseInt(val) || null;
      continue;
    }
    if (/^bahan[:]?/i.test(line)) {
      mode = "bahan";
      continue;
    }
    if (/^peralatan[:]?/i.test(line)) {
      mode = "equipment";
      continue;
    }
    if (/^langkah[- ]?langkah[:]?/i.test(line) || /^cara[:]?/i.test(line)) {
      mode = "langkah";
      continue;
    }
    if (mode === "bahan" && line) {
      if (line.startsWith("-")) bahan.push(line.replace(/^-/, "").trim());
      else if (line.length > 0) bahan.push(line);
    }
    if (mode === "equipment" && line) {
      if (line.startsWith("-")) equipment.push(line.replace(/^-/, "").trim());
      else if (line.length > 0) equipment.push(line);
    }
    if (mode === "langkah" && line) {
      const step = line.replace(/^\d+\.\s*/, "").trim();
      if (step) langkah.push(step);
    }
  }
  return {
    title: title || "Resep AI",
    rating,
    cook_time,
    prep_time,
    difficulty,
    servings,
    bahan,
    langkah,
    equipment,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { ingredients } = await req.json();

    // PROMPT TANPA GAMBAR
    const prompt = `Saya punya bahan: ${ingredients.join(
      ", "
    )}. Resep apa yang bisa saya buat? Berikan nama resep, rating (1-5), waktu masak (menit), waktu persiapan (menit), tingkat kesulitan, porsi, bahan, peralatan, dan langkah-langkahnya.
Tampilkan hanya dengan format berikut (jangan tambahkan penjelasan lain di luar format ini):

Nama Resep:
Rating:
Waktu Masak:
Waktu Persiapan:
Tingkat Kesulitan:
Porsi:
Bahan:
- ...
Peralatan:
- ...
Langkah-langkah:
1. ...
2. ...
`;

    const aiRes = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });
    const aiData = await aiRes.json();
    const recipeText = aiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!recipeText) {
      return NextResponse.json({ recipe: { title: "Tidak ada resep ditemukan.", description: "" }, saved: false });
    }

    // Parsing hasil AI
    const parsed = parseAIRecipe(recipeText);

    // Insert ke tabel recipes
    const { data: recipeData, error: recipeError } = await supabase
      .from("recipes")
      .insert([
        {
          title: parsed.title,
          description: recipeText,
          cook_time: parsed.cook_time,
          prep_time: parsed.prep_time,
          difficulty: parsed.difficulty,
          rating: parsed.rating,
          servings: parsed.servings,
        },
      ])
      .select()
      .single();

    if (recipeError || !recipeData) {
      return NextResponse.json({ error: recipeError?.message || "Gagal menyimpan resep" }, { status: 500 });
    }

    // Insert ke tabel ingredients & recipe_ingredients
    for (const ing of parsed.bahan) {
      const { data: ingredient } = await supabase
        .from("ingredients")
        .upsert([{ name: ing }], { onConflict: "name" })
        .select()
        .single();
      if (ingredient) {
        await supabase.from("recipe_ingredients").insert([{ recipe_id: recipeData.id, ingredient_id: ingredient.id }]);
      }
    }

    // Insert ke tabel equipment & recipe_equipment
    for (const eq of parsed.equipment) {
      const { data: equip } = await supabase
        .from("equipment")
        .upsert([{ name: eq }], { onConflict: "name" })
        .select()
        .single();
      if (equip) {
        await supabase.from("recipe_equipment").insert([{ recipe_id: recipeData.id, equipment_id: equip.id }]);
      }
    }

    // Insert ke tabel instructions
    for (let i = 0; i < parsed.langkah.length; i++) {
      await supabase.from("instructions").insert([{ recipe_id: recipeData.id, step_number: i + 1, description: parsed.langkah[i] }]);
    }

    return NextResponse.json({
      recipe: {
        id: recipeData.id,
        title: parsed.title,
        description: recipeText,
        rating: parsed.rating,
        cook_time: parsed.cook_time,
        prep_time: parsed.prep_time,
        difficulty: parsed.difficulty,
        servings: parsed.servings,
        bahan: parsed.bahan,
        langkah: parsed.langkah,
        equipment: parsed.equipment,
      },
      saved: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
