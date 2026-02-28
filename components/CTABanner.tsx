import React from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const CTABanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 dark:from-primary-800 dark:via-primary-900 dark:to-accent-800">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Ready to Discover What&apos;s Happening Near You?
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              From live concerts and sports to art exhibitions and community meetups — find your next unforgettable experience on the map.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 text-sm"
              >
                <FaMapMarkerAlt />
                Explore Events
                <FaArrowRight size={12} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-sm"
              >
                <FaCalendarAlt />
                Get in Touch
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0 hidden lg:flex items-center gap-6">
            <div className="flex flex-col gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-white/70">Events</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-white/70">Cities</div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-white">250K+</div>
                <div className="text-sm text-white/70">Users</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-center">
                <div className="text-3xl font-bold text-white">4.9★</div>
                <div className="text-sm text-white/70">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
