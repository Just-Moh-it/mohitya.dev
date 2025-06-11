import Link from "next/link";

const XLogo = () => {
  return (
    <svg viewBox="0 0 24 24" className="w-3 h-3 inline-block fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
};

export function Footer() {
  return (
    <footer>
      <hr className="mb-8" />

      <h2 className="text-2xl font-bold mb-8">Feel free to say hi</h2>

      <div className="flex gap-8 font-mono text-sm">
        <Link href="https://x.com/just_moh_it" target="_blank">
          [x] <XLogo />
        </Link>
        <Link href="https://linkedin.com/in/just-moh-it" target="_blank">
          [l] linkedIn
        </Link>
        <Link href="https://github.com/just-moh-it" target="_blank">
          [g] github
        </Link>
      </div>
    </footer>
  );
}
