import Genres from "@/components/Genres";
import MovieCard from "@/components/MovieCard";
import { getMovies } from "@/libs/Functions";
import Link from "next/link";
import React from "react";
type Props = {};

async function HomePage({}: Props) {
  const types = [
    {
      title: "Popular",
      id: "popular",
    },
    {
      title: "Top Rated",
      id: "top_rated",
    },
    {
      title: "Upcoming",
      id: "upcoming",
    },
  ];
  return (
    <div>
      <Genres />
      <div className="flex flex-col gap-3">
        {types.map(async (type) => {
          const movies = await getMovies(1, type.id);
          return (
            <div key={type.id}>
              <div className="px-3 flex items-center justify-between">
                <p className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase">
                  {type.title}
                </p>

                <Link href={`/type/${type.id}/1`} className="btn">
                  See More
                </Link>
              </div>
              <div className="flex flex-nowrap lg:hidden w-screen overflow-auto p-3 gap-3">
                {movies.results.slice(0, 5).map((movie: Movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </div>
              <div className="hidden lg:grid overflow-auto lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
                {movies.results.slice(0, 5).map((movie: Movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;

// edgLaf9ZzvsV3FJV
