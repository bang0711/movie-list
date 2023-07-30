// "use client";
import React from "react";
// import { useSession } from "next-auth/react";
// import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ThemeButton from "./ThemeButton";
type Props = {};

async function Navbar({}: Props) {
  const session = await getServerSession(authOptions);

  // const { data, status } = useSession();
  return (
    <header className="shadow-md dark:shadow-slate-500 mb-5 flex items-center justify-between p-3 sticky z-50 top-0 backdrop-blur-md bg-white/50 dark:bg-black/50">
      <nav className="flex items-center justify-between w-full">
        <Link href={"/"} className="btn">
          Home
        </Link>

        <div className="flex items-center gap-2">
          <ThemeButton />
          {session ? (
            <Link href={"/dashboard"} className="btn">
              Dashboard
            </Link>
          ) : (
            <Link href={"/signIn"} className="btn">
              Sign In
            </Link>
          )}
          {/* <div>
            {data === null && status === "loading" ? (
              <button onClick={() => signOut()}>Sign Out</button>
            ) : data && status === "authenticated" ? (
              <button onClick={() => signOut()}>Sign Out</button>
            ) : data === undefined && status === "loading" ? (
              <button onClick={() => signOut()}>Sign Out</button>
            ) : (
              <Link href={"/signIn"} className="btn">
                Sign In
              </Link>
            )}
          </div> */}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
