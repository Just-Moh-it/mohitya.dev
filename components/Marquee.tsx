"use client";

import { useRef, useEffect, ReactNode } from "react";
import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import useRafLoop from "@/utils/hooks/useRafLoop";
import { useWindowSize } from "usehooks-ts";
import classNames from "classnames";

const _ = {
  speed: 1,
  threshold: 0.014,
};

const MarqueeItem = ({
  children,
  speed,
}: {
  children?: ReactNode;
  speed: MotionValue<any>;
}) => {
  const item = useRef<HTMLDivElement | null>(null);
  const rect = useRef<{ width?: number; height?: number }>({});
  const x = useRef(0);

  const { width, height } = useWindowSize();

  const setX = () => {
    if (
      !item.current ||
      !rect.current ||
      !rect.current.width ||
      !rect.current.height
    )
      return;
    const xPercentage = (x.current / rect.current.width) * 100;
    if (xPercentage < -100) x.current = 0;
    if (xPercentage > 0) x.current = -rect.current.width;
    item.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;

    // if (x.current < -rect.current.width) x.current = 0;
    // if (x.current > 0) x.current = -rect.current.width;
    // item.current.style.transform = `translate3d(${x.current}px, 0, 0)`;
  };

  useEffect(() => {
    if (!item.current) return;

    rect.current = item.current.getBoundingClientRect();
  }, [width, height]);

  // const buffer = useRef(0);
  const loop: FrameRequestCallback = (e) => {
    x.current -= speed.get();
    setX();

    // const delta = (e - buffer.current) / 1000;
    // const c = Math.max(1 / 60 / delta, 1);
    // buffer.current = e;
    // x.current -= speed.get() / c;
    // setX();
  };

  useRafLoop(loop, true);

  return (
    <div
      ref={item}
      className="text-lg text-[#666666] italic font-medium flex gap-2 uppercase"
    >
      {children}
    </div>
  );
};

const Marquee = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  const marquee = useRef(null);

  const x = useRef(0);
  let innerW: number = 0;
  if (typeof window !== "undefined") innerW = window.innerWidth;

  const w = useRef(innerW).current;

  const speed = useSpring(_.speed, {
    damping: 40,
    stiffness: 90,
    mass: 5,
  });

  const loop = () => {
    x.current *= 0.66;
    if (x.current < 0) {
      x.current = Math.min(x.current, 0);
    } else {
      x.current = Math.max(x.current, 0);
    }
    speed.set(_.speed + x.current);
  };

  useRafLoop(loop, true);

  return (
    <>
      <motion.div
        className={classNames("flex items-center gap-2", className)}
        ref={marquee}
      >
        <MarqueeItem speed={speed}>{children}</MarqueeItem>
        <MarqueeItem speed={speed}>{children}</MarqueeItem>
        <MarqueeItem speed={speed}>{children}</MarqueeItem>
        <MarqueeItem speed={speed}>{children}</MarqueeItem>
        <MarqueeItem speed={speed}>{children}</MarqueeItem>
      </motion.div>
    </>
  );
};

export default Marquee;
