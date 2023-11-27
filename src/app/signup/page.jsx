"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fname = e.target[0].value;
    const lname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    try {
      const res = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password,
        }),
      });

      if (res.status === 400) {
        setError("This Email is already registered");
      }
      if (res.status === 200) {
        setError("");
        router.push("/signin");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  return (
    <main className="w-full flex justify-center h-screen items-center">
      <div className="w-5/6 md:w-1/4 mx-auto bg-[#899277] border-black border-2 rounded-3xl p-6">
        <h1 className="text-[#333333] text-2xl mb-4 text-center font-bold">Register</h1>
        <form className="flex flex-col space-y-4">

          {/* <label htmlFor="Name" className="text-white text-sm">
            Name
          </label> */}
          <input type="text" placeholder="Name" className="input-field border-[#333333] border-2 rounded-lg bg-[#899277] placeholder-[#333333] h-10 pl-4 shadow-md" />
{/* 
          <label htmlFor="Email" className="text-white text-sm">
            Email
          </label> */}
          <input type="email" placeholder="Email" className="input-field border-[#333333] border-2 rounded-lg bg-[#899277] placeholder-[#333333] h-10 pl-4 shadow-md" />

          {/* <label htmlFor="Password" className="text-white text-sm">
            Password
          </label> */}
          <input type="password" placeholder="Password" className="input-field border-[#333333] border-2 rounded-lg bg-[#899277] placeholder-[#333333] h-10 pl-4 shadow-md" />
          <input type="password" placeholder="Confirm Password" className="input-field border-[#333333] border-2 rounded-lg bg-[#899277] placeholder-[#333333] h-10 pl-4 shadow-md" />
          <button className="bg-[#D5D0B2] text-[#333333] py-2 px-3 rounded-md">Register</button>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <p className="text-[#333333] text-center text-sm">already have an account? <Link href="/signin" className="text-[#333333] text-center text-sm">
            <span className="underline font-bold">Login</span>
          </Link></p>
        </form>
      </div>
    </main>
  );
}
