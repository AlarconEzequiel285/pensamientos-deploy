import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "clave_secreta_demo";

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error };
  }
}
