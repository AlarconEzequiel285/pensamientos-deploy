// src/app/components/PostList.tsx

//Como su nombre lo indica, permita listar los pensamientos, además de permitir votar (like dislike), permitiendo un solo voto por sesión (función votePost)

"use client"; // Este componente se ejecuta del lado del cliente
import React from "react";

// Tipo de dato para un post individual
interface Post {
  id: number;
  content: string;
  upvotes: number;
  downvotes: number;
}

// Props que recibe el componente PostList
interface PostListProps {
  posts: Post[]; // Lista de pensamientos
  onVote: (id: number, type: "upvote" | "downvote") => void; // Función para registrar un voto
  votedPosts: number[]; // Array con IDs de posts que ya fueron votados
}

// Componente que renderiza la lista de pensamientos
export default function PostList({ posts, onVote, votedPosts }: PostListProps) {
  // Si no hay posts, mostramos un mensaje
  if (posts.length === 0) {
    return <p className="text-center text-gray-300">No hay pensamientos aún.</p>;
  }

  return (
    <div>
      {posts.map((post) => {
        // Verificamos si el usuario ya votó este post
        const hasVoted = votedPosts.includes(post.id);

        return (
          <div
            key={post.id}
            className="mb-6 p-4 rounded-lg bg-white text-black shadow-lg"
          >
            {/* Mostramos el contenido del post */}
            <p className="mb-3 text-base">{post.content}</p>

            {/* Botones de votación */}
            <div className="flex gap-4">
              {/* Botón de upvote */}
              <button
                type="button"
                onClick={() => onVote(post.id, "upvote")}
                disabled={hasVoted} // Si ya votó, desactivamos
                aria-label="Votar a favor"
                className={`px-3 py-1 rounded font-medium transition ${
                  hasVoted
                    ? "text-gray-400 cursor-not-allowed" // Estilo si ya votó
                    : "text-green-600 hover:text-green-800" // Estilo activo
                }`}
              >
                👍 {post.upvotes}
              </button>

              {/* Botón de downvote */}
              <button
                type="button"
                onClick={() => onVote(post.id, "downvote")}
                disabled={hasVoted}
                aria-label="Votar en contra"
                className={`px-3 py-1 rounded font-medium transition ${
                  hasVoted
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-600 hover:text-red-800"
                }`}
              >
                👎 {post.downvotes}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
