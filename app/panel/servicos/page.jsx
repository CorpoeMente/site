import { SidePanel, ServicosList } from "../../Components";

export default function page() {
  return (
    <main className="flex items-center justify-between">
      <SidePanel />
      <main className="w-full h-screen bg-white p-12">
        <ServicosList />
      </main>
    </main>
  );
}
