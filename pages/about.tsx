// pages/about.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import TestimonialImg01 from '/public/testimonial-01.jpg'
import TestimonialImg02 from '/public/testimonial-02.jpg'
import TestimonialImg03 from '/public/testimonial-03.jpg'
import { TestimonialsSlider } from '../components';


const testimonials = [
  {
    img: TestimonialImg01,
    quote: "The ability to capture responses is a game-changer. If a user gets tired of the sign up and leaves, that data is still persisted. Additionally, it's great to select between formats.",
    name: 'Jessie J',
    role: 'Acme LTD'
  },
  {
    img: TestimonialImg02,
    quote: "Having the power to capture user feedback is revolutionary. Even if a participant abandons the sign-up process midway, their valuable input remains intact.",
    name: 'Nick V',
    role: 'Malika Inc.'
  },
  {
    img: TestimonialImg03,
    quote: "The functionality to capture responses is a true game-changer. Even if a user becomes fatigued during sign-up and abandons the process, their information remains stored.",
    name: 'Amelia W',
    role: 'Panda AI'
  }
]


const AboutUs: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-purple-900 via-pink-700 to-red-500 text-white">
      <div className="container mx-auto p-20">
        {/* Mission Section */}
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16 p-10 rounded-lg shadow-2xl overflow-hidden relative">
      <div className="flex flex-col justify-center space-y-4 z-10 text-center md:text-left">
        <motion.h2 
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 transform transition-transform duration-500 ease-in-out"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Embark on a Cosmic Journey with Us
        </motion.h2>
        <p className="text-lg md:text-xl leading-relaxed text-gray-300">
          Welcome to the heart of innovation at GeoDiscover. Our relentless commitment to exploration and connection propels us toward the cosmos. We aspire to inspire a global community united by curiosity and appreciation for diverse cultures. With cutting-edge technologies, we aim to create immersive and enriching experiences, leaving an indelible cosmic footprint that echoes through the universe.
        </p>
        <Button 
          color="primary" 
          size="md"
          className="mt-4"
        >
          Explore the Cosmos
        </Button>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-80 w-full md:h-96 md:w-96 z-10"
      >
        <Image
          src="/mission_illustration.jpg"
          alt="Mission Illustration"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-200 ease-in-out"
        />
      </motion.div>
      <motion.div 
        className="absolute inset-0 bg-black opacity-50 z-0"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      />
    </section>

        {/* Founding Story Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="relative h-[80vw] md:h-full w-full  rounded-3xl overflow-hidden shadow-2xl md:w-auto"
  >
    <Image
      src="/founding_story_illustration.jpg"
      alt="Founding Story Illustration"
      layout="fill"
      objectFit="cover"
      className="rounded-3xl"
    />
  </motion.div>
  <div className="flex flex-col justify-center text-left">
    <h2 className="text-4xl font-extrabold mb-4 text-white">Our Visionary Journey</h2>
    <p className="text-lg leading-relaxed text-gray-300">
  In 2020, John Doe and Jane Smith embarked on a visionary journey, giving birth to GeoDiscover.
  Rooted in the desire to make exploration accessible to all, our story is a testament to innovation, resilience, and success.
</p>

    <div className="mt-6">
      <a
        href="#"
        className="text-primary font-bold hover:underline transition duration-300"
      >
        Discover Our Innovation
      </a>
    </div>
  </div>
</section>

<section className="mb-16">
      <motion.h2
        className="text-5xl font-extrabold mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Meet Our Team
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Team Member 1 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-transform relative"
        >
          <motion.div
            initial={{ y: -250 }}
            animate={{ y: -10 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src="/team_member1.jpg"
              alt="Team Member 1"
              width={500}
              height={400}
              className="object-cover"
            />
          </motion.div>
          <div className="p-6">
            <motion.h3
              className="text-xl font-semibold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              John Doe
            </motion.h3>
            <motion.p
              className="text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Co-Founder & CEO
            </motion.p>
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
            </motion.div>
          </div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl"
            style={{ visibility: 'hidden' }}
            animate={{ visibility: 'visible' }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex space-x-4"
            >
              <FaTwitter />
              <FaLinkedin />
              <FaGithub />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Team Member 2 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-transform relative"
        >
          {/* ... Similar structure for Team Member 2 ... */}
          <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-transform relative"
        >
          <motion.div
            initial={{ y: -250 }}
            animate={{ y: -10 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src="/team_member2.jpg"
              alt="Team Member 1"
              width={500}
              height={400}
              className="object-cover"
            />
          </motion.div>
          <div className="p-6">
            <motion.h3
              className="text-xl font-semibold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Micheal Kie
            </motion.h3>
            <motion.p
              className="text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
             Innovation Navigator Lead
            </motion.p>
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
            </motion.div>
          </div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl"
            style={{ visibility: 'hidden' }}
            animate={{ visibility: 'visible' }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex space-x-4"
            >
              <FaTwitter />
              <FaLinkedin />
              <FaGithub />
            </motion.div>
          </motion.div>
        </motion.div>
        </motion.div>

        {/* Team Member 3 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-transform relative"
        >
          {/* ... Similar structure for Team Member 3 ... */}
          <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-transform relative"
        >
          <motion.div
            initial={{ y: -250 }}
            animate={{ y: -10 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src="/team_member3.jpg"
              alt="Team Member 1"
              width={500}
              height={400}
              className="object-cover"
            />
          </motion.div>
          <div className="p-6">
            <motion.h3
              className="text-xl font-semibold mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Jane Smith
            </motion.h3>
            <motion.p
              className="text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Exploration Experience Engineer
            </motion.p>
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              
            </motion.div>
          </div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl"
            style={{ visibility: 'hidden' }}
            animate={{ visibility: 'visible' }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex space-x-4"
            >
              <FaTwitter />
              <FaLinkedin />
              <FaGithub />
            </motion.div>
          </motion.div>
        </motion.div>
        </motion.div>
      </div>
    </section>
       

        {/* Testimonials Section */}
        <div><TestimonialsSlider testimonials={testimonials} /></div>
     

        {/* Illustration Credits */}
        <div className="text-center text-gray-300 text-sm mt-8">
          Illustrations by{' '}
          <a
            href="https://www.illustrator-artist.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-400 transition-colors"
          >
            Illustrator Artist
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
