import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignInForm from "@/components/SignInForm";
type Props = {};

async function SignInPage({}: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <SignInForm />
    </div>
  );
}

export default SignInPage;
