import Marquee from "@/components/Marquee";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

// Icons
import GitHubIcon from "@/assets/icons/tabler/github.svg";
import DiscordIcon from "@/assets/icons/tabler/discord.svg";
import LinkedinIcon from "@/assets/icons/tabler/linkedin.svg";
import TwitterIcon from "@/assets/icons/tabler/twitter.svg";
import AnimatedChevronsIcon from "@/assets/icons/chevrons-right.svg";
import pfpHeroHomeImage from "@/public/pfp-hero-home.png";

export default function HomePage() {
  return (
    <main className="pb-36">
      <Script src="/landing-animation/compositions.js" defer />
      <Script src="/landing-animation/animators.js" defer />
      <Script src="/landing-animation/sketch_flash.js" defer />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js" />

      {/* Absolute top Section */}
      <div className="max-w-screen overflow-hidden w-full select-none">
        <div
          className="-z-10 w-[794.38px] h-[388.41px] absolute left-[352.9px] top-[-111.71px] [mask-image:radial-gradient(72.45%_72.45%_at_72.98%_27.55%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)]"
          style={{
            background:
              "linear-gradient(92.91deg, rgba(241,241,241,0.15) 2.93%, rgba(239,239,239,0) 98.33%)",
          }}
        />
        <Marquee className="-z-10 [mask-image:radial-gradient(41.07%_37990.18%_at_50%_50%,_#FFFFFF_0%,_rgba(255,_255,_255,_0)_100%)] absolute top-10 inset-x-0">
          <div>Design</div>
          <div>·</div>
          <div>Create</div>
          <div>·</div>
          <div>Develop</div>
          <div>·</div>
          <div>Repeat</div>
          <div>·</div>
        </Marquee>
      </div>

      <div className="flex flex-col gap-20 pt-32 w-full items-stretch max-w-screen">
        {/* Hero Section */}
        <div className="flex flex-col gap-9 max-w-2xl px-6 self-center">
          <h1 className="bg-clip-text bg-gradient-to-b text-[52px] leading-[110%] font-bold items-stretch from-white to-white/60 text-transparent">
            Hey! I&apos;m
            <Image
              src={pfpHeroHomeImage}
              alt="Mohit's Profile Picture"
              className="inline-block relative -top-2 mx-4 rounded-full"
              width={45}
              height={45}
              placeholder="blur"
            />
            Mohit, the guy who loves creating awesome apps
            <Link
              href="/about"
              className="inline-flex text-[16px] leading-[130%] font-medium text-white rounded-full items-center justify-center gap-2 px-6 py-2.5 border border-white ml-6 relative -top-2 group about-me"
            >
              <span>About me</span>
              <AnimatedChevronsIcon className="[&_#first]:hidden group-hover:[&_*]:visible" />
            </Link>
          </h1>

          <p className="max-w-xl text-lg leading-[170%] text-[#666666]">
            I&apos;m sort of all over the place&#8211;a designer, a programmer, an
            entrepreneur and (kind of) a visionary.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="https://twitter.com/Just_Moh_it/"
              target="_blank"
              referrerPolicy="no-referrer"
              className="text-[#666666] hover:text-white transition-colors ease-in-out"
            >
              <TwitterIcon />
            </Link>
            <Link
              href="https://github.com/Just-Moh-it/"
              target="_blank"
              referrerPolicy="no-referrer"
              className="text-[#666666] hover:text-white transition-colors ease-in-out"
            >
              <GitHubIcon />
            </Link>
            <Link
              href="https://linkedin.com/in/just-moh-it/"
              target="_blank"
              referrerPolicy="no-referrer"
              className="text-[#666666] hover:text-white transition-colors ease-in-out"
            >
              <LinkedinIcon />
            </Link>
            <Link
              href="https://discordapp.com/users/616199379530940426"
              target="_blank"
              referrerPolicy="no-referrer"
              className="text-[#666666] hover:text-white transition-colors ease-in-out"
            >
              <DiscordIcon />
            </Link>
          </div>
        </div>

        {/* Illustration Section */}
        <div
          id="canvasContainer"
          className="w-full bg-white h-80 [mask-image:linear-gradient(90.2deg,_rgba(255,_255,_255,_0)_4.3%,_#FFFFFF_51.02%,_rgba(255,_255,_255,_0)_94.63%)]"
        />
      </div>
    </main>
  );
}
