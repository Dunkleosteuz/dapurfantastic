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
