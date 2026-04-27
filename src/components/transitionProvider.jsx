"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";

const TransitionProvider = ({ children }) => {
  const pathName = usePathname();
  const reduceMotion = useReducedMotion();
  const pageLabel = pathName === "/" ? "Home" : pathName.substring(1);

  const overlayDuration = reduceMotion ? 0 : 0.5;
  const labelDuration = reduceMotion ? 0 : 0.8;

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathName}
        className="w-screen min-h-[100dvh] bg-gradient-to-b from-blue-100 to-red-100"
      >
        <motion.div
          className="h-[100dvh] w-screen fixed bg-black rounded-b-[100px] z-40"
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: overlayDuration, ease: "easeOut" }}
        />
        <motion.div
          className="fixed m-auto top-0 bottom-0 left-0 right-0 text-white text-6xl md:text-8xl cursor-default z-50 w-fit h-fit capitalize"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: labelDuration, ease: "easeOut" }}
        >
          {pageLabel}
        </motion.div>
        <motion.div
          className="h-[100dvh] w-screen fixed bg-black rounded-t-[100px] bottom-0 z-30"
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: overlayDuration } }}
        />
        <div className="h-24">
          <Navbar />
        </div>
        <div className="h-[calc(100dvh-6rem)]">{children}</div>
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;
