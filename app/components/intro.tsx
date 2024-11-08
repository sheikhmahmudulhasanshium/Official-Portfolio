import { Button } from "@/components/ui/button";
import Image from "next/image";
import hi from '../../public/giphy.gif'
const Intro = () => {

    return (  
        <div className="w-full flex flex-col justify-center items-center text-center gap-12 lg:gap-16 mt-16 h-[90svh]" id="#">
            <div className="text-2xl lg:text-3xl flex gap-2 font-semibold">
                <h1>Hi there, my name is Shium! </h1><Image alt="👋" src={hi} width={36} height={36}/>
            </div>
            <h2 className="text-4xl w-10/12 lg:text-6xl font-serif flex justify-center items-center">
                I design UI/UX & build High End Web Applications for startups
            </h2>
            <div className="flex flex-shrink-0 flex-wrap justify-center items-center w-10/12 lg:w-7/12 gap-16 lg:gap-24 mt-8 mb-12">
                <Button variant={"outline"} className="text-xl lg:text-2xl font-semibold h-16 shadow-primary shadow-xl w-4/12">Find a Time</Button>
                <Button className="text-xl lg:text-2xl h-16 font-semibold shadow-xl shadow-accent-foreground w-4/12">View Works</Button>

            </div>
        </div>    
        );
}
 
export default Intro;