import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const fontCache = new Map<string, ArrayBuffer>();

async function fetchFont(
  family: string,
  weight: number
): Promise<ArrayBuffer> {
  const key = `${family}-${weight}`;
  const cached = fontCache.get(key);
  if (cached) return cached;

  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+",
      },
    }
  ).then((r) => r.text());

  const match = css.match(/src: url\(([^)]+)\) format\('truetype'\)/);
  if (!match?.[1]) throw new Error(`Font not found: ${family} ${weight}`);

  const data = await fetch(match[1]).then((r) => r.arrayBuffer());
  fontCache.set(key, data);
  return data;
}

async function generateOgImage(opts: {
  filename: string;
  title: string;
  date?: string;
  readingTime?: string;
}) {
  const [geist400, geist700, geistMono400] = await Promise.all([
    fetchFont("Geist", 400),
    fetchFont("Geist", 700),
    fetchFont("Geist Mono", 400),
  ]);

  const subtitle = [opts.date, opts.readingTime].filter(Boolean).join(" · ");

  const svg = await satori(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0a",
        padding: "60px",
        color: "#fafafa",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: "22px",
          fontWeight: 400,
          fontFamily: "Geist",
        }}
      >
        Mohit Yadav
      </div>

      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "52px",
            fontWeight: 700,
            fontFamily: "Geist",
            lineHeight: 1.2,
          }}
        >
          {opts.title}
        </div>

        {subtitle ? (
          <div
            style={{
              display: "flex",
              fontSize: "18px",
              color: "#a1a1a1",
              marginTop: "24px",
              fontFamily: "Geist Mono",
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: geist400, weight: 400, style: "normal" as const },
        { name: "Geist", data: geist700, weight: 700, style: "normal" as const },
        { name: "Geist Mono", data: geistMono400, weight: 400, style: "normal" as const },
      ],
    }
  );

  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();

  const outDir = join(import.meta.dirname!, "..", "public", "og");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, opts.filename), png);
  console.log(`  Generated: public/og/${opts.filename}`);
}

async function main() {
  console.log("Generating OG images...\n");

  await generateOgImage({
    filename: "default.png",
    title: "Developer of Apps, Designer of Products & Lifter of Weights",
  });

  await generateOgImage({
    filename: "leetcode-as-a-disqualifier-for-startups.png",
    title: "Leetcode as a disqualifier for startups",
    date: "February 25, 2026",
    readingTime: "4 min read",
  });

  console.log("\nDone!");
}

main().catch(console.error);
