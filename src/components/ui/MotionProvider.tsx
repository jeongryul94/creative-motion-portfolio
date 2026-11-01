"use client";

import { MotionConfig } from "motion/react";

/** 사용자의 prefers-reduced-motion 설정을 모든 모션에 적용합니다. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
