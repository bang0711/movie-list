import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

import DashboardCard from "@/components/DashboardCard";
import SignOut from "@/components/SignOut";
type Props = {};
const prisma = new PrismaClient();
async function DashboardPage({}: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
    select: {
      email: true,
      name: true,
      movies: true,
      id: true,
    },
  });

  return (
    <div className="p-3">
      <p className="p-3">Welcome back {user?.name}</p>
      <SignOut />
      <div className="">
        <p className="text-center py-3">This is you favorite movies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto gap-3">
          {user?.movies.slice(1, user?.movies.length).map((movie) => (
            <DashboardCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
