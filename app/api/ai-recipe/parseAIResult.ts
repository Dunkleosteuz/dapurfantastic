export function parseAIResult(str: string) {
  str = str.replace(/#+\s?/g, "").replace(/\*\*/g, "");

  const title = str.match(/Nama Resep:\s*(.*)/i)?.[1]?.trim() || str.match(/Resep:\s*(.*)/i)?.[1]?.trim() || str.match(/^([^\n]+)\n/)?.[1]?.trim() || "Resep AI";

  // Ambil summary
  const summary = str.match(/Summary:\s*([\s\S]*?)(?:Porsi:|Waktu Masak:|Tingkat Kesulitan:|Bahan:|Bahan-bahan:)/i)?.[1]?.trim() || "";

  const description = str.match(/Deskripsi:\s*([\s\S]*?)(?:Rating:|Waktu Masak:|Waktu Persiapan:|Tingkat Kesulitan:|Porsi:|Bahan:|Bahan-bahan:)/i)?.[1]?.trim() || "";
  const rating = Number(str.match(/Rating.*?:\s*([\d.]+)/i)?.[1]) || 0;
  const cookTime = str.match(/Waktu Masak.*?:\s*(.*)/i)?.[1]?.trim() || "";
  const prepTime = str.match(/Waktu Persiapan.*?:\s*(.*)/i)?.[1]?.trim() || "";
  const difficulty = str.match(/Tingkat Kesulitan.*?:\s*(.*)/i)?.[1]?.trim() || "";
  const servings = str.match(/Porsi.*?:\s*(.*)/i)?.[1]?.trim() || "";
  const ingredients = (str.match(/Bahan(?:-bahan)?:([\s\S]*?)(?:Peralatan:|Langkah-langkah:|Cara Membuat:)/i)?.[1] ?? "")
    .split("\n")
    .map((x) => x.replace(/^- /, "").trim())
    .filter(Boolean);
  const equipment = (str.match(/Peralatan:([\s\S]*?)(?:Langkah-langkah:|Cara Membuat:)/i)?.[1] ?? "")
    .split("\n")
    .map((x) => x.replace(/^- /, "").trim())
    .filter(Boolean);
  const instructionsRaw = str.match(/(?:Langkah-langkah:|Cara Membuat:)([\s\S]*)/i)?.[1] ?? "";
  const instructions = instructionsRaw
    .split(/\d+\.\s/)
    .map((x) => x.trim())
    .filter(Boolean);

  return {
    title,
    summary, // <-- tambahkan summary di sini
    description,
    rating,
    cookTime,
    prepTime,
    difficulty,
    servings,
    ingredients,
    equipment,
    instructions,
    id: "",
  };
}
