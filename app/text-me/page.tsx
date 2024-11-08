import Link from "next/link";
import Image from "next/image";
import WhatsappIcon from "../../public/whatsapp.png"

const TextMe = () => {
    // Pre-filled message for WhatsApp
    const message = "Hello, I have viewed your portfolio and would like to get in touch with you. Please let me know how we can proceed.";

    // URL-encode the message
    const encodedMessage = encodeURIComponent(message);

    return ( 
        <div id="text-me" className="min-h-[80vh]">
            <Link href={`https://wa.me/8801729771453?text=${encodedMessage}`} passHref target="_blank" rel="noopener noreferrer">
                <Image 
                    alt="Chat on WhatsApp" 
                    src={WhatsappIcon} // Update with the correct path
                    width={100} // Adjust width as necessary
                    height={100} // Adjust height as necessary
                />
            </Link>
        </div>
    );
}
 
export default TextMe;
