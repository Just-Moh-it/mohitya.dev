import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import {
  writeFileSync,
  readFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
  unlinkSync,
} from "fs";
import { join } from "path";
import { createHash } from "crypto";

const ROOT = join(import.meta.dirname!, "..");
const OUT_DIR = join(ROOT, "public", "og");
const MANIFEST_PATH = join(ROOT, ".og-manifest.json");
const IS_CI = !!(process.env.CI || process.env.VERCEL_ENV);

// ---------------------------------------------------------------------------
// Manifest types
// ---------------------------------------------------------------------------

type OgInputs = {
  filename: string;
  title: string;
  date?: string;
  readingTime?: string;
};

type ManifestEntry = {
  filename: string;
  inputs: Omit<OgInputs, "filename">;
  hash: string;
};

type Manifest = {
  version: 1;
  images: ManifestEntry[];
};

function hashInputs(inputs: Omit<OgInputs, "filename">): string {
  return createHash("sha256")
    .update(JSON.stringify(inputs))
    .digest("hex")
    .slice(0, 16);
}

function readManifest(): Manifest | null {
  if (!existsSync(MANIFEST_PATH)) return null;
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
  } catch {
    return null;
  }
}

function writeManifest(manifest: Manifest) {
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
}

// ---------------------------------------------------------------------------
// OG image definitions — add new entries here
// ---------------------------------------------------------------------------

const OG_IMAGES: OgInputs[] = [
  {
    filename: "default.png",
    title: "Developer of Apps, Designer of Products & Lifter of Weights",
  },
  {
    filename: "leetcode-as-a-disqualifier-for-startups.png",
    title: "Leetcode as a disqualifier for startups",
    date: "February 25, 2026",
    readingTime: "4 min read",
  },
];

// ---------------------------------------------------------------------------
// Font loading
// ---------------------------------------------------------------------------

const fontCache = new Map<string, ArrayBuffer>();

async function fetchFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer> {
  const key = `${family}-${weight}`;
  const cached = fontCache.get(key);
  if (cached) return cached;

  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/10.0.9.2372 Mobile Safari/537.10+",
      },
    },
  ).then((r) => r.text());

  const match = css.match(/src: url\(([^)]+)\) format\('truetype'\)/);
  if (!match?.[1]) throw new Error(`Font not found: ${family} ${weight}`);

  const data = await fetch(match[1]).then((r) => r.arrayBuffer());
  fontCache.set(key, data);
  return data;
}

// ---------------------------------------------------------------------------
// Image rendering
// ---------------------------------------------------------------------------

const LOGO_PATH = join(ROOT, "public", "android-chrome-512x512.png");

let logoDataUrl: string | null = null;
function getLogoDataUrl(): string {
  if (logoDataUrl) return logoDataUrl;
  const buf = readFileSync(LOGO_PATH);
  logoDataUrl = `data:image/png;base64,${buf.toString("base64")}`;
  return logoDataUrl;
}

async function renderOgImage(opts: OgInputs): Promise<Buffer> {
  const [geist400, geist700, geistMono400] = await Promise.all([
    fetchFont("Geist", 400),
    fetchFont("Geist", 700),
    fetchFont("Geist Mono", 400),
  ]);

  const subtitle = [opts.date, opts.readingTime].filter(Boolean).join(" · ");
  const logo = getLogoDataUrl();

  const svg = await satori(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#0a0a0a",
        color: "#fafafa",
      }}
    >
      {/* Main area — 80% height, bottom border, padded to center content at 80% width */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "80%",
          borderBottom: "1px solid #333",
          padding: "60px 120px 40px",
        }}
      >
        <img
          src={logo}
          width={80}
          height={80}
          style={{ borderRadius: "14px" }}
        />

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "73px",
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
                fontSize: "25px",
                color: "#a1a1a1",
                marginTop: "24px",
                fontFamily: "Geist Mono",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Geist", data: geist400, weight: 400, style: "normal" as const },
        { name: "Geist", data: geist700, weight: 700, style: "normal" as const },
        {
          name: "Geist Mono",
          data: geistMono400,
          weight: 400,
          style: "normal" as const,
        },
      ],
    },
  );

  const resvg = new Resvg(svg);
  return Buffer.from(resvg.render().asPng());
}

// ---------------------------------------------------------------------------
// Orphan cleanup
// ---------------------------------------------------------------------------

const expectedFiles = new Set(OG_IMAGES.map((img) => img.filename));

function cleanupOrphans(): string[] {
  if (!existsSync(OUT_DIR)) return [];
  const removed: string[] = [];
  for (const file of readdirSync(OUT_DIR)) {
    if (!file.endsWith(".png")) continue;
    if (expectedFiles.has(file)) continue;
    unlinkSync(join(OUT_DIR, file));
    removed.push(file);
    console.log(`  🗑 removed orphan public/og/${file}`);
  }
  return removed;
}

// ---------------------------------------------------------------------------
// Reconciliation
// ---------------------------------------------------------------------------

async function main() {
  const existing = readManifest();
  const existingByFilename = new Map(
    existing?.images.map((e) => [e.filename, e]) ?? [],
  );

  const nextManifest: Manifest = { version: 1, images: [] };
  const toGenerate: OgInputs[] = [];

  for (const img of OG_IMAGES) {
    const { filename, ...inputs } = img;
    const hash = hashInputs(inputs);
    const prev = existingByFilename.get(filename);
    const imageExists = existsSync(join(OUT_DIR, filename));

    if (prev?.hash === hash && imageExists) {
      nextManifest.images.push(prev);
    } else {
      toGenerate.push(img);
      nextManifest.images.push({ filename, inputs, hash });
    }
  }

  const orphans = cleanupOrphans();

  if (toGenerate.length === 0) {
    if (orphans.length === 0) {
      console.log("OG images up to date — nothing to generate.");
    }
    writeManifest(nextManifest);
    return;
  }

  if (IS_CI) {
    console.error(
      `\n✗ OG images are stale or missing — ${toGenerate.length} image(s) need regeneration:\n`,
    );
    for (const img of toGenerate) {
      console.error(`  - public/og/${img.filename}`);
    }
    console.error(
      "\nRun `bun run generate-og` locally and commit the results.\n",
    );
    process.exit(1);
  }

  mkdirSync(OUT_DIR, { recursive: true });

  console.log(
    `Generating ${toGenerate.length}/${OG_IMAGES.length} OG image(s)...\n`,
  );

  for (const img of toGenerate) {
    const png = await renderOgImage(img);
    writeFileSync(join(OUT_DIR, img.filename), png);
    console.log(`  ✓ public/og/${img.filename}`);
  }

  writeManifest(nextManifest);
  console.log(`\nManifest written to .og-manifest.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
