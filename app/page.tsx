import Link from "next/link";
import LocationLine from "~/components/location";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-xl mx-auto px-6 py-16">
        {/* Header Section */}
        <section className="mb-16">
          <h1 className="text-4xl/snug font-bold text-gray-900 mb-6">
            Hi, I&apos;m Mohit
          </h1>

          <LocationLine />

          <div className="space-y-4 text-gray-700 text-lg leading-relaxed max-w-2xl">
            <p>
              I&apos;m a 20y/o building things I find cool on the internet. I
              love building things and solving problems.
            </p>
            <p>This is my place on the web for sharing things.</p>
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-16">
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

          {/* Project Placeholders */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="aspect-square border-2 border-gray-300 rounded-lg bg-gray-50"></div>
            <div className="aspect-square border-2 border-gray-300 rounded-lg bg-gray-50"></div>
            <div className="aspect-square border-2 border-gray-300 rounded-lg bg-gray-50"></div>
          </div> */}
        </section>

        {/* Contact Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Reach out to me
          </h2>

          <div className="flex gap-8">
            <Link
              href="https://x.com/just_moh_it"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              target="_blank"
            >
              X
            </Link>
            <Link
              href="https://linkedin.com/in/just-moh-it"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              target="_blank"
            >
              LinkedIn
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
