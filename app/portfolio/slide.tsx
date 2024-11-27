import { Projects } from "@/lib/types";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const Slide:React.FC<Projects> = ({name,description,LogoUrl,projectURL,techStack}) => {
    return ( 
        <div className="flex flex-col w-[90vh] justify-center items-center shrink-0 text-wrap hover:scale-90 shadow-xl h-[60svh] bg-secondary rounded-xl">
            <div className="flex flex-col  justify-between p-4 gap-2">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-[60px] h-[60px] p-2"><Image src={LogoUrl} alt="" width={52} height={52} className="bg-white rounded-full"/></div>
                    <h3 className="text-4xl font-sans italic justify-start">{name}</h3>
                </div>
                <Link href={projectURL} className="justify-end flex gap-2 text-blue-500 hover:opacity-50">Visit Project<LinkIcon className="w-5 h-5"/></Link>

                <div className="w-full flex justify-between text-wrap"><p className="text-wrap text-sm ">{description}</p></div>

                <div className="flex flex-col justify-start gap-3">
                    <p className="text-xl font-bold">Built Using </p>
                    <div className="flex flex-wrap gap-2 justify-start items-center">
                        {techStack?.map((tech,index)=>(
                            <div key={index} className="w-8 h-8"><Image  src={tech.logoUrl} alt={tech.name} height={100} width={100} quality={100} className="scale-100 w-8 h-8"/></div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
     );
}
 
export default Slide;