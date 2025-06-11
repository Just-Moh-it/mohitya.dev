"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="font-mono">
      <div className="flex justify-between items-center">
        <Link href="/" className="grid gap-3">
          <Image
            src="https://avatars.githubusercontent.com/just-moh-it"
            alt="Mohit Yadav"
            width={40}
            height={40}
            className="rounded-full size-10 hover:scale-110 transition-all"
          />

          <h3>Mohit Yadav</h3>
        </Link>

        <nav className="flex gap-6 text-sm self-end">
          <Link
            href="/"
            className="data-[state=inactive]:text-muted-foreground"
            data-state={pathname === "/" ? "active" : "inactive"}
          >
            [h] home
          </Link>
          <Link
            href="/about"
            className="data-[state=inactive]:text-muted-foreground"
            data-state={pathname === "/about" ? "active" : "inactive"}
          >
            [a] about
          </Link>
        </nav>
      </div>
    </header>
  );
}
