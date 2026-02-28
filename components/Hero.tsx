import { FaBriefcase, FaGlobe, FaCampground, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description, link }) => {
  return (
    <Link href={link} className="group flex-1">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-white/20 border border-white/10">
        <div className="mb-3">{icon}</div>
        <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
        <p className="text-white/70 text-sm leading-relaxed">{description}</p>
        <span className="mt-3 inline-flex items-center text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Learn More <FaArrowRight className="ml-1 text-xs" />
        </span>
      </div>
    </Link>
  );
};

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const parallaxOffset = scrollPosition / 2;
  const backgroundPosition = `center calc(50% + ${parallaxOffset}px)`;
  const transitionStyle = {
    transition: "background-position 0.3s ease-out",
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/bg2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: backgroundPosition,
          ...transitionStyle,
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />

      {/* Centered Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pb-48 md:pb-56">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
          🌍 Event Discovery Platform
        </span>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Discover Events Happening Worldwide
        </h1>

        {/* Subtitle */}
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Find concerts in London, festivals in Tokyo, sports in Buenos Aires, and community events near you. Your next unforgettable experience awaits.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            <FaCalendarAlt />
            Explore Events
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/10"
          >
            Learn More
            <FaArrowRight />
          </Link>
        </div>
      </div>

      {/* Bottom Feature Cards */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 px-4">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card
            icon={<FaBriefcase className="text-cyan-400 text-3xl" />}
            title="Tours"
            description="Explore the world with our guided tours."
            link="/tours"
          />
          <Card
            icon={<FaGlobe className="text-cyan-400 text-3xl" />}
            title="Explore"
            description="Discover the wonders of our planet."
            link="/explore"
          />
          <Card
            icon={<FaCampground className="text-cyan-400 text-3xl" />}
            title="Adventure"
            description="Experience thrilling outdoor adventures."
            link="/adventure"
          />
          <Card
            icon={<FaUser className="text-cyan-400 text-3xl" />}
            title="Contact"
            description="Get in touch for inquiries or assistance."
            link="/contact"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
