  "use client"
  import Cal, { getCalApi } from "@calcom/embed-react";
  import { useEffect } from "react";
   const MeetLink=()=> {
	useEffect(()=>{
	  (async function () {
		const cal = await getCalApi({"namespace":"30min"});
		cal("ui", {"styles":{"branding":{"brandColor":"#000000"}},"hideEventTypeDetails":false,"layout":"month_view"});
	  })();
	}, [])
	return (
        <div  className="lg:w-[50%] w-full flex h-[76svh]  rounded-2xl">
            <Cal namespace="30min" className=""
                calLink="sheikh-mahmudul-hasan-shium/30min"
                style={{width:"100%",height:"100%",overflow:"scroll"}}
                config={{"layout":"month_view"}}  />
        </div>
    )
  };
  export default MeetLink