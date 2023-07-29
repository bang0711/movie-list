"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
type Props = { movie: any };

function DeleteButton({ movie }: Props) {
  const router = useRouter();
  const data = {
    movieId: movie.id,
    title: movie.title,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
  };
  const deleteMovie = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/delete-movie", {
      method: "DELETE",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Failed to delete movie.");
      return;
    }
    toast.success("Movie deleted successfully");
    router.refresh();
  };
  return <button onClick={deleteMovie}>Remove from Favorite List</button>;
}

export default DeleteButton;
