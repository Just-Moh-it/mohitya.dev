import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About - Mohit Yadav" },
      {
        name: "description",
        content:
          "About Mohit Yadav - building things since 10th grade, from founding a company to working with startups and large companies.",
      },
      { property: "og:title", content: "About - Mohit Yadav" },
      {
        property: "og:description",
        content:
          "About Mohit Yadav - building things since 10th grade, from founding a company to working with startups and large companies.",
      },
      { name: "twitter:title", content: "About - Mohit Yadav" },
      {
        name: "twitter:description",
        content:
          "About Mohit Yadav - building things since 10th grade, from founding a company to working with startups and large companies.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
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
        <a
          href="https://harmonic.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-muted-foreground hover:decoration-foreground underline-offset-2"
        >
          Harmonic
        </a>
        ,{" "}
        <a
          href="https://www.livenation.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-muted-foreground hover:decoration-foreground underline-offset-2"
        >
          Live Nation
        </a>
        ,{" "}
        <a
          href="https://viddyoze.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-muted-foreground hover:decoration-foreground underline-offset-2"
        >
          Viddyoze
        </a>
        ,{" "}
        <a
          href="https://designstripe.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-muted-foreground hover:decoration-foreground underline-offset-2"
        >
          Design Stripe (Now Visual)
        </a>
        ,{" "}
        <a
          href="https://adcreative.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-muted-foreground hover:decoration-foreground underline-offset-2"
        >
          Adcreative.ai
        </a>
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
        Based in Austin, Texas, I&apos;m working on a new startup. In my free
        time, I build tools and products that address real-world problems. 2025
        is my year of focused building and shipping.
      </p>
    </div>
  );
}
