"use client";

import React from "react";
import { NextAuthProvider } from "../../Provider";
import { signOut } from "next-auth/react";

const page = () => {
  signOut(
    {
      callbackUrl: "/login",
    },
    { redirect: false }
  );
  return;
};

export default page;
