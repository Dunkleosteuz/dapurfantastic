import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  const { user_id, recipe_id } = await req.json();
  const { data, error } = await supabase.from("bookmarks").insert([{ user_id, recipe_id }]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ bookmark: data });
}

export async function DELETE(req: NextRequest) {
  const { user_id, recipe_id } = await req.json();
  const { error } = await supabase.from("bookmarks").delete().eq("user_id", user_id).eq("recipe_id", recipe_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// Tambahkan GET untuk cek status bookmark
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");
  const recipe_id = searchParams.get("recipe_id");
  if (!user_id || !recipe_id) {
    return NextResponse.json({ isBookmarked: false });
  }
  const { data } = await supabase.from("bookmarks").select("*").eq("user_id", user_id).eq("recipe_id", recipe_id).single();
  return NextResponse.json({ isBookmarked: !!data });
}
