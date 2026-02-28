import React from 'react';
import { FaWrench, FaRocket, FaBicycle, FaUsers } from 'react-icons/fa';

const HowWeThinkAndWorkSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto text-center px-6">
        {/* Section Title */}
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          How We Think &amp; Work
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Where Imagination Meets Reality: Igniting Entertainment Experiences Beyond Boundaries
        </p>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Adaptability & Innovation */}
          <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700 transition-all">
            <FaWrench className="text-3xl text-primary-500 mb-4" />
            <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Adaptability &amp; Innovation
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Embracing change and fostering innovation to meet the dynamic needs of our clients and audience.
            </p>
          </div>

          {/* Column 2: Talented Team */}
          <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700 transition-all">
            <FaRocket className="text-3xl text-primary-500 mb-4" />
            <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Talented Team
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Our skilled and creative team is dedicated to delivering exceptional entertainment experiences.
            </p>
          </div>

          {/* Column 3: Exceptional Event Productions */}
          <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700 transition-all">
            <FaBicycle className="text-3xl text-primary-500 mb-4" />
            <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Exceptional Event Productions
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Bringing your events to life with meticulous planning and execution for an extraordinary experience.
            </p>
          </div>

          {/* Column 4: Customer-Centric */}
          <div className="flex flex-col items-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700 transition-all">
            <FaUsers className="text-3xl text-primary-500 mb-4" />
            <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Customer-Centric
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Putting our customers at the center of everything we do, ensuring satisfaction and meaningful interactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeThinkAndWorkSection;
