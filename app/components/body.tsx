import AboutMe from "../about-me/page";
import Intro from "../components/intro";
import Portfolio from "../portfolio/page";
import TextMe from "../text-me/page";

const Body=()=> {
  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen">
      <Intro/>
      <AboutMe/>
      <Portfolio/>
      <TextMe/>
    </main>
      );
}
export default Body 