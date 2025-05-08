"use client"

import { useFetchServices } from "@/hooks/services/get-services";
//import { pricingData } from "@/lib/data";
import Card from "./card";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Pricing = () => {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: false });
   const pricingData=useFetchServices().services
    return ( 
        <div id="pricing" className="flex justify-center items-center w-10/12  rounded-2xl my-12 min-h-[60svh]" ref={ref}>
           <div className="flex flex-wrap  justify-between  lg:gap-4 gap-2 py-12 mx-2">
               {pricingData.map((card,index)=>(
                     <div ref={ref}
                     className="flex flex-shrink-0 flex-col justify-between w-[90%] sm:w-[45%] md:w-[45%] lg:w-[30%]  bg-gradient-to-b from-accent rounded-2xl max-h-[60svh] p-4 gap-2 lg:gap-4 rounded-b-none py-2"
                     style={{
                       transform: isInView ? "none" : "translateY(-200px)",
                       opacity: isInView ? 1 : 0,
                       transition: `transform 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.3 * index}s, opacity 0.1s ease ${0.3 * index}s`
                     }}
                      key={index}>
                        <Card {...card}/>
                     </div>
               ))}
           </div>
           
        </div>
     );
}
 
export default Pricing;