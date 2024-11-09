import { PersonalIntroduction } from "@/lib/data";
import Card from "./card";

const Slides = () => {
    return ( 
        <div className="flex justify-center items-center w-full  mt-1 lg:w-[45%]">
            <div className="flex flex-wrap gap-6">
                {
                    PersonalIntroduction.map((slide,index)=>(
                        <Card key={index} {...slide}/>
                    ))
                }
            </div>
        </div>
     );
}
 
export default Slides;