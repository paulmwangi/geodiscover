import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface AnimatedNumberProps {
  value: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="text-4xl font-bold text-primary-600 dark:text-primary-400"
    >
      {inView ? <CountUp end={value} duration={1} separator="," /> : value}
    </motion.span>
  );
};

const StatisticsSection: React.FC = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Our Global Impact
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Connecting people with extraordinary experiences across the globe.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700 transition-all"
          >
            <AnimatedNumber value={500} />
            <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">+</span>
            <h3 className="text-lg font-semibold mt-4 text-gray-900 dark:text-white">Events</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Diverse and captivating events across every continent, from intimate gatherings to massive festivals.
            </p>
          </motion.div>

          {/* Column 2: Countries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700 transition-all"
          >
            <AnimatedNumber value={50} />
            <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">+</span>
            <h3 className="text-lg font-semibold mt-4 text-gray-900 dark:text-white">Countries</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Events spanning six continents, connecting cultures from Tokyo to Buenos Aires and beyond.
            </p>
          </motion.div>

          {/* Column 3: Tickets Sold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700 transition-all"
          >
            <AnimatedNumber value={25480} />
            <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">+</span>
            <h3 className="text-lg font-semibold mt-4 text-gray-900 dark:text-white">Tickets Sold</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Our events have garnered incredible support, creating an atmosphere of excitement and anticipation.
            </p>
          </motion.div>

          {/* Column 3: Happy Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700 transition-all"
          >
            <AnimatedNumber value={250000} />
            <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">+</span>
            <h3 className="text-lg font-semibold mt-4 text-gray-900 dark:text-white">Happy Clients</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              We take pride in creating experiences that exceed expectations, leaving clients eager to return.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
