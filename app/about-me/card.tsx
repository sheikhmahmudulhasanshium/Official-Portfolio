import { PersonalInterest } from "@/lib/types";
import Image from "next/image";
const Card:React.FC<PersonalInterest >= ({title,description,iconPath,icon}) => {
    return ( 
        <div className="flex flex-col w-[45%] p-4 justify-between border-b-0 border rounded-xl rounded-b-none gap-4 shadow-lg shadow-accent-foreground">
            <div className="w-[40px] h-[40px] flex">
                <Image src={iconPath} alt={icon} height={80} width={80} className="scale-100"/>
            </div>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-wrap">{description}</p>
        </div>
     );
}
 
export default Card;