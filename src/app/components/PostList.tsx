"use client";
import React from "react";

interface Post {
  id: number;
  content: string;
  upvotes: number;
  downvotes: number;
}

interface PostListProps {
  posts: Post[];
  onVote: (id: number, type: "upvote" | "downvote") => void;
  votedPosts: number[];
}

export default function PostList({ posts, onVote, votedPosts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-center text-gray-300">No hay pensamientos aún.</p>;
  }

  return (
    <div>
      {posts.map((post) => {
        const hasVoted = votedPosts.includes(post.id);

        return (
          <div
            key={post.id}
            className="mb-6 p-4 rounded-lg bg-white text-black shadow-lg"
          >
            <p className="mb-3 text-base">{post.content}</p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onVote(post.id, "upvote")}
                disabled={hasVoted}
                aria-label="Votar a favor"
                className={`px-3 py-1 rounded font-medium transition ${
                  hasVoted
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-green-600 hover:text-green-800"
                }`}
              >
                👍 {post.upvotes}
              </button>
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
