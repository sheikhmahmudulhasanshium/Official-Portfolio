import { pricingData } from "@/lib/data";
import Card from "./card";

const Pricing = () => {
    return ( 
        <div id="pricing" className="flex justify-center items-center w-10/12   rounded-2xl my-12">
           <div className="flex flex-wrap justify-between items-center lg:gap-4 gap-8 py-12 mx-4">
               {pricingData.map((card,index)=>(
                     <Card key={index} {...card}/>
               ))}
           </div>
           
        </div>
     );
}
 
export default Pricing;