// src/app/api/create/route.ts

//Este endpoint permite que los usuarios puedan enviar posts (pensamientos), sin necesidad de logearse. 

import { NextResponse } from "next/server";
import { createPost } from "@/lib/db"; // Función para insertar un nuevo post en la base de datos

// Endpoint que maneja solicitudes POST para crear un nuevo pensamiento
export async function POST(req: Request) {
  try {
    // Extraemos el contenido enviado en el cuerpo del request
    const { content } = await req.json();

    // Validamos que el contenido sea un string no vacío
    if (!content || typeof content !== "string" || content.trim() === "") {
      return NextResponse.json(
        { error: "Contenido inválido" },
        { status: 400 } // Error de solicitud mal formada
      );
    }

    // Creamos el post en la base de datos y recibimos el ID generado
    const id = await createPost(content);

    // Si no se pudo crear el post, devolvemos un error interno
    if (!id) {
      console.error("❌ No se pudo insertar el post en la base de datos.");
      return NextResponse.json(
        { error: "No se pudo crear el pensamiento" },
        { status: 500 }
      );
    }

    // Convertimos el ID (que puede venir como BigInt) a número para evitar errores en JSON
    return NextResponse.json({ success: true, id: Number(id) });

  } catch (error: any) {
    // Manejo de errores generales con logging
    console.error("❌ Error en la API /api/create:", error?.message || error);
    return NextResponse.json(
      { error: "Error al crear el pensamiento" },
      { status: 500 } // Error interno del servidor
    );
  }
}
