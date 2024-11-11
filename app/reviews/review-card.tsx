import { Reviews } from "@/lib/types"
import { Linkedin } from "lucide-react"
import Image from "next/image"
const ReviewCard: React.FC<Reviews> =({name,profileIconURL,review,designation})=>{
    return (
        <div className=" flex flex-col  justify-start  gap-2 px-4 p-4 ">
            <h4 className="text-xl font-thin text-wrap">&quot;{review}&quot;</h4>
            <div className="flex flex-col gap-2 px-4 pt-2">
                <div className="flex gap-3">
                    <Image src={profileIconURL} alt={name} width={52} height={52} className="rounded-xl"/>
                    <div className="flex items-center gap-2"><p className="text-xl font-bold ">{name}</p>
                        <Linkedin className="bg-blue-700 text-white scale-100 p-1 rounded font-extrabold"/>
                        </div>
                    </div>
                <p className="text-base font-serif">{designation}</p>
            </div>
        </div>
    )
}
export default ReviewCard