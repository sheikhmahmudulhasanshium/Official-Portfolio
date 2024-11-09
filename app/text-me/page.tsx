import Image from "next/image";
import WhatsappIcon from "../../public/whatsapp.png"
import GMailIcon from "../../public/Gmail.png"
import Link from "next/link";

const TextMe = () => {
    // Pre-filled message for WhatsApp
    const message = "Hello, I have viewed your portfolio and would like to get in touch with you. Please let me know how we can proceed.";
    const subject = "I would like to talk to you";
    
    // URL-encode the message and subject
    const encodedMessage = encodeURIComponent(message);
    const encodedSubject = encodeURIComponent(subject);

    return ( 
        <div id="text-me" className="min-h-[80vh] w-10/12 flex items-center justify-center mt-12">
            <div className="flex flex-col justify-between items-center gap-4">
                <h4 className="font-mono text-xl font-bold">DONT&apos;T LIKE CALLS?</h4>
                <h2 className="text-3xl font-extrabold">Text me! 👋</h2>
                <p className="text-center mb-8 lg:w-8/12">
                    If booking calls with strangers from the internet is not your cup of tea ☕️, great news - you can always text or email me first!
                </p>
                <div className="flex justify-center w-6/12 items-center gap-8">
                    <Link href={`https://wa.me/8801729771453?text=${encodedMessage}`} className="hover:opacity-40">
                        <Image 
                            alt="Chat on WhatsApp" 
                            src={WhatsappIcon} 
                            width={40} 
                            height={40} 
                        />
                    </Link>
                    <Link 
                        href={`mailto:officials.shium@gmail.com?subject=${encodedSubject}&body=${encodedMessage}`} className="hover:opacity-40"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <Image 
                            alt="Gmail" 
                            src={GMailIcon} 
                            width={40} 
                            height={40} 
                        />
                    </Link>
                </div>
                <div className="mt-24 flex flex-col items-center justify-center  gap-4">
                    <h1 className="italic font-thin font-serif text-2xl text-center">Sheikh Mahmudul Hasan Shium</h1>
                    <h4 className="text-xl font-bold">Software Engineer</h4>
                    <p>Next.JS || React.JS</p>
                </div>
            </div>
            
        </div>
    );
}

export default TextMe;
