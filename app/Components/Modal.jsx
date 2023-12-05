"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaTimes } from "react-icons/fa";

const Modal = ({ buttonText, title, children }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="text-white bg-gradient-45 from-[#225690] to-primary font-bold mt-auto lg:mt-auto py-2 lg:py-4 text-xl px-4 lg:px-32 rounded-lg shadow-lg hover:from-0% hover:scale-110 transition ease-in-out duration-300">
          {buttonText}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="backdrop-blur bg-[#00000020] z-40 fixed top-0 left-0 bottom-0 right-0" />
        <Dialog.Content className="bg-white w-[800px] h-[800px] rounded-xl shadow-xl z-40 fixed left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-40 p-8">
          <Dialog.Title className="text-2xl text-primary font-bold font-urbanist mb-12">
            {title}
          </Dialog.Title>

          {children}
          <Dialog.Close asChild>
            <button
              className="text-[#000] absolute top-6 right-6 hover:scale-150 transition duration-300 ease-in-out"
              aria-label="Close"
            >
              <FaTimes />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
