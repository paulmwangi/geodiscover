
import { FaBriefcase, FaGlobe, FaCampground, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { FaArrowRight } from 'react-icons/fa';
interface ReadMoreLinkProps {
  href: string;
  text: string;
}
interface CardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  color: string;
}



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

  // Calculate parallax effect for background position
  const parallaxOffset = scrollPosition / 2;
  const backgroundPosition = `center calc(50% + ${parallaxOffset}px)`;
   // Add transition for smoother effect
   const transitionStyle = {
    transition: "background-position 0.3s ease-out", // Adjust the duration and easing as needed
  };
  const ReadMoreLink: React.FC<ReadMoreLinkProps> = ({ href, text }) => {
    return (
      <Link href={href}>
        <p className="inline-flex items-center bg-gradient-to-r from-purple-900 via-pink-700 to-red-500 text-white py-2 px-6 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
          <span className="mr-2">{text}</span>
          <FaArrowRight />
        </p>
      </Link>
    );
  };

  const Card: React.FC<CardProps> = ({ icon, title, subtitle, description, link, color }) => {
    return (
      <div className={`bg-${color}-100 p-4 rounded-lg shadow-md flex flex-col items-center aspect-w-1 aspect-h-1 sm:aspect-w-2 sm:aspect-h-3 md:aspect-w-1 md:aspect-h-1 transition-all duration-300 ease-in-out transform hover:scale-105`}>
        {/* Icon */}
        {icon}
        {/* Subtitle */}
        <p className={`text-${color}-500 text-sm`}>{subtitle}</p>
        {/* Sample Text */}
        <p className="text-center text-white-600 text-sm">{description}</p>
        {/* Link */}
        <Link href={link} className={`mt-2 text-${color}-500 hover:underline`}>
          Learn More
        </Link>
      </div>
    );
  };
  

  return (
    <div className="relative bg-cover bg-center min-h-screen flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-black opacity-60"
        style={{
          backgroundImage: "url('/bg2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: backgroundPosition,
          ...transitionStyle,
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 text-white text-center mx-auto max-w-2xl p-4">
        {/* Company Logo */}
        <img
          src="/GeoDiscover.png"
          alt="Company Logo"
          // className="mx-auto mb-4 w-16"
          style={{ maxWidth: '100%', height: 'auto' }}
        />

        {/* Main Title */}
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl text-white text-center mb-4">
          Explore events near you 
        </h1>
        {/* Read More Button with Hover Effect */}
        <ReadMoreLink href="/about" text="Read More" />
      </div>
      
     {/* Cards Section with Hover Effect */}
     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8 flex space-x-4 w-full max-w-screen-xl mx-auto">
        {/* Card 1 */}
        <Card
          icon={<FaBriefcase className="text-blue-500 text-3xl mb-2" />}
          title="Tours"
          subtitle="Explore the world"
          description="Explore the world with our guided tours."
          link="/tours"
          color="blue"
        />

        {/* Card 2 */}
        <Card
          icon={<FaGlobe className="text-green-500 text-3xl mb-2" />}
          title="Explore the World"
          subtitle="Embark on a journey"
          description="Embark on a journey to explore the wonders of our planet."
          link="/explore"
          color="green"
        />

        {/* Card 3 */}
        <Card
          icon={<FaCampground className="text-orange-500 text-3xl mb-2" />}
          title="Adventure Vacations"
          subtitle="Thrilling adventures"
          description="Experience thrilling adventures with our vacation packages."
          link="/adventure"
          color="orange"
        />

        {/* Card 4 */}
        <Card
          icon={<FaUser className="text-purple-500 text-3xl mb-2" />}
          title="Contact"
          subtitle="Connect with us"
          description="Connect with us for any inquiries or assistance."
          link="/contact"
          color="purple"
        />
      </div>
    </div>
  );
};

export default Hero;
