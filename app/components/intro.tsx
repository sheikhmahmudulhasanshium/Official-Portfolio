'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import hi from '../../public/giphy.gif'
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
const Intro = () => {
    const router=useRouter() 

    return ( 
        <div className="w-full flex flex-col justify-center items-center text-center gap-12 lg:gap-16 my-16 h-[90svh] lg:my-24" id="#">
            <motion.div  initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1}}
             className="text-2xl lg:text-3xl flex  gap-2 font-semibold lg:w-full w-10/12 justify-center items-center">
                <h1>Hi there, my name is Shium! </h1><div className="w-[40px] h-[40px]"><Image alt="👋" src={hi} width={100} height={100} unoptimized/></div>
            </motion.div>
            <motion.h2   initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2}}
            className="text-4xl w-10/12 lg:text-6xl font-serif flex  justify-center items-center">
                I design UI/UX & build High End Web Applications for startups
            </motion.h2>
            <motion.div initial={{opacity:0.1, scale:.4, }} animate={{opacity:1, scale:1}} transition={{delay:1.5, bounceStiffness:4, bounce:1, type:"spring", duration:0.2}}
             className="flex  flex-wrap justify-center items-center w-10/12 lg:w-7/12 gap-12 lg:gap-24 my-12">
                <Button onClick={()=>router.push(`/#about-me`)} variant={"outline"} className="text-sm sm:text-base md:text-xl  lg:text-2xl font-semibold h-16 shadow-primary shadow-xl w-4/12 p-2 rounded-xl flex-shrink-0">Find a Time</Button>
                <Button onClick={()=>router.push(`/#portfolio`)} className="text-sm sm:text-base md:text-xl lg:text-2xl h-16 font-semibold shadow-xl shadow-accent-foreground w-4/12 p-2 rounded-xl flex-shrink-0">View Works</Button>

            </motion.div>
        </div>    
        );
}
 
export default Intro;