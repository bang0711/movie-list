import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("You need to sign in first.", { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
    select: {
      email: true,
      id: true,
      movies: true,
    },
  });
  const body = await req.json();

  const { movieId, title, backdrop_path, vote_average } = body;

  const movie = await prisma.movie.findFirst({
    where: {
      movieId,
      title,
      backdrop_path,
      vote_average,
      userId: user!.id,
    },
  });
  if (movie) {
    return new NextResponse("You already have this movie", { status: 400 });
  }
  const newMovie = await prisma.movie.create({
    data: {
      movieId,
      title,
      backdrop_path,
      vote_average,
      userId: user!.id,
    },
  });
  return NextResponse.json(newMovie);
}
