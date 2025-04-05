"use client";

import { useEffect, useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  content: string;
  upvotes: number;
  downvotes: number;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [view, setView] = useState<"welcome" | "new">("welcome");
  const [votedPosts, setVotedPosts] = useState<number[]>([]);
  const router = useRouter();

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleVote = async (id: number, type: "upvote" | "downvote") => {
    if (votedPosts.includes(id)) return;

    const res = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, type }),
    });

    if (res.ok) {
      setVotedPosts((prev) => [...prev, id]);
      fetchPosts();
    }
  };

  return (
    <main className="min-h-screen bg-blue-950 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-blue-900 rounded-2xl shadow-xl p-6 mb-6 relative text-white">
        <h1 className="text-4xl font-bold text-center mb-4 text-white">
          🧠 Pensamientos
        </h1>

        {/* Botón admin arriba a la derecha */}
        <button
          onClick={() => router.push("/admin/login")}
          className="absolute top-4 right-4 text-sm text-blue-300 hover:underline"
        >
          Admin
        </button>

        {view === "welcome" ? (
          <>
            <button
              onClick={() => setView("new")}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl transition mb-6"
            >
              Escribir un pensamiento
            </button>
            <PostList
              posts={posts}
              onVote={handleVote}
              votedPosts={votedPosts}
            />
          </>
        ) : (
          <>
            <button
              onClick={() => setView("welcome")}
              className="text-sm text-blue-300 hover:underline mb-4"
            >
              ← Volver al inicio
            </button>
            <PostForm
              onPostCreated={() => {
                fetchPosts();
                setView("welcome");
              }}
            />
          </>
        )}
      </div>
    </main>
  );
}
