import { Link, useRouterState } from "@tanstack/react-router";

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="font-mono">
      <div className="flex justify-between items-center">
        <Link to="/" className="grid gap-3">
          <img
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
            to="/"
            className="data-[state=inactive]:text-muted-foreground"
            data-state={pathname === "/" ? "active" : "inactive"}
          >
            [h] home
          </Link>
          <Link
            to="/about"
            className="data-[state=inactive]:text-muted-foreground"
            data-state={pathname === "/about" ? "active" : "inactive"}
          >
            [a] about
          </Link>
          <Link
            to="/blog"
            className="data-[state=inactive]:text-muted-foreground"
            data-state={pathname.startsWith("/blog") ? "active" : "inactive"}
          >
            [b] blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
