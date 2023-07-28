import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    // @ts-expect-error
    async createUser(message: { user: User }) {
      const userId = message.user.id;
      if (!userId) {
        return new NextResponse("You must login first.", { status: 400 });
      }
      const defaultMovie = await prisma.movie.create({
        data: {
          userId: userId,
          backdrop_path: "",
          movieId: 0,
          title: "",
          vote_average: 10,
        },
      });
      const user = await prisma.user.findUnique({
        where: {
          email: message.user.email as string,
        },
        select: {
          email: true,
          name: true,
          image: true,
          movies: true,
        },
      });
      return NextResponse.json(defaultMovie);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
