import Image from "next/image";
import Hero from "./components/Hero";
import Newest from "./components/Newest";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <Hero />
      <Newest />
    </div>
  );
}
// Modified on 2025-02-19 00:50:47
// Modified on 2025-02-19 00:52:37
