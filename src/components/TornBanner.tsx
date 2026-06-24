"use client";

import { motion, useReducedMotion } from "framer-motion";

interface TornBannerProps {
  /** Small italic lead-in word(s), e.g. "Pick your" */
  lead: string;
  /** Big display word, e.g. "CELEBRATION" */
  title: string;
  id?: string;
}

/**
 * Red torn-paper section divider lifted from the pictlens landing page.
 * The PNG has transparent torn edges top and bottom, so the section
 * before/after (page background #FFF6E5) shows through. Sections that
 * follow should pull themselves up under the bottom torn edge with a
 * negative top margin (see `TORN_OVERLAP` classes below).
 */
export const TORN_OVERLAP =
  "-mt-[15vw] pt-[6vw] md:-mt-[8vw] md:pt-[2vw] relative z-10";

export default function TornBanner({ lead, title, id }: TornBannerProps) {
  const reduced = useReducedMotion();
  const letters = title.split("");

  return (
    <section
      id={id}
      className="relative z-20 pointer-events-none -mt-[10vw] md:-mt-[6vw] flex h-[70vw] flex-col items-center justify-center md:h-[53.4vw]"
      style={{
        backgroundImage:
          "url('/webflow/pictlens/images/gallery-header-bg.png')",
        backgroundSize: "110% 100%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="-mt-[3vw] flex flex-col items-center text-center">
        <motion.span
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.5 }}
          className="font-nyghtSerif italic text-white/90 text-[4.5vw] md:text-[2vw]"
        >
          {lead}
        </motion.span>
        <h2
          className="font-morganite font-bold uppercase leading-[0.85] text-white text-[16vw] tracking-[0.04em] md:text-[10vw]"
          aria-label={title}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={`${letter}-${i}`}
              aria-hidden="true"
              className="inline-block"
              initial={
                reduced
                  ? false
                  : {
                      opacity: 0,
                      y: "0.35em",
                      rotateY: 80,
                      filter: "blur(6px)",
                    }
              }
              whileInView={{
                opacity: 1,
                y: 0,
                rotateY: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.55,
                delay: i * 0.045,
                ease: "easeOut",
              }}
            >
              {letter === " " ? " " : letter}
            </motion.span>
          ))}
        </h2>
      </div>
    </section>
  );
}
