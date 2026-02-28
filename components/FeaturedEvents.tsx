
// import React from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import CustomButton from './CustomButton';
// import { HeroProps } from '../types';

// interface Event {
//   id: number;
//   name: string;
//   image: string; // Add this line
//   title: string;
//   subtitle: string;
// }

// interface FeaturedEventProps extends HeroProps {
//     events: Event[]; // Define events as a property
//   }


// const events: Event[] = [
//   { id: 1, name: 'Music', image: '/image1.jpg' ,title: 'Explore Local Wonders', subtitle: 'GeoDiscover unveils the best events near you, creating memorable experiences'},
//   { id: 2, name: 'Weddings', image: '/image2.jpg',title: 'Discover the Unseen', subtitle: 'Connect with GeoDiscover to find hidden gems and events in your vicinity.' },
//   { id: 3, name: 'Weddings', image: '/image3.jpg',title: 'Events Tailored for You', subtitle: 'GeoDiscover crafts personalized event recommendations based on your interests.' },
//   { id: 4, name: 'Weddings', image: '/image4.jpg',title: 'Your Gateway to Local Excitement', subtitle: 'Unlock a world of thrilling events with GeoDiscover, right at your fingertips' },
//   { id: 5, name: 'Weddings', image: '/image5.jpg',title: 'GeoConnect: Where Events Meet You', subtitle: 'Join GeoDiscover to seamlessly connect with events that align with your preferences.' },
//   { id: 6, name: 'Weddings', image: '/image6.jpg',title: 'Local Adventures Await', subtitle: 'Embark on exciting journeys with GeoDiscover, your guide to nearby happenings.'},
//   { id: 7, name: 'Weddings', image: '/image7.jpg',title: 'GeoDiscover: Uncover the Extraordinary', subtitle: 'Experience the extraordinary with GeoDiscover, your trusted companion for local events.' },
//   { id: 8, name: 'Weddings', image: '/image8.jpg',title: 'Events for Every Taste', subtitle: 'GeoDiscover curates a diverse range of events, ensuring there is something for everyone' },
//   { id: 9, name: 'Weddings', image: '/image9.jpg',title: 'GeoExplore: Your Event Companion', subtitle: 'Let GeoDiscover be your guide to exploring events that match your unique preferences' },
//   // Update paths for other events if needed
// ];

// const FeaturedEvent: React.FC<FeaturedEventProps> = ({ buttonText, buttonLink, events }) => {
//     const responsive = {
//       desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1, slidesToSlide: 1 },
//       tablet: { breakpoint: { max: 1024, min: 464 }, items: 1, slidesToSlide: 1 },
//       mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 },
//     };
  
//     return (
//       <div className="relative">
//         <Carousel responsive={responsive} infinite={true}>
//           {events.map((event) => (
//             <div key={event.id} className="relative group">
//               <img src={event.image} alt={event.name} className="rounded-md transition duration-300 transform group-hover:scale-110" />
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
//                 <h3 className="text-xl font-bold">{event.title}</h3>
//                 <p className="text-lg">{event.subtitle}</p>
//                 <CustomButton title={buttonText} link={buttonLink} />
//               </div>
//             </div>
//           ))}
//         </Carousel>
//       </div>
//     );
//   };
  
//   export default FeaturedEvent;