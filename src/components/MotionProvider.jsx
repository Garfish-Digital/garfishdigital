"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user": when the visitor's OS has "reduce motion" enabled,
// framer-motion disables transform/position animations but keeps opacity
// fades. No behavior change for anyone else.
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
