"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import Link from "next/link";
type Props = {};

function SignInForm({}: Props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const res = await signIn("credentials", {
  //     ...data,
  //     redirect: false,
  //   });

  //   if (!res?.ok) {
  //     toast.error("Failed to sign in");
  //     setIsLoading(false);
  //     return;
  //   }
  //   toast.success("Sign in successful");
  //   setIsLoading(false);
  //   router.push("/");
  // };
  return (
    <form className="w-full flex flex-col md:w-[60%] p-6 md:rounded-lg border-2 border-gray-200 shadow-lg space-y-5">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3">
        Sign In
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
        <button
          type="button"
          onClick={() => signIn("google")}
          className="flex items-center gap-3 bg-black dark:bg-white justify-center text-white dark:text-black"
        >
          <svg className="w-6 h-6 " viewBox="0 0 1024 1024" fill="currentColor">
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm167 633.6C638.4 735 583 757 516.9 757c-95.7 0-178.5-54.9-218.8-134.9C281.5 589 272 551.6 272 512s9.5-77 26.1-110.1c40.3-80.1 123.1-135 218.8-135 66 0 121.4 24.3 163.9 63.8L610.6 401c-25.4-24.3-57.7-36.6-93.6-36.6-63.8 0-117.8 43.1-137.1 101-4.9 14.7-7.7 30.4-7.7 46.6s2.8 31.9 7.7 46.6c19.3 57.9 73.3 101 137 101 33 0 61-8.7 82.9-23.4 26-17.4 43.2-43.3 48.9-74H516.9v-94.8h230.7c2.9 16.1 4.4 32.8 4.4 50.1 0 74.7-26.7 137.4-73 180.1z" />
          </svg>
          Sign In with Google
        </button>
        {/* <button
          type="button"
          onClick={() => signIn("github")}
          className="flex items-center gap-3 bg-black dark:bg-white justify-center text-white dark:text-black"
        >
          <svg className="w-6 h-6 " viewBox="0 0 1024 1024" fill="currentColor">
            <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0138.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" />
          </svg>
          Sign In with Github
        </button> */}
      </div>
    </form>
  );
}

export default SignInForm;
