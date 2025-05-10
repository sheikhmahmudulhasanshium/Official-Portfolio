// src/components/slides/ExpandedSlide.tsx
import { Project } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { XIcon, Globe, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { formatIsoDate } from "@/hooks/format-timeline";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface ExpandedSlideProps {
  project: Project;
  onClose: () => void;
}

const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
};

const modalPanelVariants = {
  hidden: { opacity: 0, scale: 0.90, y: "5%" },
  visible: { opacity: 1, scale: 1, y: "0%", transition: { type: "spring", stiffness: 300, damping: 30, duration: 0.3 } },
  exit: { opacity: 0, scale: 0.90, y: "5%", transition: { duration: 0.2, ease: "easeIn" } },
};

const imageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: "0%",
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

const ExpandedSlide: React.FC<ExpandedSlideProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const images = project.previewImageUrls || [];

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) {
        return images.length - 1;
      }
      if (nextIndex >= images.length) {
        return 0;
      }
      return nextIndex;
    });
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (images.length > 1) {
        if (event.key === 'ArrowLeft') {
          paginate(-1);
        } else if (event.key === 'ArrowRight') {
          paginate(1);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, images.length, paginate]);

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[9999]",
        "w-full h-full",
        "p-2 sm:p-4",
        "bg-slate-950/80 backdrop-blur-sm",
        "flex justify-center items-center",
        "overflow-hidden"
      )}
      variants={modalOverlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className={cn(
          "bg-slate-900 rounded-lg shadow-2xl",
          "w-full max-w-3xl",
          "h-full max-h-full",
          "flex flex-col",
          "text-white",
          "overflow-hidden",
          "relative"
        )}
        variants={modalPanelVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className={cn("absolute top-2 right-2 sm:top-3 sm:right-3 text-slate-400 hover:text-white z-50")}
          aria-label="Close project details"
        >
          <XIcon size={24} /> {/* Keep size prop for non-responsive icons or use className */}
        </Button>

        <div className={cn("flex items-start gap-3 sm:gap-4 p-3 sm:p-6 border-b border-slate-800 flex-shrink-0")}>
           {project.iconUrl && (
            <Image
              src={project.iconUrl}
              alt={`${project.title} icon`}
              width={50}
              height={50}
              className={cn("rounded-lg border-2 border-slate-700 bg-white p-0.5 sm:p-1 object-contain flex-shrink-0 mt-1")}
            />
          )}
          <div className={cn("pt-1 pr-6 sm:pr-10 flex-grow min-w-0")}>
            <h1 className={cn("text-lg sm:text-2xl md:text-3xl font-bold leading-tight truncate")}>{project.title}</h1>
            {project.subtitle && <p className={cn("text-sm sm:text-md md:text-lg text-slate-400 truncate")}>{project.subtitle}</p>}
            <div className={cn("text-xs sm:text-sm text-slate-500 mt-1 flex flex-wrap gap-x-2 items-center")}>
              <span>
                {formatIsoDate(project.timeline.start_date)} - {project.timeline.end_date ? formatIsoDate(project.timeline.end_date) : (project.status.toLowerCase() === 'ongoing' || project.status.toLowerCase() === 'upcoming' ? 'Present' : 'N/A')}
              </span>
              <span className={cn("hidden sm:inline")}>•</span>
              <span
                className={cn(
                  "font-medium px-1.5 py-0.5 rounded text-xs",
                  {
                    "bg-green-900/80 text-green-300": project.status.toLowerCase() === 'done',
                    "bg-blue-900/80 text-blue-300": project.status.toLowerCase() === 'ongoing',
                    "bg-yellow-900/80 text-yellow-300": project.status.toLowerCase() === 'start',
                    "bg-red-900/80 text-red-300": project.status.toLowerCase() === 'canceled',
                    "bg-purple-900/80 text-purple-300": project.status.toLowerCase() === 'upcoming',
                    "bg-gray-700/80 text-gray-300": !['done', 'ongoing', 'start', 'canceled', 'upcoming'].includes(project.status.toLowerCase()),
                  }
                )}
              >
                {project.status}
              </span>
            </div>
          </div>
        </div>

        <div className={cn(
            "flex-grow overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6",
            "scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800/50"
        )}>
          {images && images.length > 0 && (
            <div className={cn("mb-4 sm:mb-6 rounded-lg overflow-hidden shadow-xl aspect-video relative bg-slate-800 group")}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentImageIndex}
                  className="absolute inset-0 w-full h-full"
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={`${project.title} preview ${currentImageIndex + 1}`}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 767px) 90vw, (max-width: 1023px) 70vw, 728px"
                    priority={currentImageIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon" // Keep this for the button's padding/shape if needed
                    onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                    className={cn(
                        "absolute top-1/2 left-1 sm:left-2 -translate-y-1/2 z-20 text-white",
                        "bg-black/30 hover:bg-black/50",
                        "opacity-60 hover:!opacity-90 group-hover:opacity-80",
                        "transition-all duration-200 ease-in-out",
                        "rounded-full w-8 h-8 sm:w-9 sm:h-9 p-1" // Ensure button padding is consistent for icon
                        )}
                    aria-label="Previous image"
                  >
                    {/* MODIFIED: Use className for responsive sizing */}
                    <ChevronLeft className="w-5 h-5 sm:w-5 sm:h-5" />
                    {/* Alternatively, if size prop is preferred and you handle responsiveness outside:
                        <ChevronLeft size={window.innerWidth < 640 ? 18 : 20} />
                        This is less ideal due to potential SSR issues and direct DOM reads.
                    */}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); paginate(1); }}
                    className={cn(
                        "absolute top-1/2 right-1 sm:right-2 -translate-y-1/2 z-20 text-white",
                        "bg-black/30 hover:bg-black/50",
                        "opacity-60 hover:!opacity-90 group-hover:opacity-80",
                        "transition-all duration-200 ease-in-out",
                        "rounded-full w-8 h-8 sm:w-9 sm:h-9 p-1"
                        )}
                    aria-label="Next image"
                  >
                    {/* MODIFIED: Use className for responsive sizing */}
                    <ChevronRight className="w-5 h-5 sm:w-5 sm:h-5" />
                  </Button>
                  <div className={cn(
                      "absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5 sm:space-x-2",
                      "opacity-60 group-hover:opacity-80 transition-opacity duration-200"
                      )}
                  >
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDirection(index > currentImageIndex ? 1 : -1);
                          setCurrentImageIndex(index);
                        }}
                        className={cn(
                          "w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full",
                          "transition-colors duration-150",
                          currentImageIndex === index ? "bg-white scale-110" : "bg-white/40 hover:bg-white/70"
                        )}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

           <section>
                <h2 className={cn("text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-lime-400")}>Project Overview</h2>
                <p className={cn("text-slate-300 leading-relaxed whitespace-pre-wrap text-xs sm:text-sm")}>
                {project.description}
                </p>
            </section>
            {project.technologies && project.technologies.length > 0 && (
                <section>
                <h2 className={cn("text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-lime-400")}>Technologies Used</h2>
                <div className={cn("flex flex-wrap gap-1.5 sm:gap-2")}>
                    {project.technologies.map((tech, index) => (
                    <span
                        key={index}
                        className={cn("bg-slate-700/60 border border-slate-600 text-lime-300 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono")}
                    >
                        {tech}
                    </span>
                    ))}
                </div>
                </section>
            )}
            {project.keywords && project.keywords.length > 0 && (
                <section>
                <h2 className={cn("text-lg sm:text-xl font-semibold mb-1 sm:mb-3 text-lime-400")}>Keywords</h2>
                <div className={cn("flex flex-wrap gap-1.5 sm:gap-2")}>
                    {project.keywords.map((keyword, index) => (
                    <span
                        key={index}
                        className={cn("text-[10px] sm:text-xs font-mono border border-purple-600 text-purple-300 bg-purple-900/30 p-1 px-1.5 sm:px-2 rounded-full")}
                    >
                        {keyword}
                    </span>
                    ))}
                </div>
                </section>
            )}
        </div>

        <div className={cn("mt-auto p-3 sm:p-6 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end border-t border-slate-800 flex-shrink-0")}>
           {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" passHref legacyBehavior>
              <Button asChild variant="outline" className={cn("w-full sm:w-auto border-lime-500 text-lime-500 hover:bg-lime-500 hover:text-slate-900 text-xs sm:text-sm py-1.5 sm:py-2")}>
                <a>
                  {/* MODIFIED: Use className for responsive sizing */}
                  <Globe className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-[18px] sm:h-[18px]" /> Live Demo / API
                </a>
              </Button>
            </Link>
          )}
          {project.repoUrl && (
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" passHref legacyBehavior>
              <Button asChild variant="outline" className={cn("w-full sm:w-auto border-slate-500 text-slate-300 hover:bg-slate-500 hover:text-slate-900 text-xs sm:text-sm py-1.5 sm:py-2")}>
                <a>
                  {/* MODIFIED: Use className for responsive sizing */}
                  <Github className="mr-1.5 sm:mr-2 w-4 h-4 sm:w-[18px] sm:h-[18px]" /> Source Code
                </a>
              </Button>
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExpandedSlide;