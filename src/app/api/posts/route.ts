import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // React Admin envía sort como un JSON: ["field", "order"]
  const sortParam = searchParams.get("sort");

  // ✅ Cambiamos los valores por defecto para que ordene por fecha DESC
  let sortField = "fecha";
  let sortOrder = "DESC";

  if (sortParam) {
    try {
      const [field, order] = JSON.parse(sortParam);

      // Validación contra columnas válidas
      const validColumns = ["id", "content", "upvotes", "downvotes", "fecha"];
      if (validColumns.includes(field)) {
        sortField = field;
        sortOrder = order?.toUpperCase() === "DESC" ? "DESC" : "ASC";
      }
    } catch (err) {
      console.warn("Error parsing sort param:", err);
    }
  }

  const posts = await query(`SELECT * FROM posts ORDER BY ${sortField} ${sortOrder}`);

  const response = NextResponse.json(posts);
  response.headers.set("Content-Range", `posts 0-${posts.length - 1}/${posts.length}`);
  response.headers.set("Access-Control-Expose-Headers", "Content-Range");

  return response;
}
