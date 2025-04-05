import { NextResponse } from "next/server";
import { createPost } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json(
        { error: "Contenido inválido" },
        { status: 400 }
      );
    }

    const id = await createPost(content);

    if (!id) {
      console.error("❌ No se pudo insertar el post en la base de datos.");
      return NextResponse.json(
        { error: "No se pudo crear el pensamiento" },
        { status: 500 }
      );
    }

    // Convertimos BigInt a número
    return NextResponse.json({ success: true, id: Number(id) });

  } catch (error: any) {
    console.error("❌ Error en la API /api/create:", error?.message || error);
    return NextResponse.json(
      { error: "Error al crear el pensamiento" },
      { status: 500 }
    );
  }
}
