// src/app/lib/auth.ts

//Verificación para ver si un token JWT es valido. Más que nada para el panel de administración

import jwt from "jsonwebtoken";

//  Clave secreta para firmar y verificar tokens JWT
//  esta clave debe venir desde una variable de entorno segura
const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_demo";

/**
 * Verifica un token JWT.
 * @param token El token a verificar.
 * @returns Un objeto con `valid: true` y el contenido decodificado si es válido,
 *          o `valid: false` y el error si es inválido.
 */
export function verifyToken(token: string) {
  try {
    // Verificamos el token usando la clave secreta
    const decoded = jwt.verify(token, SECRET_KEY);
    return { valid: true, decoded }; // Si es válido, devolvemos el payload
  } catch (error) {
    return { valid: false, error }; // Si hay error (token inválido o expirado)
  }
}
