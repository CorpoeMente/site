import React from "react";
import { SidePanel, MensagensList } from "@/app/Components";

const page = () => {
  return (
    <div className="flex items-center justify-center">
      <SidePanel />

      <div className="flex flex-col items-center justify-center w-screen">
        <h1 className="text-4xl font-semibold">Mensagens</h1>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <MensagensList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
