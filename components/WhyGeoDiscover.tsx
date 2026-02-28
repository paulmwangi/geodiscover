import React from 'react';
import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaMapMarkedAlt, FaBolt, FaShieldAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FaGlobeAmericas className="text-2xl" />,
    title: 'Worldwide Coverage',
    description: 'Access events from over 50 countries — from music festivals in Europe to tech expos in Asia and sports in South America.',
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: <FaMapMarkedAlt className="text-2xl" />,
    title: 'Interactive Maps',
    description: 'Pin events on a beautiful interactive map. Click anywhere in the world to add your own events and share them with the community.',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
  },
  {
    icon: <FaBolt className="text-2xl" />,
    title: 'Real-Time Discovery',
    description: 'Instantly discover what\'s happening near you or anywhere on the planet. Filter by category, date, or keyword.',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: <FaShieldAlt className="text-2xl" />,
    title: 'Community Driven',
    description: 'Anyone can add events. Our community-powered platform ensures you always find authentic, local experiences.',
    color: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
  },
];

const WhyGeoDiscover: React.FC = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why GeoDiscover?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            We make it effortless to find, share, and experience events anywhere in the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex gap-5 bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700 transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} bg-gradient-to-br flex items-center justify-center flex-shrink-0`}>
                <span className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.icon}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyGeoDiscover;
