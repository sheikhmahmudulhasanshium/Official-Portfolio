import MeetLink from "./meet";
import Slides from "./slides";

const AboutMe = () => {
    return ( 
        <div id="about-me" className="w-10/12 flex flex-between   justify-center items-center ">
            <div className="flex flex-col w-full justify-between gap-8 py-16">
                <h4 className="text-bold text-xl font-mono">BUT WHO IS SHIUM?</h4>
                <h3 className="text-4xl font-extrabold">Get to know me!</h3>
                <p className="font-sans text-justify">
                    I may be the solution you&apos;re seeking—or I might not be. The best way to get a sense of how I operate is by having a quick chat with me. In the meantime, here are a few key details that offer a snapshot of who I am and how I work.
                </p>
                <div className="flex flex-wrap gap-8 w-full items-center justify-center">
                    <Slides/>
                    <MeetLink/>
                </div>
            </div>
        </div>
     );
}
 
export default AboutMe;