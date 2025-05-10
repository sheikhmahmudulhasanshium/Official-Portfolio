// src/components/slides/Slide.tsx
import { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { formatIsoDate } from "@/hooks/format-timeline";
import { ExpandIcon, Github, Globe, Scan } from "lucide-react"; // Ensure Scan is imported
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, Transition, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react"; // MODIFIED: Added useEffect
import ExpandedSlide from "./expanded-slide";

interface SlideProps {
  project: Project;
  index: number;
}

// --- Animation Variants (Kept as they are) ---
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 }, // Adjusted initial scale
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15, // Slightly faster delay
      duration: 0.5,  // Slightly faster duration
      ease: "easeOut",
      when: "beforeChildren",
      delayChildren: 0.2, // Adjusted
      staggerChildren: 0.1, // Adjusted
    },
  }),
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.4, // Adjusted
    },
  },
};

const tagsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05, // Adjusted
            delayChildren: 0.1,
        },
    },
}

const tagItemVariants: Variants = {
    hidden: { scale: 0.5, opacity: 0, y: 10 },
    visible: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 15,
        }
    },
}

const cardHoverEffect = {
  scale: 1.03,
  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.25)", // Slightly enhanced shadow
  transition: { type: "spring", stiffness: 300, damping: 15 }, // Smoother spring
};

const iconSwapVariants: Variants = {
  initial: { opacity: 0, scale: 0.5, rotate: -45 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  exit: { opacity: 0, scale: 0.5, rotate: 45 },
};
const iconSwapTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 15,
  duration: 0.2,
};


const Slide: React.FC<SlideProps> = ({ project, index }) => {
  const [isExpandButtonHovered, setIsExpandButtonHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // MODIFIED: Body scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup on component unmount or when isModalOpen changes
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <>
      <motion.div
        className="border border-slate-700 rounded-lg overflow-hidden shadow-lg bg-slate-900/50 flex flex-col group"
        custom={index}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        whileHover={cardHoverEffect}
      >
        {/* --- Header Section --- */}
        <motion.div
          className="bg-slate-800 p-4 text-white flex justify-between items-start"
          variants={itemVariants}
        >
          <div className="flex gap-4 items-center min-w-0">
            {project.iconUrl && (
              <motion.div variants={itemVariants}>
                <Image
                  src={project.iconUrl}
                  alt={`${project.title} icon`}
                  width={40}
                  height={40}
                  className="border-white bg-white border rounded-full p-0.5 object-contain flex-shrink-0"
                />
              </motion.div>
            )}
            <div className="flex flex-col min-w-0">
              <p className="text-xl font-sans truncate">
                {project.title}{" "}
                {project.subtitle && <span className="text-slate-400">{project.subtitle}</span>}
              </p>
              <p className="text-sm text-slate-300">
                {formatIsoDate(project.timeline.start_date)}
              </p>
            </div>
          </div>
          <p
            className={`font-medium font-mono text-xs sm:text-sm px-2 py-1 rounded flex-shrink-0 ${
              ({
                done: "bg-green-900/80 text-green-300",
                ongoing: "bg-blue-900/80 text-blue-300",
                start: "bg-yellow-900/80 text-yellow-300",
                canceled: "bg-red-900/80 text-red-300",
                upcoming: "bg-purple-900/80 text-purple-300",
              }[project.status.toLowerCase()] ?? "bg-gray-700/80 text-gray-300")
            }`}
          >
            {project.status}
          </p>
        </motion.div>

        {/* --- Description Section --- */}
        <motion.p
          className="text-sm font-light m-4 text-slate-300 text-wrap flex-grow line-clamp-4"
          variants={itemVariants}
        >
          {project.description}
        </motion.p>

        {/* --- Technologies Section --- */}
        {project.technologies && project.technologies.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 pb-4 px-4"
            variants={tagsContainerVariants}
          >
            {project.technologies.slice(0, 5).map((tech, techIndex) => (
              <motion.div
                className="text-xs font-mono border border-slate-600 text-lime-300 bg-lime-900/30 p-1 px-2 rounded-full"
                key={techIndex}
                variants={tagItemVariants}
              >
                {tech}
              </motion.div>
            ))}
            {project.technologies.length > 5 && (
              <motion.div 
                className="text-xs font-mono text-slate-400 p-1 px-2"
                variants={tagItemVariants}
              >
                + {project.technologies.length - 5} more
              </motion.div>
            )}
          </motion.div>
        )}


        {/* --- Links/Buttons Section --- */}
        <motion.div
          className="flex w-full justify-between items-center gap-2 mt-auto pb-4 px-4 border-t border-slate-800 pt-4"
          variants={itemVariants}
        >
          <div className="flex gap-2">
            {project.repoUrl && (
              <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" passHref legacyBehavior>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  aria-label={`${project.title} Github Repository`}
                >
                  <Button size={"icon"} variant="default" className="text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white">
                    <Github />
                  </Button>
                </motion.a>
              </Link>
            )}
            {project.liveUrl && (
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" passHref legacyBehavior>
                 <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  aria-label={`${project.title} Live Demo`}
                >
                  <Button size={"icon"} variant="default" className="text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white">
                    <Globe />
                  </Button>
                </motion.a>
              </Link>
            )}
          </div>

          {/* MODIFIED: Expand Button directly triggers modal */}
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-300 hover:bg-slate-700 hover:text-white relative overflow-hidden w-9 h-9"
            onMouseEnter={() => setIsExpandButtonHovered(true)}
            onMouseLeave={() => setIsExpandButtonHovered(false)}
            onClick={() => setIsModalOpen(true)} // Set state to open modal
            aria-label="Expand project details"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isExpandButtonHovered || isModalOpen ? ( // Icon changes on hover or if modal is open
                <motion.div
                  key="scan"
                  variants={iconSwapVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={iconSwapTransition}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Scan size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="expand"
                  variants={iconSwapVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={iconSwapTransition}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <ExpandIcon size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.div>

      {/* MODIFIED: Modal rendered here, controlled by AnimatePresence */}
      <AnimatePresence>
        {isModalOpen && (
          <ExpandedSlide project={project} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Slide;