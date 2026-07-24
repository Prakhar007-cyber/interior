import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

/** Layout for all public marketing pages: nav, footer and floating contact. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="top">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
