import { SidePanel, ServicosList, NovoServico } from "../../Components";

export default function page() {
  return (
    <main className="flex items-center justify-between">
      <SidePanel />
      <main className="w-full h-screen flex flex-col items-start justify-start bg-white p-12">
        <NovoServico />
        <ServicosList />
      </main>
    </main>
  );
}
