import { Pricing } from "@/lib/types";
import Image from "next/image";

const Card:React.FC<Pricing> = ({icon,iconLink,title,description}) => {
    return ( 
        <>
            <div className="w-[48px] h-[48px] mt-4">
                <Image src={iconLink}  alt={icon} height={100} width={100} className="scale-100"/>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold font-sans">{title}</h1>
            <p className="text-wrap font-thin w-full">{description}</p>
        </>
     );
}
 
export default Card;