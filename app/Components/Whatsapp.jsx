"use client";
import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsapp = () => {
  const handleWhatsappRedirect = () => {
    window.open("https://wa.me/");
  };
  return (
    <Tooltip.Provider delayDuration={300}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div
            onClick={handleWhatsappRedirect}
            className="bg-white rounded-full w-16 h-16 fixed right-4 bottom-4 lg:right-12 lg:bottom-12 cursor-pointer hover:scale-110 transition duration-500 large-shadow ease-in-out z-40"
          >
            <FaWhatsapp className="text-4xl text-primary absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-white text-black rounded-xl p-4 large-shadow z-40 relative"
            sideOffset={10}
            align="end"
          >
            Entre em contato no WhatsApp!
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default FloatingWhatsapp;
