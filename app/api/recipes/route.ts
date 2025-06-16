import { NextRequest, NextResponse } from "next/server";
import { parseAIResult } from "@/app/ai-recipe/parseAIResult";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Simpan API key di .env.local

export async function POST(req: NextRequest) {
  const { ingredients } = await req.json();

  // Buat prompt untuk Gemini
  const prompt = `
Buatkan resep masakan sederhana dari bahan-bahan berikut:
${Array.isArray(ingredients) ? ingredients.join(", ") : ingredients}.
Tampilkan dengan format:
Nama Resep:
Porsi:
Waktu Masak:
Tingkat Kesulitan:
Bahan-bahan:
Cara Membuat:
`;

  // Fetch ke Gemini AI
  const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  });

  if (!geminiRes.ok) {
    return NextResponse.json({ error: "Gagal mengambil resep dari Gemini AI" }, { status: 500 });
  }

  const geminiData = await geminiRes.json();
  // Ambil hasil teks dari Gemini
  const aiText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || geminiData.candidates?.[0]?.content?.text || "";

  const recipe = parseAIResult(aiText);

  return NextResponse.json({ recipe });
}
