import { projectsData } from "@/lib/data";

const SlideShows = () => {
  return (
    <div className="container mx-auto mt-12 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="bg-slate-500 rounded-lg p-4 text-white"
          >
            {project.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideShows;