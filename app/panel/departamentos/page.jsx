import {
  SidePanel,
  DepartamentosList,
  NovoDepartamento,
} from "../../Components";

export default function page() {
  return (
    <main className="flex items-center justify-between">
      <SidePanel />
      <main className="w-full h-screen flex flex-col items-center justify-start bg-white p-12">
        <NovoDepartamento />
        <DepartamentosList />
      </main>
    </main>
  );
}
