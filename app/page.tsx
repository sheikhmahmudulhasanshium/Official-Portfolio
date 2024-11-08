"use client";
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/navbar';
import Body from './components/body';

const useSmoothScroll = () => {
  useEffect(() => {
    const handleHashChange = (): void => {
      const element = document.getElementById(window.location.hash.substring(1));
      if (element) {
        // Using Framer Motion to animate scrolling here
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start', // Optional: Align to the top of the viewport
        });
      }
    };

    window.addEventListener('hashchange', handleHashChange);

    if (window.location.hash) {
      handleHashChange();
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
};

export default function Home() {
  useSmoothScroll();  // Call the hook

  return (
    <div className='flex flex-col justify-center items-center min-w-screen max-w-full w-full relative z-0 overflow-x-hidden min-h-screen'>
      {/* Wrap sections that you want to animate */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Navbar />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
        <Body />
      </motion.div>
    </div>
  );
}
