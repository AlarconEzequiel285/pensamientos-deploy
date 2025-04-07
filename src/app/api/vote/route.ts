// src/app/api/vote/route.ts

//Encargado de recibir los votos de un post y escribirlos en la base de datos mediante la función votePost

import { NextResponse } from "next/server";
import { votePost } from "@/lib/db";

// Endpoint POST para registrar un voto (positivo o negativo) en un post
export async function POST(req: Request) {
  try {
    // Parseamos el cuerpo del request
    const { id, type } = await req.json();

    // Validamos que se haya recibido un ID y que el tipo de voto sea válido
    if (!id || (type !== "upvote" && type !== "downvote")) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    // Ejecutamos la función para registrar el voto en la base de datos
    await votePost(id, type);

    // Devolvemos una respuesta exitosa
    return NextResponse.json({ success: true });
  } catch (error) {
    // Capturamos errores y respondemos con un mensaje de error
    console.error("❌ Error en la API /api/vote:", error);
    return NextResponse.json(
      { error: "Error al registrar el voto" },
      { status: 500 }
    );
  }
}
