import AboutMe from "../about-me/page";
import Portfolio from "../portfolio/page";
import Pricing from "../pricing/page";
import TextMe from "../text-me/page";
import Intro from "./intro";
import Navbar from "./navbar";
//import Reviews from "../reviews/page";


const Body = () => {
    return ( 
        <main className="flex flex-col gap-8  items-center relative z-0">
            <Navbar/>

            <Intro/>
            <AboutMe/>
            {/*<Reviews/>*/}

            <Pricing/>
            <Portfolio/>
            <TextMe/>

        </main>
     );
}
 
export default Body;