'use client'
import { motion } from "framer-motion";
import Body from "./components/body";

export default function Home() {
  return (
    <>
    <motion.div initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} className="flex items-center justify-items-center min-h-screen justify-center">
      <Body/>
    </motion.div>
    </>
  );
}
