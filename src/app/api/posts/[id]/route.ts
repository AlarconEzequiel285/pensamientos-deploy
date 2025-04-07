import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const idStr = url.pathname.split("/").pop();
  const id = parseInt(idStr || "", 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  await query("DELETE FROM posts WHERE id = ?", [id]);

  return NextResponse.json({ message: "Post eliminado" });
}


//Tuvo que modificarse el parametro de delete para que se haga de una forma que Vercel permita buildearla.