import bcrypt from "bcrypt";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
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
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // @ts-expect-error
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          return new NextResponse("User not found.", { status: 400 });
        }

        const isMatch = bcrypt.compare(
          user?.hashedPassword as string,
          credentials?.password!
        );

        if (!isMatch) {
          return new NextResponse("Password incorrect.", { status: 400 });
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
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
      return NextResponse.json(defaultMovie);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };
