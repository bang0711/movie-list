"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
type Props = {};

function Navbar({}: Props) {
  const { data, status } = useSession();
  return (
    <header className="shadow-md flex items-center justify-between p-3 sticky z-50 top-0 backdrop-blur-md bg-white/50">
      <nav className="flex items-center justify-between w-full">
        <button>
          {" "}
          <Link href={"/"}>Home</Link>
        </button>

        <div className="flex items-center gap-2">
          {data && status === "authenticated" && (
            <Link href={"/dashboard"} className="btn">
              Dashboard
            </Link>
          )}

          <div>
            {data === null && status === "loading" ? (
              <button onClick={() => signOut()}>Sign Out</button>
            ) : data && status === "authenticated" ? (
              <button onClick={() => signOut()}>Sign Out</button>
            ) : data === undefined && status === "loading" ? (
              <button onClick={() => signOut()}>Sign Out</button>
            ) : (
              <button onClick={() => signIn("google")}>
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
