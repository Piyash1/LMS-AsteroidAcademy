import Navbar from "./_components/Navbar";
import { Footer } from "@/components/general/Footer";

export default function LayoutPublic({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 lg:px-8 mb-32">
        {children}
      </main>
      <Footer />
    </div>
  );
}
