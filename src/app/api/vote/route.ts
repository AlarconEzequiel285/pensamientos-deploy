import { NextResponse } from "next/server";
import { votePost } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { id, type } = await req.json();

    if (!id || (type !== "upvote" && type !== "downvote")) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    await votePost(id, type);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error en la API /api/vote:", error);
    return NextResponse.json(
      { error: "Error al registrar el voto" },
      { status: 500 }
    );
  }
}
