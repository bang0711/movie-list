"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = { movie: any };

function AddButton({ movie }: Props) {
  const data = {
    movieId: movie.id,
    title: movie.title,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
  };
  const router = useRouter();
  const addMovie = async (e: any) => {
    e.preventDefault();
    await fetch("/api/add-movie", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
    });

    router.refresh();
  };
  return <button onClick={addMovie}>Add To Favorite List</button>;
}

export default AddButton;
