import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="">
      <h1 className="text-3xl/snug font-bold mb-4">About me</h1>
      <p className="mb-6 text-base/relaxed">
        I&apos;ve been building things since 10th grade. I started by founding a
        student-focused company where I learned extensively about branding,
        marketing, development, and hiring/team building. Since then, I&apos;ve
        had the privilege of working with incredible people at both startups and
        large companies.
      </p>

      <h2 className="text-2xl font-bold mb-2">How it started</h2>
      <p className="mb-6 text-base/relaxed">
        My journey began with design work for a small non-profit, followed by
        various hackathon projects. Some found success beyond the events, with
        one reaching 150k users. This led to opportunities with companies like{" "}
        <Link
          href="https://harmonic.ai"
          target="_blank"
          className="underline decoration-muted-foreground hover:decoration-foreground underline-offset-2"
        >
          Harmonic
        </Link>
        ,{" "}
        <Link
          href="https://www.livenation.com/"
          target="_blank"
          className="underline decoration-muted-foreground hover:decoration-foreground underline-offset-2"
        >
          Live Nation
        </Link>
        ,{" "}
        <Link
          href="https://viddyoze.com/"
          target="_blank"
          className="underline decoration-muted-foreground hover:decoration-foreground underline-offset-2"
        >
          Viddyoze
        </Link>
        ,{" "}
        <Link
          href="https://designstripe.com/"
          target="_blank"
          className="underline decoration-muted-foreground hover:decoration-foreground underline-offset-2"
        >
          Design Stripe (Now Visual)
        </Link>
        ,{" "}
        <Link
          href="https://adcreative.ai/"
          target="_blank"
          className="underline decoration-muted-foreground hover:decoration-foreground underline-offset-2"
        >
          Adcreative.ai
        </Link>
        , and others.
      </p>

      <p className="mb-6 text-base/relaxed">
        With my early career earnings, I completed high school, took a gap year,
        and relocated from India to the US for college. This journey has
        transformed my life, and I remain grateful for these opportunities.
      </p>

      <p className="mb-6 text-base/relaxed">
        Beyond mid-2024, I helped build a new B2B SaaS startup as the CTO, while
        our team grew from 2 to 10. We raised over $7M in funding after working
        on it for about six months. After a year of focused building, I
        ultimately had to part ways.
      </p>

      <h2 className="text-2xl font-bold mb-2">What I&apos;m doing now</h2>
      <p className="mb-8 text-base/relaxed">
        Based in Austin, Texas, I&apos;m working on a new startup while taking
        on select client projects. In my free time, I build tools and products
        that address real-world problems. 2025 is my year of focused building
        and shipping.
      </p>
    </div>
  );
}
