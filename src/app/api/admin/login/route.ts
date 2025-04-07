// src/app/api/admin/login/route.ts

//Endpoint para que un administrador inicie sesión, manda un token para verificar en el navegador el proceso de autenticación

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";          // Para generar el token JWT
import bcrypt from "bcryptjs";           // Para comparar contraseñas hasheadas
import { query } from "@/lib/db";         // Función personalizada para hacer consultas a la base de datos

// Clave secreta para firmar el JWT
const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_demo";

// Handler para peticiones POST (login)
export async function POST(req: Request) {
  // Obtenemos el username y password desde el cuerpo de la petición
  const { username, password } = await req.json();

  // Buscamos al admin en la base de datos por su nombre de usuario
  const result = await query("SELECT * FROM admins WHERE username = ?", [username]);
  const admin = result[0];

  // Si no se encontró el usuario, devolvemos un error 401
  if (!admin) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 401 });
  }

  // Verificamos que la contraseña enviada coincida con la almacenada (hasheada)
  const valid = await bcrypt.compare(password, admin.password);

  if (!valid) {
    // Si no coincide, devolvemos otro 401
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  // Si todo está bien, generamos un token JWT con los datos del admin
  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    SECRET_KEY,
    { expiresIn: "1h" } // Expira en 1 hora
  );

  // Devolvemos el token al cliente
  return NextResponse.json({ token });
}
