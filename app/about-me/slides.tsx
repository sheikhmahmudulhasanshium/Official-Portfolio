"use client"
import { useFetchInterests } from "@/hooks/interests/get-interests";
//import { PersonalIntroduction } from "@/lib/data";
import Card from "./card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Slides = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    const PersonalIntroduction=useFetchInterests().interests
    return ( 
        <div className="flex justify-center items-center w-full  mt-1 lg:w-[45%]">
            <motion.div ref={ref}
            style={{
                transform: isInView ? "none" : "translateY(-200px)",
                opacity: isInView ? 1 : 0.5,
                transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) , opacity 0.1s ease 1.5s`
            }}
            className="flex flex-wrap gap-6">
                {
                    PersonalIntroduction.map((slide,index)=>(
                        <Card key={index} {...slide}/>
                    ))
                }
            </motion.div>
        </div>
     );
}
 
export default Slides;