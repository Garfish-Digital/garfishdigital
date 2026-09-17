"use client";
import { useEffect, useRef, useState } from "react";

// The fin as it appears in the round favicon: favicon.svg's fin path intersected with
// its r=30 clipping circle, resolved to a single outline so the fill and the traced
// stroke share one edge. Inlined rather than loaded as an image so CSS can drive both.
const FIN = "M2.801 42.657C13.455 41.052 25.928 39.124 29.867 35.223C35.929 29.222 20.288 10.79 27.173 13.219C39.849 17.691 50.161 21.008 59.268 23.414A30 30 0 0 1 2.801 42.657Z";

// The fin rises into the corner just after the wordmark lands, dormant while the name
// is on screen. It warms as the name slides out under the top edge, and the moment the name
// is gone it strikes: a stroke traces the outline while the fill floods cyan. The
// strike plays once per visit; later crossings crossfade, and scrolling back up cools
// it again.
export default function ScrollBrand() {
  const ref = useRef(null);
  const [lit, setLit] = useState(false);
  // "striking" while the first strike plays, "struck" from then on.
  const [strike, setStrike] = useState("");

  useEffect(() => {
    const wordmark = document.querySelector(".hero-wordmark");
    const element = ref.current;
    if (!wordmark || !element) return;
    let frame = 0;
    let wasLit = false;
    function measure() {
      frame = 0;
      const { top, bottom, height } = wordmark.getBoundingClientRect();
      // 0 until the wordmark's top edge leaves the viewport, 1 once its bottom edge
      // has — so the warm-up spans exactly the name's own exit.
      const warmth = height ? Math.min(1, Math.max(0, -top / height)) : 0;
      element.style.setProperty("--brand-warmth", warmth.toFixed(3));
      const isLit = bottom <= 0;
      if (isLit === wasLit) return;
      wasLit = isLit;
      setLit(isLit);
      if (isLit) setStrike((current) => current || "striking");
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(measure);
    }
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const className = ["scroll-brand", lit && "is-lit", strike && `is-${strike}`].filter(Boolean).join(" ");
  return <a ref={ref} className={className} href="#home" aria-label="Garfish Digital">
    <svg viewBox="0 12 60 48" width="60" height="48" aria-hidden="true" focusable="false">
      <path className="brand-base" d={FIN} />
      <path className="brand-lit" d={FIN} />
      <path className="brand-trace" d={FIN} pathLength="1"
        onAnimationEnd={() => setStrike("struck")} />
    </svg>
  </a>;
}
