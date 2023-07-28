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
    },
  });
  const body = await req.json();
  const { movieId, title, backdrop_path, vote_average } = body;

  const newMovie = await prisma.movie.create({
    data: {
      movieId,
      title,
      backdrop_path,
      vote_average,
      userId: user!.id,
    },
  });
  console.log(user);
  console.log(movieId);
  return NextResponse.json(newMovie);
}
