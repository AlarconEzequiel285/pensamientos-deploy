// Sirve para manejar el tema de los votos asignando un id a los usuarios, más que nada para que en una sesión no se puedan repetir votos.

import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // Generador de IDs únicos (UUID v4)

/**
 * Este middleware se ejecuta en cada solicitud (excepto estáticos).
 * Su objetivo es asignar un ID anónimo a cada visitante si no lo tiene ya.
 */
export function middleware(req: NextRequest) {
  const res = NextResponse.next(); // Continuamos con la respuesta normalmente

  // Buscamos si ya existe la cookie "anon_id"
  let anonId = req.cookies.get("anon_id")?.value;

  // Si no existe, generamos una nueva
  if (!anonId) {
    anonId = uuidv4();

    // 🍪 Establecemos una cookie con el nuevo ID anónimo, válida por 1 año
    res.cookies.set("anon_id", anonId, {
      path: "/",                          // Disponible para todo el sitio
      maxAge: 60 * 60 * 24 * 365,         // 🕒 1 año en segundos
    });
  }

  return res; // Devolvemos la respuesta (con o sin cookie modificada)
}

/**
 * Configuración del middleware
 * 
 * "matcher" indica para qué rutas debe ejecutarse este middleware.
 * En este caso:
 * - Se ignoran recursos estáticos de Next.js y el favicon.
 * - Se aplica a todas las demás rutas del sitio.
 */
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
