"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function HerosectionBG() {
  const background = ["HerosectionBG1", "HerosectionBG2", "HerosectionBG3"];

  const [count, setCount] = useState(0);

  function handleClick(idx: number) {
    setCount(idx);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        if (c < 2) {
          return (c += 1);
        } else {
          return 0;
        }
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="absolute left-0 top-0 z-[50] h-full w-full bg-shades-black opacity-30"></div>
      <motion.div
        key={count + 100}
        initial={{ opacity: 0.86 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 0.2,
        }}
        className="absolute bottom-14 left-1/2 z-[50] flex -translate-x-1/2 items-center"
      >
        {background.map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "m-2 h-4 w-4 cursor-pointer rounded-full border-2 border-shades-white",
              count == idx && "bg-shades-white",
            )}
            onClick={() => handleClick(idx)}
          ></div>
        ))}
      </motion.div>
      <motion.div
        key={count}
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
        }}
      >
        <Image
          src={`/${background[count]}.png`}
          fill
          alt="herosection bg"
          className="z-[-1] transition-all"
        />
      </motion.div>
      <div className="absolute left-0 top-0 z-[-200] h-full w-full bg-shades-black"></div>
    </>
  );
}
