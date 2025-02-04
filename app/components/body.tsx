import AboutMe from "../about-me/page";
import Intro from "../components/intro";
import Portfolio from "../portfolio/page";
import Pricing from "../pricing/page";
//import Reviews from "../reviews/page";
import TextMe from "../text-me/page";

const Body=()=> {
  return (
    <main className="flex flex-col justify-between items-center">
      <Intro/>
      <AboutMe/>
      <Pricing/>
      {/*<Reviews/>*/}
      <Portfolio/>
      <TextMe/>
    </main>
      );
}
export default Body 