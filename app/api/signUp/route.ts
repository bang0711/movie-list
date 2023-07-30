import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
export async function POST(req: Request) {
  const body = await req.json();

  const { email, name, password } = body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return new NextResponse("User already exists.", { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 11);
  const newUser = await prisma.user.create({
    data: {
      email: email,
      hashedPassword: hashedPassword,
      name: name,
      image: "",
      movies: {
        create: {
          backdrop_path: "",
          movieId: 0,
          title: "",
          vote_average: 10,
        },
      },
    },
  });

  return NextResponse.json(newUser);
}
