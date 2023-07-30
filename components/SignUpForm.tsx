"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { signIn } from "next-auth/react";
type Props = {};

function SignUpForm({}: Props) {
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/signUp", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Failed to sign up.");
      setIsLoading(false);
      return;
    }

    toast.success("Sign up successfully.");
    setIsLoading(false);
    router.push("/signIn");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col md:w-[60%] p-6 md:rounded-lg border-2 border-gray-200 shadow-lg space-y-5"
    >
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3">
        Sign Up
      </h1>
      <div className="input">
        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
      </div>
      <div className="input">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
      </div>
      <div className="input">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-20 h-10 mx-auto flex items-center justify-center disabled"
        disabled={isLoading || !data.email || !data.password || !data.name}
      >
        {isLoading ? (
          <svg
            aria-hidden="true"
            className="w-7 h-7 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          "Sign Up"
        )}
      </button>
      <div className="flex items-start gap-2 justify-center">
        <p> Already have an account? </p>
        <Link href={"/signIn"} className="group">
          Sign In!
          <div className="w-0 group-hover:w-full transition-all duration-300 h-1 bg-black rounded-lg" />
        </Link>
      </div>

      <hr className="my-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
        <button
          type="button"
          onClick={() => signIn("google")}
          className="flex items-center gap-3 justify-center"
        >
          <svg
            className="w-6 h-6 text-black dark:text-white"
            viewBox="0 0 1024 1024"
            fill="currentColor"
          >
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm167 633.6C638.4 735 583 757 516.9 757c-95.7 0-178.5-54.9-218.8-134.9C281.5 589 272 551.6 272 512s9.5-77 26.1-110.1c40.3-80.1 123.1-135 218.8-135 66 0 121.4 24.3 163.9 63.8L610.6 401c-25.4-24.3-57.7-36.6-93.6-36.6-63.8 0-117.8 43.1-137.1 101-4.9 14.7-7.7 30.4-7.7 46.6s2.8 31.9 7.7 46.6c19.3 57.9 73.3 101 137 101 33 0 61-8.7 82.9-23.4 26-17.4 43.2-43.3 48.9-74H516.9v-94.8h230.7c2.9 16.1 4.4 32.8 4.4 50.1 0 74.7-26.7 137.4-73 180.1z" />
          </svg>
          Sign In with Google
        </button>
        <button
          type="button"
          onClick={() => signIn("facebook")}
          className="flex items-center justify-center gap-3"
        >
          <svg
            className="w-6 h-6 text-black dark:text-white"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
          </svg>
          Sign In with Facebook
        </button>
      </div>
    </form>
  );
}

export default SignUpForm;
