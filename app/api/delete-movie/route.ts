import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  const body = await req.json();
  const { movieId, title, backdrop_path } = body;
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("You need to sign in first.", { status: 400 });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  const deletedMovie = await prisma.movie.delete({
    where: {
      userId: user?.id,
      id: movieId,
      backdrop_path,
      title,
    },
  });
  return NextResponse.json(deletedMovie);
}
