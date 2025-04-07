// src/app/api/posts/route.ts

//Permite visualizar los pensamientos en el dashboard del admin. Se modificaron cosas para arreglar los filtros que ya incorporaba react admin (ordenar por fecha y votos)


import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Endpoint GET para obtener todos los posts, con soporte para ordenamiento
export async function GET(req: Request) {
  // Extraemos los parámetros de búsqueda de la URL
  const { searchParams } = new URL(req.url);

  // React Admin envía el parámetro "sort" como un JSON: ["campo", "orden"]
  const sortParam = searchParams.get("sort");

  // Valores por defecto: ordenar por fecha descendente
  let sortField = "fecha";
  let sortOrder = "DESC";

  // Si viene el parámetro "sort", intentamos parsearlo y validarlo
  if (sortParam) {
    try {
      const [field, order] = JSON.parse(sortParam);

      // Lista de columnas válidas para evitar SQL injection
      const validColumns = ["id", "content", "upvotes", "downvotes", "fecha"];
      if (validColumns.includes(field)) {
        sortField = field;
        sortOrder = order?.toUpperCase() === "DESC" ? "DESC" : "ASC";
      }
    } catch (err) {
      console.warn("Error parsing sort param:", err);
    }
  }

  // Consulta SQL para traer los posts ordenados según los parámetros
  const posts = await query(`SELECT * FROM posts ORDER BY ${sortField} ${sortOrder}`);

  // Armamos la respuesta y seteamos los headers que React Admin necesita
  const response = NextResponse.json(posts);
  response.headers.set("Content-Range", `posts 0-${posts.length - 1}/${posts.length}`);
  response.headers.set("Access-Control-Expose-Headers", "Content-Range");

  return response;
}
