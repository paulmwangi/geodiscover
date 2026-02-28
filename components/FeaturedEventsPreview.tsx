import React from 'react';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight, FaGlobeAmericas } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface PreviewEvent {
  emoji: string;
  title: string;
  location: string;
  category: string;
  color: string;
}

const worldEvents: PreviewEvent[] = [
  { emoji: '🏟️', title: 'Premier League: Arsenal vs Chelsea', location: 'London, UK', category: 'Sports', color: 'from-orange-500 to-red-500' },
  { emoji: '🎵', title: 'Berlin Techno Night', location: 'Berlin, Germany', category: 'Music', color: 'from-violet-500 to-purple-600' },
  { emoji: '🎭', title: 'Kabuki Theatre Experience', location: 'Tokyo, Japan', category: 'Arts & Theatre', color: 'from-pink-500 to-rose-500' },
  { emoji: '🎬', title: 'Cannes Film Festival', location: 'Cannes, France', category: 'Film', color: 'from-cyan-500 to-blue-500' },
  { emoji: '🎪', title: 'Marrakech Food & Spice Festival', location: 'Marrakech, Morocco', category: 'Festival', color: 'from-emerald-500 to-teal-500' },
  { emoji: '🏏', title: 'Cricket World Cup Qualifier', location: 'Melbourne, Australia', category: 'Sports', color: 'from-amber-500 to-orange-500' },
];

const FeaturedEventsPreview: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-full text-primary-600 dark:text-primary-400 text-sm font-medium mb-4">
            <FaGlobeAmericas size={14} />
            Events Worldwide
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Discover Events Across the Globe
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            From Tokyo to London, Buenos Aires to Lagos — find extraordinary experiences in every corner of the world.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {worldEvents.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700/50 hover:shadow-lg hover:border-primary-200 dark:hover:border-primary-700 transition-all h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center text-xl flex-shrink-0`}>
                    {event.emoji}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium text-white bg-gradient-to-r ${event.color}`}>
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-auto">
                  <FaMapMarkerAlt className="text-red-400 flex-shrink-0" size={12} />
                  <span>{event.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 text-sm"
          >
            <FaCalendarAlt />
            Explore All Events
            <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsPreview;
