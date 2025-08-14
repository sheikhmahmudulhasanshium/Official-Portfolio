"use client";

import Image from "next/image";
import WhatsappIcon from "../../public/whatsapp.png";
import GMailIcon from "../../public/Gmail.png";
import Link from "next/link";
import { motion, Transition } from "framer-motion";

// --- 1. Your component's props and logic remain the same ---
interface TextMeClientProps {
  waveHeight?: number;
  animationSpeed?: number;
}

// 2. We rename your component. It's a client component, not the page.
const TextMeClient = ({ waveHeight = 60, animationSpeed = 0.2 }: TextMeClientProps) => {
    const message = "Hello, I have viewed your portfolio and would like to get in touch with you. Please let me know how we can proceed.";
    const subject = "I would like to talk to you";
    const encodedMessage = encodeURIComponent(message);
    const encodedSubject = encodeURIComponent(subject);

    const transitionSettings: Transition = {
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "reverse",
    };

    return ( 
        <div id="text-me" className="relative min-h-[80vh] w-full flex items-center justify-center mt-12 bg-gradient-to-b from-blue-200  overflow-hidden">
            
            <div 
                className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none"
                style={{ height: `${waveHeight}px` }}
            >
                <svg 
                    data-name="Layer 1" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 1200 120" 
                    preserveAspectRatio="none" 
                    className="relative block w-[calc(111%+1.3px)]"
                    style={{ height: `${waveHeight}px` }}
                >
                    <motion.path 
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                        opacity=".25" 
                        className="fill-white will-change-transform"
                        animate={{ x: [-20, 20] }}
                        transition={{ ...transitionSettings, duration: 5 * animationSpeed }}
                    ></motion.path>
                    <motion.path 
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                        opacity=".5" 
                        className="fill-white will-change-transform"
                        animate={{ x: [-15, 15] }}
                        transition={{ ...transitionSettings, duration: 6 * animationSpeed }}
                    ></motion.path>
                    <motion.path 
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                        className="fill-white will-change-transform"
                        animate={{ x: [-10, 10] }}
                        transition={{ ...transitionSettings, duration: 7 * animationSpeed }}
                    ></motion.path>
                </svg>
            </div>
            
            <div className="flex flex-col justify-between items-center gap-4 pt-32 w-10/12 z-10">
                <h4 className="font-mono text-xl font-bold">DONT&apos;T LIKE CALLS?</h4>
                <h2 className="text-3xl font-extrabold">Text me! 👋</h2>
                <p className="text-center mb-8 lg:w-8/12">
                    If booking calls with strangers from the internet is not your cup of tea ☕️, great news - you can always text or email me first!
                </p>
                <div className="flex justify-center w-6/12 items-center gap-8">
                    <Link href={`https://wa.me/8801729771453?text=${encodedMessage}`} className="hover:opacity-40 hover:scale-125">
                        <Image alt="Chat on WhatsApp" src={WhatsappIcon} width={40} height={40} className="hover:opacity-40 "/>
                    </Link>
                    <Link href={`mailto:officials.shium@gmail.com?subject=${encodedSubject}&body=${encodedMessage}`} className="hover:opacity-40 hover:scale-125" target="_blank" rel="noopener noreferrer">
                        <Image alt="Gmail" src={GMailIcon} width={40} height={40} className="hover:opacity-40"/>
                    </Link>
                </div>
                <div className="mt-24 flex flex-col items-center justify-center gap-4">
                    <h1 className="italic font-thin font-serif text-2xl text-center">Sheikh Mahmudul Hasan Shium</h1>
                    <h4 className="text-xl font-bold">Software Engineer</h4>
                    <p>Next.JS || React.JS</p>
                </div>
            </div>
        </div>
    );
};

// 3. Create the actual Page. It takes no props, resolving the build error.
const TextMePage = () => {
  return (
    // Render your client component here. You can pass props or use the defaults.
    <TextMeClient />
  );
};

// 4. Export the Page as the default export for the route.
export default TextMePage;