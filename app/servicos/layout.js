import { Nav } from "../Components";
import { Footer } from "../Components";

export default function Layout({ children }) {
  return (
    <main className="">
      <Nav />
      {children}
      <Footer />
    </main>
  );
}
