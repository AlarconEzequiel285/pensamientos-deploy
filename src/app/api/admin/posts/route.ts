// src/app/api/admin/posts/route.ts

// Este endpoint permite que el administrador pueda ver los posts una vez ya logeado en su dashboard.


import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";  // Función para verificar el JWT
import { query } from "@/lib/db";          // Función para hacer consultas a la base de datos

// Handler para peticiones GET — devuelve todos los posts si el token es válido
export async function GET(req: Request) {
  // Obtenemos el header de autorización que debe contener el token
  const authHeader = req.headers.get("authorization");

  // Si no hay token o el formato no es correcto, devolvemos un error 401 (No autorizado)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Extraemos el token del header
  const token = authHeader.split(" ")[1];

  // Verificamos si el token es válido usando la función personalizada
  const { valid, decoded } = verifyToken(token);

  // Si el token no es válido, devolvemos error 403 (Prohibido)
  if (!valid) {
    return NextResponse.json({ error: "Token inválido" }, { status: 403 });
  }

  // Si el token es válido, consultamos todos los posts en la base de datos
  const posts = await query("SELECT * FROM posts");

  // Respondemos con los posts encontrados
  return NextResponse.json({ posts });
}
