//import { projectsData } from "@/lib/data";

import Slide from "./slide";
import { useFetchProjects } from "@/hooks/project/get-projects";

const SlideShows = () => {
  const projectsData=useFetchProjects().projects
  
  return (
    <div className="container mx-auto mt-12 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {projectsData.map((project,index) => (
          <Slide key={project._id} project={project} index={index}/>
        ))}
      </div>
    </div>
  );
};

export default SlideShows;