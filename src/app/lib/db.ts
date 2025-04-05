"use server";
import mariadb from "mariadb";
import "dotenv/config";

const pool = mariadb.createPool({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "123",
  database: process.env.MYSQLDATABASE || "pensamientos_db",
  port: Number(process.env.MYSQLPORT) || 3306,
  connectionLimit: 5,
});

export async function query(sql: string, values?: any[]) {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(sql, values);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

export async function getPosts() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM posts ORDER BY fecha DESC');
    return rows;
  } catch (err) {
    console.error(err);
    return [];
  } finally {
    if (conn) conn.release();
  }
}

export async function createPost(content: string) {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(
      'INSERT INTO posts (content, upvotes, downvotes, fecha) VALUES (?, 0, 0, NOW())',
      [content]
    );
    return res.insertId;
  } catch (err) {
    console.error("Error en createPost:", err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

// Función simplificada para registrar un voto (sin control de duplicado)
export async function votePost(postId: number, type: "upvote" | "downvote") {
  let conn;
  try {
    conn = await pool.getConnection();

    await conn.query(
      `UPDATE posts SET ${type === "upvote" ? "upvotes" : "downvotes"} = ${type === "upvote" ? "upvotes" : "downvotes"} + 1 WHERE id = ?`,
      [postId]
    );

    return true;
  } catch (error) {
    console.error("Error en votePost:", error);
    return false;
  } finally {
    if (conn) conn.release();
  }
}
