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
    <div className='className="flex flex-col justify-between items-center w-full'>
      {/* Wrap sections that you want to animate */}
      <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Navbar />
      </motion.div>

      <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className='w-full flex justify-between items-center pt-16'>
        <Body />
      </motion.div>
    </div>
  );
}
