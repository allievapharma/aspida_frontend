import React from "react";
// import { motion } from "framer-motion";
import loaderpgn from "../assets/image/loader/loader.mp4";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
      {/* Video Loader */}
      <div className="loader-video">
        <video
          className="video-player"
          autoPlay   // ✅ Capital P
          loop
          muted
          playsInline // ✅ Mobile support
        >
          <source src={loaderpgn} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Optional Spinner */}
      {/* <motion.div
        className="mt-4 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
      /> */}
    </div>
  );
};

export default Loader;
