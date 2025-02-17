import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Background gradient effect */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(155, 135, 245, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 z-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

      {/* Content */}
      <div className="relative z-40">
        <h1 className="text-5xl font-extrabold text-white mb-6 animate-fadeIn">
        Master the Art of Digital Success 
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mb-6 animate-fadeIn delay-200">
        Premium courses designed to transform your skills into profitable digital ventures.
        </p>
        <div className="flex gap-6 justify-center">
          <button className="px-6 py-3 bg-primary rounded-xl text-white text-lg hover:bg-purple-600 transition-all duration-300">
            Get Started
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded-xl text-white text-lg hover:bg-gray-700 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
