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
      className="text-4xl font-bold bg-gradient-to-r from-purple-900 via-pink-700 to-red-500 text-transparent bg-clip-text"
    >
      {inView ? <CountUp end={value} duration={1} separator="," /> : value}
    </motion.span>
  );
};

const StatisticsSection: React.FC = () => {
  return (
    <section className="bg-white p-24"> {/* Increased padding to make the section larger */}
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Column 1: Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-md shadow-md text-center border border-gray-200" // Added a subtle border
          >
            <AnimatedNumber value={100} />
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-900 via-pink-700 to-red-500 text-transparent bg-clip-text">+</span>
            <h3 className="text-xl font-semibold mt-4 text-purple-900">Events</h3>
            <p className="text-gray-800 mt-2">
            Over the years, we've proudly hosted a myriad of diverse and captivating events, bringing people together to celebrate, learn, and create unforgettable memories. Our commitment to excellence and innovation has made each event a unique and enriching experience.
            </p>
          </motion.div>

          {/* Column 2: Tickets Sold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-md shadow-md text-center border border-gray-200" // Added a subtle border
          >
            <AnimatedNumber value={25480} />
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-900 via-pink-700 to-red-500 text-transparent bg-clip-text">+</span>
            <h3 className="text-xl font-semibold mt-4 text-purple-900">Tickets Sold</h3>
            <p className="text-gray-800 mt-2">
            Our events have garnered incredible support from enthusiastic attendees like you. With each passing event, we've seen a surge in ticket sales, creating an atmosphere of excitement and anticipation.
            </p>
          </motion.div>

          {/* Column 3: Happy Clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-8 rounded-md shadow-md text-center border border-gray-200" // Added a subtle border
          >
            <AnimatedNumber value={250000} />
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-900 via-pink-700 to-red-500 text-transparent bg-clip-text" >+</span>
            <h3 className="text-xl font-semibold mt-4 text-purple-900">Happy Clients</h3>
            <p className="text-gray-800 mt-2">
            Our success is measured by the satisfaction of our valued clients. Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. We take pride in creating experiences that not only meet but exceed the expectations of our clients, leaving them delighted and eager to return for more memorable events.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
