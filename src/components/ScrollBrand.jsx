"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ScrollBrand() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const home = document.getElementById("home");
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(home);
    return () => observer.disconnect();
  }, []);
  return <div className={`scroll-brand${visible ? " is-visible" : ""}`} aria-hidden="true">
    <Image src="/Garfish-circle-logo.svg" width={40} height={40} alt="" />
  </div>;
}
