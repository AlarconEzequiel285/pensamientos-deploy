import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const { valid, decoded } = verifyToken(token);

  if (!valid) {
    return NextResponse.json({ error: "Token inválido" }, { status: 403 });
  }

  const posts = await query("SELECT * FROM posts");

  return NextResponse.json({ posts });
}
