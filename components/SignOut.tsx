"use client";
import React from "react";
import { signOut } from "next-auth/react";
type Props = {};

function SignOut({}: Props) {
  return <button onClick={() => signOut()}>Sign Out</button>;
}

export default SignOut;
