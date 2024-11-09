import Image from "next/image";
import WhatsappIcon from "../../public/whatsapp.png"
import GMailIcon from "../../public/Gmail.png"

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
                <p className="text-center mb-8">
                    If booking calls with strangers from the internet is not your cup of tea ☕️, great news - you can always text or email me first!
                </p>
                <div className="flex justify-center w-6/12 items-center gap-8">
                    <a href={`https://wa.me/8801729771453?text=${encodedMessage}`}>
                        <Image 
                            alt="Chat on WhatsApp" 
                            src={WhatsappIcon} 
                            width={40} 
                            height={40} 
                        />
                    </a>
                    <a 
                        href={`mailto:officials.shium@gmail.com?subject=${encodedSubject}&body=${encodedMessage}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <Image 
                            alt="Gmail" 
                            src={GMailIcon} 
                            width={40} 
                            height={40} 
                        />
                    </a>
                </div>
                
            </div>
        </div>
    );
}

export default TextMe;
