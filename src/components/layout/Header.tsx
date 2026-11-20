"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  // 스크롤에 따라 배경을 채우고, 아래로 빠르게 내릴 때는 헤더를 숨깁니다.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > lastY.current + 4);
      if (y < lastY.current - 4) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        solid ? "border-b border-line/80 bg-ink/85 text-fg backdrop-blur-xl" : "border-b border-transparent",
        // 홈 첫 화면은 영상 위라서 흰 글씨
        !solid && pathname === "/" ? "text-white" : "text-fg",
      ].join(" ")}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-[4.5rem]">
        <Link href="/" className="flex items-baseline gap-2" aria-label={`${site.name} 홈`}>
          <span className="text-lg font-extrabold tracking-[-0.04em]">정률</span>
          <span className="hidden text-sm text-current opacity-60 sm:inline">영상 · 모션 · 자동화</span>
        </Link>

        <nav aria-label="주 메뉴" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative py-2 text-[15px] opacity-80 transition-opacity hover:opacity-100"
                >
                  {item.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-lime transition-transform duration-500 ease-out group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact"
                className="rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-85"
              >
                연락하기
              </Link>
            </li>
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 grid size-11 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="모바일 메뉴"
            className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] bg-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="container-x flex flex-col gap-1 pt-8">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-baseline justify-between border-b border-line py-4 text-4xl"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="container-x mt-10 text-sm text-muted">{site.contact.email}</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
