// components/editor/InterestEditor.tsx

import { Button } from "@/components/ui/button";
import { useFetchInterests } from "@/hooks/interests/get-interests"; // Assuming this path is correct
import { Edit2Icon } from "lucide-react";
import Image from "next/image";

const InterestEditor: React.FC = () => { // Changed ({}) to () as no props are being destructured or used.
  // You'll likely want to destructure values from your hook, e.g.:
  // const { data: interests, isLoading, error } = useFetchInterests();
  const {loading,interests} = useFetchInterests(); // This is fine if the hook only has side effects and returns nothing meaningful for now
  if(loading){

  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Manage Interests</h2>
      <div className="flex flex-col gap-2">
        {interests.map((interest)=>(
          <div key={interest._id}>
            <div className="flex justify-start items-center gap-2">
              <Image src={interest.iconPath} alt={interest.icon} height={100} width={100} className="w-[40px] h-[40px]"/>
              <div>
                <p className="text-xl font-semibold">{interest.title}</p>
                <p>{interest.description}</p>

              </div>

            </div>
{/**             <p>{interest.position}</p>
*/}
          </div>
        ))}
      </div>
                <Button>Edit Order<Edit2Icon/></Button>

    </div>
  );
};

export default InterestEditor;