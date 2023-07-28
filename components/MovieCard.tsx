import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddButton from "./AddButton";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
type Props = {
  movie: any;
};
const prisma = new PrismaClient();
async function MovieCard({ movie }: Props) {
  const session = await getServerSession(authOptions);
  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: session?.user?.email as string,
  //   },
  // });
  // console.log(user);
  return (
    <div className="flex flex-col border border-gray-200 items-center justify-center mx-auto gap-3 py-3 px-1 rounded-lg shadow-lg relative">
      <Image
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
        width={300}
        height={500}
        className="rounded-lg w-full h-60 sm:w-40 sm:h-52"
        loading="lazy"
      />
      <Link
        href={`/movie/${movie.id}`}
        className="w-60 text-center p-2 truncate group"
      >
        {" "}
        {movie.title}
        <div
          className={`group-hover:w-full mx-auto w-0 transition-all duration-500 h-2 rounded-lg bg-black`}
        />
      </Link>
      <div className="flex w-full justify-center gap-1">
        {[...Array.from({ length: Math.round(movie.vote_average / 2) })].map(
          (_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-yellow-400"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          )
        )}
      </div>
      <AddButton movie={movie} />
    </div>
  );
}

export default MovieCard;
