import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  await query("DELETE FROM posts WHERE id = ?", [id]);

  return NextResponse.json({ message: "Post eliminado" });
}