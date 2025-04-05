import { query } from "./db";

async function testConnection() {
  try {
    const result = await query("SELECT 1 as test");
    console.log("✅ Conexión exitosa:", result);
  } catch (error) {
    console.error("❌ Error de conexión:", error);
  }
}

testConnection();
