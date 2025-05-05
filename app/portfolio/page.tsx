"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SlideShows from "./slide-shows";

const Portfolio = () => {
    const router = useRouter();

    return ( 
        <section className="min-h-screen w-full justify-center items-center flex flex-col" id="portfolio">
            <div className="flex flex-col w-7/12 justify-center items-center gap-2 pt-32">
                <h4 className=" text-lg lg:text-xl font-bold text-slate-950">PORTFOLIO</h4>
                <h2 className="text-3xl font-extrabold py-2 text-center">Some of my work 🙈</h2>
                <p className="text-center text-wrap items-center ">Speed + Iterations = near Perfection</p>
                <div className="flex justify-center w-6/12 lg:w-8/12  lg:gap-6 gap-8 my-6">
                    <Button 
                        onClick={() => window.location.href = "/#pricing"} 
                        size={'lg'} 
                        variant={"outline"} 
                        className="font-bold rounded-2xl shadow-slate-600 shadow-lg lg:h-20 h-16"
                    >
                        <p className="lg:text-2xl text-xl">Pricing</p>
                    </Button>
                    <Button 
                        onClick={() => router.push('/#about-me')} 
                        size={'lg'} 
                        className="font-bold rounded-2xl shadow-black shadow-lg lg:h-20 h-16 bg-primary  "
                    >
                        <p className="lg:text-2xl text-xl">Book a Call</p>
                    </Button>
                </div>
            </div>
            <SlideShows/>

        </section>
     );
}
 
export default Portfolio;