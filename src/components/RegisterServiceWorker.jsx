"use client";

import { useEffect } from "react";

/**
 * Registers /sw.js, which is what makes Chrome on Android offer to install the site.
 *
 * Production only: a worker caching responses in front of the dev server makes local
 * changes look like they haven't applied, which is a confusing way to lose an hour.
 * Registration waits for load so it never competes with first paint.
 */
export default function RegisterServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
    if (document.readyState === "complete") {
      register();
      return;
    }
    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
