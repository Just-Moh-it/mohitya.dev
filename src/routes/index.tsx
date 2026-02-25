import { createFileRoute } from "@tanstack/react-router";
import LocationLine from "~/components/location";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main>
      <section className="mb-8">
        <h1 className="text-4xl/snug tracking-tight font-bold mb-6">
          Developer of Apps, Designer of Products & Lifter of Weights
        </h1>

        <LocationLine />

        <p className="text-base/relaxed mb-4">
          I&apos;m a 20y/o building things I find cool on the internet. I love
          making things and solving problems.
        </p>
        <p className="text-base/relaxed">
          This is my place on the web for sharing things (🚧 as of Jun 10, 2025)
        </p>
      </section>
    </main>
  );
}
