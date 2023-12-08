import React from 'react';
import { FaWrench, FaRocket, FaBicycle, FaUsers } from 'react-icons/fa';

const HowWeThinkAndWorkSection: React.FC = () => {
  const gradientColors = "linear-gradient(to right, #4B0082, #D74694,#FF0000)";

  const iconStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    color: '#FF0000', // Purple color
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gradient transition-transform transform hover:scale-105">
          <span style={{ background: gradientColors, WebkitBackgroundClip: 'text', color: 'transparent' }}>
            How We Think & Work
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl font-semibold mb-12 text-gray-800">
          Where Imagination Meets Reality: Igniting Entertainment Experiences Beyond Boundaries
        </p>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Adaptability & Innovation */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <FaWrench style={iconStyle} className="mb-4" />
            <h4 style={{ background: gradientColors, WebkitBackgroundClip: 'text', color: 'transparent' }} className="text-2xl font-bold mb-4">
              Adaptability & Innovation
            </h4>
            <p className="text-gray-600">
              Embracing change and fostering innovation to meet the dynamic needs of our clients and audience.
            </p>
          </div>

          {/* Column 2: Talented Team */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <FaRocket style={iconStyle} className="mb-4" />
            <h4 style={{ background: gradientColors, WebkitBackgroundClip: 'text', color: 'transparent' }} className="text-2xl font-bold mb-4">
              Talented Team
            </h4>
            <p className="text-gray-600">
              Our skilled and creative team is dedicated to delivering exceptional entertainment experiences.
            </p>
          </div>

          {/* Column 3: Exceptional Event Productions */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <FaBicycle style={iconStyle} className="mb-4" />
            <h4 style={{ background: gradientColors, WebkitBackgroundClip: 'text', color: 'transparent' }} className="text-2xl font-bold mb-4">
              Exceptional Event Productions
            </h4>
            <p className="text-gray-600">
              Bringing your events to life with meticulous planning and execution for an extraordinary experience.
            </p>
          </div>

          {/* Column 4: Customer-Centric */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <FaUsers style={iconStyle} className="mb-4" />
            <h4 style={{ background: gradientColors, WebkitBackgroundClip: 'text', color: 'transparent' }} className="text-2xl font-bold mb-4">
              Customer-Centric
            </h4>
            <p className="text-gray-600">
              Putting our customers at the center of everything we do, ensuring satisfaction and meaningful interactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeThinkAndWorkSection;
