import LocationLine from "~/components/location";

export default function Home() {
  return (
    <main>
      {/* Header Section */}
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

      {/* Projects Section */}
      {/* <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Projects</h2>

        <div className="mb-6">
          <Link
            href="https://mohi.tools"
            className="text-lg font-semibold transition-colors underline decoration-2 underline-offset-4"
            target="_blank"
          >
            Mohi.tools
          </Link>
          <p className="text-gray-600 mt-2">
            2025 • A collection of common tools on the internet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="aspect-square border-2 border-gray-300 rounded-lg bg-gray-50"></div>
          <div className="aspect-square border-2 border-gray-300 rounded-lg bg-gray-50"></div>
          <div className="aspect-square border-2 border-gray-300 rounded-lg bg-gray-50"></div>
        </div>
      </section> */}
    </main>
  );
}
