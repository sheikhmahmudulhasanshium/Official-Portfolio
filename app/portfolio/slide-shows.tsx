//import { projectsData } from "@/lib/data";

import { useRef } from "react";
import Slide from "./slide";
import { useFetchProjects } from "@/hooks/project/get-projects";
import { motion, useInView } from "framer-motion";

const SlideShows = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
      
  const projectsData=useFetchProjects().projects
  
  return (
    <div className="container mx-auto mt-12 ">
      <motion.div ref={ref}
            style={{
                transform: isInView ? "none" : "translateY(-200px)",
                opacity: isInView ? 1 : 0.5,
                transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) , opacity 0.1s ease 1.5s`
            }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {projectsData.map((project,index) => (
          <Slide key={project._id} project={project} index={index}/>
          
        ))}
      </motion.div>
    </div>
  );
};

export default SlideShows;