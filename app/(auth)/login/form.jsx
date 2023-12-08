"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, redirect } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { Input } from "../../Components";

const Form = () => {
  const session = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  const formSubmit = (e) => {
    e.preventDefault();
    setError("");

    const email = e.target[0];
    const password = e.target[1];

    signIn("credentials", {
      email: email.value,
      password: password.value,
    });
  };
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/panel");
    }
  }, [session.status, router]);
  return (
    <form
      onSubmit={formSubmit}
      className={` flex justify-center items-center flex-col gap-y-8 px-6 py-12 shadow-[0_0px_40px_-5px_rgba(0,0,0,0.3)] rounded-md w-full max-w-[400px]`}
    >
      <a href="/" className="flex flex-col items-center justify-center w-full">
        <img
          src="/logo-primary.svg"
          alt="Logo do Espaço Clínico Corpo e Mente"
          className="w-20"
        />
        <h1 className="text-2xl font-bold text-primary mt-2">Corpo e Mente</h1>
      </a>

      <Input type="email" label="Email" name="email" required={true} />
      <Input type="password" label="Password" name="password" required={true} />
      <button className="bg-primary hover:bg-secondary w-full max-w-[400px] py-3 rounded-lg text-white font-bold text-xl  transition duration-300 ease-in-out mt-6">
        Log In
      </button>
      {error && (
        <small className="block w-full px-2 text-red-600">{error}</small>
      )}
    </form>
  );
};

export default Form;
