"use client";

import { useEffect, useState, useRef, Fragment } from "react";
import { motion, Variants, useInView } from "framer-motion";

// --- Animation Constants ---
const LETTER_ANIMATION_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;
const SENTENCE_VISIBLE_DURATION = 5000;
const SENTENCE_FADE_OUT_DURATION = 0.25;

interface TypewriterProps {
  sentences: string[];
}

const Typewriter = ({ sentences }: TypewriterProps) => {
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [animationState, setAnimationState] = useState("hidden");

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setAnimationState("visible");
    }
  }, [isInView]);

  const handleAnimationComplete = (definition: "visible" | "hidden") => {
    if (definition === "visible") {
      setTimeout(() => {
        setAnimationState("hidden");
      }, SENTENCE_VISIBLE_DURATION);
    } else if (definition === "hidden") {
      setSentenceIndex((prev) => (prev + 1) % sentences.length);
      setAnimationState("visible");
    }
  };

  const containerVariants: Variants = {
    visible: { opacity: 1 },
    hidden: {
      opacity: 0,
      transition: { duration: SENTENCE_FADE_OUT_DURATION, ease: "easeIn" },
    },
  };

  const currentText = sentences[sentenceIndex];
  const words = currentText.split(" ");
  let charCount = 0;

  return (
    <motion.div
      ref={ref}
      key={sentenceIndex}
      variants={containerVariants}
      initial="hidden"
      animate={animationState}
      onAnimationComplete={handleAnimationComplete}
      className="flex flex-wrap justify-center"
    >
      {words.map((word, wordIndex) => {
        const characters = Array.from(word);
        const wordElement = (
          <Fragment key={`word-${wordIndex}`}>
            {/* This span wraps each word and prevents it from breaking */}
            <span className="inline-block whitespace-nowrap">
              {characters.map((char, charIndex) => {
                const globalCharIndex = charCount + charIndex;
                return (
                  <motion.span
                    key={`${char}-${globalCharIndex}`}
                    className="relative inline-block"
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: globalCharIndex * LETTER_ANIMATION_DELAY,
                        duration: 0,
                      }}
                    >
                      {char}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{
                        delay: globalCharIndex * LETTER_ANIMATION_DELAY,
                        duration: BOX_FADE_DURATION,
                        times: [0, 0.1, 1],
                        ease: "easeInOut",
                      }}
                      className="absolute bottom-[3px] left-[-1px] right-0 top-[3px] bg-foreground"
                    />
                  </motion.span>
                );
              })}
            </span>
            {/* Render a non-breaking space between words */}
            {wordIndex < words.length - 1 ? <span>&nbsp;</span> : null}
          </Fragment>
        );
        charCount += characters.length + 1; // Increment count for characters + space
        return wordElement;
      })}
    </motion.div>
  );
};

export default Typewriter;