'use client'

import { useState, useRef, useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Transition } from '@headlessui/react'

interface Testimonial {
  img: StaticImageData
  quote: string
  name: string
  role: string
}


const TestimonialsSlider: React.FC<{ testimonials: Testimonial[] }> = ({ testimonials }) => {
    const testimonialsRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState<number>(0);
    const [autorotate, setAutorotate] = useState<boolean>(true);
    const autoRotateInterval: number = 7000;
  
    useEffect(() => {
      if (!autorotate) return;
      const interval = setInterval(() => {
        setActive((prevActive) => (prevActive + 1 === testimonials.length ? 0 : prevActive + 1));
      }, autoRotateInterval);
      return () => clearInterval(interval);
    }, [active, autorotate]);
  
    const heightFix = () => {
      if (testimonialsRef.current && testimonialsRef.current.parentElement) {
        testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
      }
    };
  
    useEffect(() => {
      heightFix();
    }, []);
  
    return (
      <div className="relative overflow-hidden rounded-3xl shadow-lg mx-auto mb-8 text-center bg-white dark:bg-gray-800 p-8 min-h-[300px]">
        {/* Testimonial image */}
        <div className="relative h-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-primary-500 before:via-indigo-500/5 before:via-25% before:to-indigo-500/0 before:to-75% before:rounded-full before:-z-10">
            <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
              {testimonials.map((testimonial, index) => (
                <Transition
                  key={index}
                  show={active === index}
                  className="absolute inset-0 h-full -z-10"
                  enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                  enterFrom="opacity-0 -rotate-[60deg]"
                  enterTo="opacity-100 rotate-0"
                  leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                  leaveFrom="opacity-100 rotate-0"
                  leaveTo="opacity-0 rotate-[60deg]"
                >
                  <Image className="relative top-11 left-1/2 -translate-x-1/2 rounded-full" src={testimonial.img} width={56} height={56} alt={testimonial.name} />
                </Transition>
              ))}
            </div>
          </div>
        </div>
        {/* Text */}
        <div className="mb-9 transition-all duration-150 delay-300 ease-in-out">
          <div className="relative flex flex-col" ref={testimonialsRef}>
            {testimonials.map((testimonial, index) => (
              <Transition
                key={index}
                show={active === index}
                enter="transition ease-in-out duration-500 delay-200 order-first"
                enterFrom="opacity-0 -translate-x-4"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-out duration-300 delay-300 absolute"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-4"
                beforeEnter={() => heightFix()}
              >
                <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  <q className="text-primary-500">“</q>
                  {testimonial.quote}
                  <q className="text-primary-500">”</q>
                </div>
              </Transition>
            ))}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-wrap justify-center -m-1.5">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              className={`inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 m-1.5 text-sm shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ${
                active === index
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => {
                setActive(index);
                setAutorotate(false);
              }}
            >
              <span className="font-semibold">{testimonial.name}</span> - <span className="text-gray-400">{testimonial.role}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  // Export your TestimonialsSlider component
  export default TestimonialsSlider;