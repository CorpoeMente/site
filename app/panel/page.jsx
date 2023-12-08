import { authOptions } from "../utils/auth";
import { getServerSession } from "next-auth";
import { SidePanel } from "../Components";
export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  return (
    // <main className="mx-auto mt-4 max-w-5xl px-6">
    //   <h2>
    //     {session !== null && (
    //       <p className="text-4xl font-semibold">Hi {session?.user.name}!</p>
    //     )}
    //   </h2>
    //   <a href="/logout">Log Out</a>
    // </main>
    <main className="flex items-center justify-between">
      <SidePanel />
      <main className="w-4/5 h-screen bg-white"></main>
    </main>
  );
}
