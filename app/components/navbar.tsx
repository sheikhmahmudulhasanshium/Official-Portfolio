import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
    return ( 
        <motion.nav initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        className="flex fixed top-12 left-0 right-0 z-30 justify-center items-center" >
            {/* Visible on small and medium screens */}
            <div className="block lg:hidden justify-center w-10/12 min-w-max rounded-full   from-accent bg-gradient-to-tl to-bg-white border-green-200 border">
                <div className="flex justify-between items-center px-6  text-xl py-4 gap-2">
                    <Link href="#" className="flex font-bold ml-6 items-center sm:flex-wrap">
                        <p className="italic font-thin font-serif">Shium</p>
                    </Link>
                    <Link href="#text-me" className=" ">
                        <Button  className="rounded-full m-1 font-semibold bg-secondary-foreground hover:bg-primary">Text Me</Button>
                    </Link>
                </div>
                
            </div>

            {/* Visible on large screens only */}
            <div className="hidden lg:block justify-center w-8/12  from-accent bg-gradient-to-tl to-bg-white border-green-200 border rounded-full">
                <div className="flex gap-4 justify-between items-center px-6  text-xl py-4">
                    <Link href="#" className="flex ml-6 items-center justify-center ">
                        <p className="italic font-thin font-serif">Shium</p>
                    </Link>
                    {/*<Link href="#reviews">Reviews</Link>*/}
                    <Link href="#portfolio">Portfolio</Link>
                    <Link href="#pricing">Pricing</Link>
                    <Link href="#about-me">Me</Link>
                    <Link href="#text-me" className=" ">
                        <Button  className="rounded-full m-1 font-semibold bg-secondary-foreground hover:bg-accent-foreground">Text Me</Button>
                    </Link>
                </div>
            </div>
            
        </motion.nav>
     );
}
 
export default Navbar;