import { projectsData } from "@/lib/data";
import Slide from "./slide";

const SlideShows = () => {
    
    return ( 
          <div className="flex overflow-x-scroll items-center gap-8 justify-between max-w-6xl w-[90vh] lg:w-full py-32 ">
            {
              projectsData.map((project,index)=>(
                  <Slide key={index} {...project}/>
              ))
            }
          </div>
     );
}
 
export default SlideShows;