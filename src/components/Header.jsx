"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Exclude header only on home page
  if (pathname === "/") {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-30"
      style={{
        height: "100px", // Extends slightly below logo area (logo is at top-8 = 32px)
        background: "rgba(0, 0, 0, 0.0)",
        backdropFilter: "blur(8px)",
      }}
    />
  );
}