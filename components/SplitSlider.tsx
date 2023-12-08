import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const SplitSlider = () => {
  const [isInView, setIsInView] = useState(false);

  const spring = useSpring({
    opacity: isInView ? 1 : 0,
    leftTextTransform: isInView ? 'translateX(0)' : 'translateX(-20px)',
    rightImagesTransform: isInView ? 'translateX(0)' : 'translateX(20px)',
  });

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsInView(scrollPosition > window.innerHeight / 2);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-r from-purple-900 via-pink-700 to-red-500 text-white p-8 md:p-4">
      <animated.div className="flex-1 flex items-center justify-center">
        <div className={`w-full md:w-1/2 ${isInView ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ease-in-out transform ${spring.leftTextTransform}`}>
          <h2 className="text-xl md:text-3xl font-bold mb-4">Discover Exciting Events Near You</h2>
          <p className="text-sm md:text-base leading-loose">
            GeoDiscover helps you explore a world of events happening in your vicinity. From concerts and workshops to community gatherings, find the events that match your interests and make your weekends memorable.
          </p>
        </div>
      </animated.div>

      <animated.div className={`w-full md:w-1/2 flex items-center justify-center ${spring.rightImagesTransform}`}>
        <div className="md:w-full overflow-hidden md:flex md:flex-col md:items-center md:justify-center">
          <Carousel
            autoPlay={true}
            interval={5000}
            infiniteLoop={true}
            showArrows={false}
            showStatus={false}
            showThumbs={false}
          >
            {[1, 2, 3, 4 , 5 ,7, 8 , 9].map((index) => (
              <div key={index} className="w-full h-full p-1">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={`image${index}.jpg`}
                    alt={`Image ${index}`}
                    className="w-full h-full object-cover rounded-md shadow-md"
                  />
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </animated.div>
    </div>
  );
};

export default SplitSlider;
