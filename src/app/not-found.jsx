import Image from "next/image";
import Link from "next/link";

// Renders as "Garfish Digital | Page not found" via the root title template.
export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <main className="page-width" style={{ minHeight: "100svh", paddingTop: "15vh", paddingBottom: "15vh" }}>
    <Image src="/garfish-logo-stacked-white.svg" alt="Garfish Digital" width={180} height={94} />
    <p className="eyebrow" style={{ marginTop: 80 }}>404</p>
    <h1 style={{ fontSize: "clamp(40px, 8vw, 80px)", letterSpacing: "-.05em" }}>Nothing here.</h1>
    <Link href="/" className="garfish-button" style={{ display: "inline-block", marginTop: 32 }}>Back to Garfish Digital</Link>
  </main>;
}
