import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import SignUpForm from "@/components/SignUpForm";
type Props = {};

async function SignUpPage({}: Props) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <SignUpForm />
    </div>
  );
}

export default SignUpPage;
