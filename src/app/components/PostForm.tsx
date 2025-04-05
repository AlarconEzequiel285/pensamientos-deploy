"use client";

import { useState } from "react";

interface PostFormProps {
  onPostCreated: () => void;
}

// Esta función llama a la API del backend que realmente hace la conexión a la base de datos
async function submitPost(content: string) {
  const res = await fetch("/api/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) {
    throw new Error("Error al crear el pensamiento");
  }
}

export default function PostForm({ onPostCreated }: PostFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await submitPost(content);
      setContent("");
      onPostCreated(); // Notificamos al padre que se creó un nuevo post
    } catch (error) {
      console.error("Error al publicar el pensamiento:", error);
      // Podés mostrar un mensaje de error si querés
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        className="w-full border rounded p-2"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribí tu pensamiento..."
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Publicar pensamiento
      </button>
    </form>
  );
}
