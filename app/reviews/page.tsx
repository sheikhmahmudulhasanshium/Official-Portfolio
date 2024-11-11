"use client"

import { reviews } from "@/lib/data";
import Link from "next/link";
import ReviewCard from "./review-card";
//import Companies from "./companies";

const Reviews = () => {
    return ( 
        <div className="min-h-screen flex flex-col justify-center items-center w-10/12 pt-32" id="reviews">
            <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-mirza-background font-sans font-bold">WALL OF LOVE</p>
                <p className="lg:text-4xl text-2xl font-extrabold text-center mb-8">Founders ❤️ my work</p>
            </div>
           { <div className="my-12 flex  flex-wrap justify-between gap-4 w-full">
                {
                    reviews.map((review,index)=>
                        <Link href={review.reviewerUrl} key={index} className="border bg-white  hover:bg-accent hover:scale-90 lg:w-[30%] md:w-[45%] sm:w-full w-full rounded-xl flex justify-between items-center gap-6">
                            <ReviewCard  {...review}/>
                        </Link>
                    )
                }

            </div>
           } <div className="flex w-full justify-center items-center pt-12">
                {/*<Companies/>*/}
            </div>
        </div>
     );
}
 
export default Reviews;