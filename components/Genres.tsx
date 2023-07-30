"use client";
import { getGenres } from "@/libs/Functions";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
type Props = {};

function Genres({}: Props) {
  const [genresList, setGenresList] = useState([]);
  useEffect(() => {
    async function getGenresList() {
      const genres = await getGenres();
      setGenresList(genres.genres);
    }
    getGenresList();
  }, []);
  return (
    <ul className="flex flex-wrap gap-3 items-center justify-center py-3">
      {genresList.map((genre: any) => (
        <li
          className={`border border-gray-200 shadow-md px-3 py-1 rounded-lg hover:scale-105 hover:shadow-lg cursor-pointer`}
          key={genre.id}
        >
          <Link href={`/genres/${genre.id}`}> {genre.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Genres;
