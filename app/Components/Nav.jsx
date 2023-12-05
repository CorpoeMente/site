"use client";
import React from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import * as Dialog from "@radix-ui/react-dialog";

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 w-screen flex items-center justify-between bg-[#fffffffc] px-[10%] 2xl:px-[15%] h-[70px] z-50 shadow-xl">
      <div className="flex items-center justify-start gap-4 min-w-[50%] lg:min-w-[20%]">
        <img
          src="/logo-primary.svg"
          alt=""
          className="w-16 pointer-events-none"
        />
        <h1 className="text-xl lg:text-xl xl:text-2xl text-primary font-bold  drop-shadow text-center">
          Corpo{" "}
          <span className="text-md lg:text-lg  xl:text-xl font-medium">e</span>{" "}
          Mente
        </h1>
      </div>
      <div className="invisible lg:visible flex items-center justify-between lg:text-md xl:text-lg text-primary font-bold w-2/3 max-w-[630px] 2xl:w-1/3 z-10 gap-x-8 me-[10%]">
        <a href="#departamentos" className="nav-btn">
          Departamentos
        </a>
        <a href="#servicos" className="nav-btn">
          Serviços
        </a>
        <a href="#contato" className="nav-btn">
          Contato
        </a>
        <a
          href="#servicos"
          className="z-10 text-white py-1 px-2 bg-gradient-to-r from-[#4489c1] to-primary rounded-lg shadow-lg hover:from-0% hover:scale-110 transition ease-in-out duration-300"
        >
          Agendamentos
        </a>
      </div>

      <Dialog.Root>
        <Dialog.Trigger className="lg:invisible absolute right-[10%]" asChild>
          <button className="Button violet">
            <RxHamburgerMenu className="lg:invisible text-4xl text-white cursor-pointer bg-primary rounded p-2 w-10 h-10" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent !h-[500px] !w-[400px]">
            <Dialog.Title className="text-2xl font-bold font-urbanist text-center">
              Links
            </Dialog.Title>
            <ul className="flex flex-col items-center justify-center gap-8 list-none mt-24 font-bold text-xl">
              <li>
                <Dialog.Close asChild>
                  <a
                    href="#departamentos"
                    className="nav-btn"
                    aria-label="Close"
                  >
                    Departamentos
                  </a>
                </Dialog.Close>
              </li>
              <li>
                <Dialog.Close asChild>
                  <a href="#servicos" className="nav-btn" aria-label="Close">
                    Serviços
                  </a>
                </Dialog.Close>
              </li>
              <li>
                <Dialog.Close asChild>
                  <a href="/contato" className="nav-btn" aria-label="Close">
                    Contato
                  </a>
                </Dialog.Close>
              </li>
              <li>
                <Dialog.Close asChild>
                  <a
                    href="/agendamento"
                    className="z-10 text-white p-2 bg-gradient-to-r from-[#4489c1] to-primary rounded-lg shadow-lg hover:from-0% hover:scale-110 transition ease-in-out duration-300"
                    aria-label="Close"
                  >
                    Agendamentos
                  </a>
                </Dialog.Close>
              </li>
            </ul>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <RxCross2 className="text-[#f00] text-2xl hover:text-white hover:bg-[#f00] rounded-lg" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </nav>
  );
};

export default Nav;
