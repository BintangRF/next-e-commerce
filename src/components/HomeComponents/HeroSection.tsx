import React from "react";
import { Section } from "../Section";

export const HeroSection: React.FC = () => {
  return (
    <Section className="relative text-center flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl text-white shadow-lg overflow-hidden p-10 md:p-20">
      {/* Background Shape */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-300 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>

      {/* Heading */}
      <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate-fadeIn">
        Welcome to <span className="text-yellow-300">NextStore</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl opacity-90 mb-8 animate-fadeIn delay-200">
        Discover the latest products with best deals just for you ✨
      </p>

      {/* Call To Action Button */}
      <div className="flex justify-center gap-4">
        <button className="bg-yellow-300 text-indigo-900 font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
          Shop Now
        </button>
        <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300">
          Learn More
        </button>
      </div>
    </Section>
  );
};
