import Link from "next/link";
import { site, nav } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-10">
      <div className="container-x flex flex-col gap-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {year} 정률</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="transition-colors hover:text-fg">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-xs">수록된 영상의 저작권은 각 권리자에게 있습니다.</p>
      </div>
    </footer>
  );
}
