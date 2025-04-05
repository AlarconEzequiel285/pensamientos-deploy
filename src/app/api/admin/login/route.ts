import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { query } from "@/lib/db";

const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_demo";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const result = await query("SELECT * FROM admins WHERE username = ?", [username]);
  const admin = result[0];

  if (!admin) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, admin.password);

  if (!valid) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  const token = jwt.sign({ id: admin.id, username: admin.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  return NextResponse.json({ token });
}
