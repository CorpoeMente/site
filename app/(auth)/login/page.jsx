import React from "react";
import Form from "./form";
import { NextAuthProvider } from "../../Provider";

const page = () => {
  return (
    <NextAuthProvider>
      <div className="w-screen h-screen  flex flex-col items-center justify-center">
        <Form />
      </div>
    </NextAuthProvider>
  );
};

export default page;
