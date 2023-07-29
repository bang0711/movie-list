"use client";
import React from "react";

type Props = { movie: any };

function DeleteButton({ movie }: Props) {
  const data = {
    movieId: movie.id,
    title: movie.title,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
  };
  const deleteMovie = async (e: any) => {
    e.preventDefault();
    await fetch("/api/delete-movie", {
      method: "DELETE",
      body: JSON.stringify(data),
    });
  };
  return <button onClick={deleteMovie}>Remove from Favorite List</button>;
}

export default DeleteButton;
