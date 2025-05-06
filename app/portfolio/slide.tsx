import { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { formatIsoDate } from "@/hooks/format-timeline";
import { Github, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, Transition } from "framer-motion"; // Import Transition type

interface SlideProps {
  project: Project;
  index: number;
}

// --- Animation Variants ---

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0 }, // Added scale: 0
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1, // Added scale: 1
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      delayChildren: 0.3,
      staggerChildren: 0.15,
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
      duration: 0.5,
    },
  },
};

const tagsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.07,
            delayChildren: 0.1, // This could be relative to parent's delayChildren
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

// --- Hover Animation ---
const cardHoverEffect = {
  scale: 1.03, // Slightly scale up the card
  // y: -5,    // Optionally lift the card slightly
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)", // Add a more pronounced shadow
};

const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};


const Slide: React.FC<SlideProps> = ({ project, index }) => {
  return (
    <motion.div
      className="border border-slate-700 rounded-lg overflow-hidden shadow-lg bg-slate-900/50 cursor-pointer" // Added cursor-pointer
      custom={index}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }} // Controls when 'visible' is triggered
      // --- HOVER ANIMATION ADDED HERE ---
      whileHover={cardHoverEffect}
      transition={springTransition} // Apply spring to hover scale and other direct transforms
    >
      {/* --- Header Section --- */}
      <motion.div
        className="bg-slate-800 p-4 text-white flex justify-between items-start"
        variants={itemVariants} // This will inherit timing from container's visible.transition
      >
        <div className="flex gap-4 items-center">
          {/*
            Note: This inner motion.div with itemVariants might be redundant if the parent
            motion.div (Header Section) already handles staggering for its direct children.
            However, it's fine if you want to animate the image icon separately from the text block.
            If the intention is for the Image and the text block (title/subtitle/date) to animate
            as a single "item", then only the parent Header Section needs itemVariants.
            If Image is one item and text block is another, this structure is fine with stagger.
            For simplicity, I'll assume this nested itemVariants is intentional for the icon.
          */}
          <motion.div variants={itemVariants}>
            <Image
              src={project.iconUrl}
              alt={`${project.title} icon`}
              width={40}
              height={40}
              className="border-white bg-white border rounded-full"
            />
          </motion.div>
          {/*
            If the text block (title/subtitle & date) should animate as one unit after the icon,
            it could also be wrapped in a motion.div with itemVariants.
            Or, if the entire header content (icon + text block) is one item, then the
            outermost motion.div for "Header Section" is enough.
            Given the current setup, the "Header Section" motion.div acts as an item, and its
            children (the flex container and the status p-tag) will appear once it animates.
            The icon inside the flex container will then also animate based on itemVariants.
          */}
          <div className="flex flex-col">
            <p className="text-xl font-sans">
              {project.title}{" "}
              <span className="text-slate-400">{project.subtitle}</span>
            </p>
            <p className="text-sm text-slate-300">
              {formatIsoDate(project.timeline.start_date)}
            </p>
          </div>
        </div>
        {/*
          The status <p> tag is a direct child of the "Header Section" motion.div.
          If you want it to animate independently with itemVariants, it should also be
          wrapped in a motion.div. Otherwise, it will appear as part of the "Header Section"
          animation if itemVariants is applied to the "Header Section" motion.div.
          Given the `staggerChildren` on containerVariants, the "Header Section" motion.div
          will animate first.
        */}
        <p
          className={`font-medium font-mono text-sm px-2 py-1 rounded ${
            ({
              done: "bg-green-900/80 text-green-300",
              ongoing: "bg-blue-900/80 text-blue-300",
              start: "bg-yellow-900/80 text-yellow-300",
              canceled: "bg-red-900/80 text-red-300",
              upcoming: "bg-purple-900/80 text-purple-300",
            }[project.status] ?? "bg-gray-700/80 text-gray-300")
          }`}
        >
          {project.status}
        </p>
      </motion.div>

      {/* --- Description Section --- */}
      <motion.p
        className="text-sm font-light m-4 text-slate-300 text-wrap"
        variants={itemVariants}
      >
        {project.description}
      </motion.p>

      {/* --- Technologies Section --- */}
       <motion.div
        className="flex flex-wrap gap-2 pb-4 px-4"
        variants={tagsContainerVariants} // This will animate its children (tags)
      >
        {project.technologies.map((tech, techIndex) => (
          <motion.div
            className="text-xs font-mono border border-slate-600 text-lime-900 p-1 px-2 rounded-full" // Note: text-lime-900 might be hard to see on dark bg. Consider text-lime-300 or similar.
            key={techIndex}
            variants={tagItemVariants}
          >
            {tech}
          </motion.div>
        ))}
      </motion.div>

      {/* --- Links/Buttons Section --- */}
      <motion.div
        className="flex w-auto gap-2 items-start pb-4 px-4"
        variants={itemVariants} // This div itself will animate as an item
      >
        {project.repoUrl && (
          <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" passHref legacyBehavior>
            <motion.a // Make the <a> tag motion-aware for individual hover on button
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button size={"icon"} variant="default" className="text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white">
                <Github />
              </Button>
            </motion.a>
          </Link>
        )}
        {project.liveUrl && (
          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" passHref legacyBehavior>
             <motion.a // Make the <a> tag motion-aware
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button size={"icon"} variant="default" className="text-slate-300 border-slate-600 hover:bg-slate-700 hover:text-white">
                <Globe />
              </Button>
            </motion.a>
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Slide;