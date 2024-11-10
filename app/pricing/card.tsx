import { Pricing } from "@/lib/types";
import Image from "next/image";

const Card:React.FC<Pricing> = ({icon,iconLink,title,description}) => {
    return ( 
        <div className="flex flex-col justify-between w-[45%] lg:w-[30%] bg-accent rounded-2xl h-[60svh] p-4 gap-2 lg:gap-4 rounded-b-none py-2">
            <div className="w-[48px] h-[48px] mt-4">
                <Image src={iconLink}  alt={icon} height={100} width={100} className="scale-100"/>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold font-sans">{title}</h1>
            <p className="text-wrap font-thin w-full">{description}</p>
        </div>
     );
}
 
export default Card;