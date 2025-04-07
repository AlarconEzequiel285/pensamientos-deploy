// src/app/components/PostForm.tsx

//Encargado de dejar que el usuario pueda escribir un pensamiento en el textarea, para luego enviar esto a la api/create.

"use client"; 

import { useState } from "react";

// Props que recibe el componente PostForm
interface PostFormProps {
  onPostCreated: () => void; // Callback para notificar al padre cuando se crea un post
}

//Función auxiliar que se encarga de enviar el contenido a la API del backend
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

// Componente principal del formulario para crear pensamientos
export default function PostForm({ onPostCreated }: PostFormProps) {
  const [content, setContent] = useState(""); // Estado para el contenido del textarea

  //  Maneja el submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validamos que no esté vacío
    if (!content.trim()) return;

    try {
      await submitPost(content); // Enviamos a la API
      setContent(""); // Limpiamos el textarea
      onPostCreated(); // Notificamos al padre para refrescar la lista
    } catch (error) {
      console.error("Error al publicar el pensamiento:", error);
      // Podrías mostrar un mensaje de error aquí si lo deseas
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
