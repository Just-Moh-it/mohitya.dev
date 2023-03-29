"use client";

import { FC, ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import classNames from "classnames";
import { motion } from "framer-motion";
// Icons
import HomeIcon from "../assets/icons/nav/home.svg";
import WritingsIcon from "../assets/icons/nav/pen.svg";
import ExperimentsIcon from "../assets/icons/nav/magicpen.svg";
import GuestbookIcon from "../assets/icons/nav/people.svg";
import ContactIcon from "../assets/icons/nav/callcalling.svg";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <motion.nav
      initial={{ opacity: 0, bottom: 0 }}
      animate={{ opacity: 100, bottom: 48 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="fixed -translate-x-1/2 left-1/2 flex gap-1.5 p-1.5 rounded-2xl ring-inset ring-1 ring-white/5 bg-white/5 backdrop-blur-md"
    >
      <NavButton href="/">
        <HomeIcon />
      </NavButton>
      <NavButton href="/writings">
        <WritingsIcon />
      </NavButton>
      <NavButton href="/experiments">
        <ExperimentsIcon />
      </NavButton>
      <NavButton href="/guestbook">
        <GuestbookIcon />
      </NavButton>
      <NavButton href="/contact">
        <ContactIcon />
      </NavButton>
    </motion.nav>
  );
};

const NavButton = ({
  children,
  ...props
}: { children?: ReactNode } & LinkProps) => {
  const pathname = usePathname();

  const isActive = useMemo(
    () => pathname.startsWith(props.href as string),
    [pathname, props.href]
  );

  return (
    <Link
      className={classNames(
        "flex w-12 h-12 items-center justify-center rounded-[10px] relative z-10 backdrop-blur-md",
        {
          "ring-inset ring-1 ring-white/5 bg-[#ffffff02] shadow-[0px_2px_10px_rgba(165,_165,_165,_0.1)] ":
            isActive,
        }
      )}
      {...props}
    >
      {/* Dot */}
      {isActive && (
        <svg
          width={3}
          height={3}
          viewBox="0 0 3 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
          className="absolute left-1/2 bottom-1.5 -translate-x-1/2"
        >
          <circle cx="1.43054" cy="1.18628" r="0.980835" fill="#D9D9D9" />
        </svg>
      )}
      {children}
    </Link>
  );
};

export default Navbar;
