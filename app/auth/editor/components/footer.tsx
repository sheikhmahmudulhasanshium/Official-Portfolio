// app/auth/editor/components/footer.tsx
import Link from "next/link";
import React from 'react'; // Import React (good practice, needed for Fragment shorthand <>)

const Footer: React.FC = () => { // Using React.FC for type safety
    return (
        // The return statement should directly return a single JSX element.
        // The comment should be inside the JSX structure.
        <>
            {/* Footer */}
            <footer className="mt-12 pt-4 border-t text-center text-sm text-gray-500">
                <Link href={'https://portfolio-maker-v2.vercel.app/'}>
                    Powered By Portfolio Maker V.2
                </Link>
            </footer>
        </>
    );
}

export default Footer;