// Fallback event data used when the Ticketmaster API key is not configured.
// This allows the site to function without a Ticketmaster API key.

export interface FallbackEvent {
  id: string;
  name: string;
  type: string;
  url: string;
  info: string;
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
  };
  classifications: Array<{
    segment: { name: string };
    genre: { name: string };
  }>;
  images: Array<{
    url: string;
    width: number;
    height: number;
  }>;
  _embedded: {
    venues: Array<{
      name: string;
      city: { name: string };
      state: { name: string };
      country: { name: string };
      location: { longitude: string; latitude: string };
    }>;
  };
}

function getFutureDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
}

export function getFallbackEvents(classification?: string): FallbackEvent[] {
  const allEvents: FallbackEvent[] = [
    // Sports events — worldwide
    {
      id: 'fallback-sports-1',
      name: 'City Championship Basketball Game',
      type: 'event',
      url: '#',
      info: 'Experience the thrill of live basketball as the top two city teams battle for the championship title.',
      dates: { start: { localDate: getFutureDate(7), localTime: '19:00:00' } },
      classifications: [{ segment: { name: 'Sports' }, genre: { name: 'Basketball' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Downtown Arena', city: { name: 'New York' }, state: { name: 'New York' }, country: { name: 'United States' }, location: { longitude: '-73.9857', latitude: '40.7484' } }] },
    },
    {
      id: 'fallback-sports-2',
      name: 'Tokyo Marathon 2026',
      type: 'event',
      url: '#',
      info: 'Join thousands of runners for the annual Tokyo marathon through the heart of the city, passing landmarks like the Imperial Palace.',
      dates: { start: { localDate: getFutureDate(14), localTime: '07:00:00' } },
      classifications: [{ segment: { name: 'Sports' }, genre: { name: 'Running' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Tokyo Metropolitan Area', city: { name: 'Tokyo' }, state: { name: 'Kanto' }, country: { name: 'Japan' }, location: { longitude: '139.6917', latitude: '35.6895' } }] },
    },
    {
      id: 'fallback-sports-3',
      name: 'Premier League: Arsenal vs Chelsea',
      type: 'event',
      url: '#',
      info: 'Watch top-tier football action live at the Emirates Stadium with an electric London derby atmosphere.',
      dates: { start: { localDate: getFutureDate(10), localTime: '15:00:00' } },
      classifications: [{ segment: { name: 'Sports' }, genre: { name: 'Soccer' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Emirates Stadium', city: { name: 'London' }, state: { name: 'England' }, country: { name: 'United Kingdom' }, location: { longitude: '-0.1085', latitude: '51.5549' } }] },
    },
    {
      id: 'fallback-sports-4',
      name: 'Roland Garros Tennis Open',
      type: 'event',
      url: '#',
      info: 'The grand finale of the French Open featuring the world\'s top-ranked players on legendary clay courts.',
      dates: { start: { localDate: getFutureDate(21), localTime: '14:00:00' } },
      classifications: [{ segment: { name: 'Sports' }, genre: { name: 'Tennis' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Stade Roland Garros', city: { name: 'Paris' }, state: { name: 'Île-de-France' }, country: { name: 'France' }, location: { longitude: '2.2530', latitude: '48.8469' } }] },
    },
    {
      id: 'fallback-sports-5',
      name: 'Cricket World Cup Qualifier',
      type: 'event',
      url: '#',
      info: 'An electrifying cricket match as nations compete for a spot in the World Cup finals at the iconic MCG.',
      dates: { start: { localDate: getFutureDate(25), localTime: '13:00:00' } },
      classifications: [{ segment: { name: 'Sports' }, genre: { name: 'Cricket' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Melbourne Cricket Ground', city: { name: 'Melbourne' }, state: { name: 'Victoria' }, country: { name: 'Australia' }, location: { longitude: '144.9834', latitude: '-37.8200' } }] },
    },
    {
      id: 'fallback-sports-6',
      name: 'Cape Town Cycling Tour',
      type: 'event',
      url: '#',
      info: 'The world\'s largest timed cycling event along the stunning Cape Peninsula coastline.',
      dates: { start: { localDate: getFutureDate(30), localTime: '06:30:00' } },
      classifications: [{ segment: { name: 'Sports' }, genre: { name: 'Cycling' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Cape Town Stadium', city: { name: 'Cape Town' }, state: { name: 'Western Cape' }, country: { name: 'South Africa' }, location: { longitude: '18.4115', latitude: '-33.9036' } }] },
    },

    // Music events — worldwide
    {
      id: 'fallback-music-1',
      name: 'Summer Jazz Festival',
      type: 'event',
      url: '#',
      info: 'An evening of smooth jazz featuring renowned artists from around the world.',
      dates: { start: { localDate: getFutureDate(5), localTime: '20:00:00' } },
      classifications: [{ segment: { name: 'Music' }, genre: { name: 'Jazz' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Riverside Amphitheater', city: { name: 'Nashville' }, state: { name: 'Tennessee' }, country: { name: 'United States' }, location: { longitude: '-86.7816', latitude: '36.1627' } }] },
    },
    {
      id: 'fallback-music-2',
      name: 'Berlin Techno Night',
      type: 'event',
      url: '#',
      info: 'Experience the legendary Berlin club scene with world-renowned DJs spinning all night long.',
      dates: { start: { localDate: getFutureDate(12), localTime: '23:00:00' } },
      classifications: [{ segment: { name: 'Music' }, genre: { name: 'Electronic' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Watergate Club', city: { name: 'Berlin' }, state: { name: 'Berlin' }, country: { name: 'Germany' }, location: { longitude: '13.4050', latitude: '52.5200' } }] },
    },
    {
      id: 'fallback-music-3',
      name: 'Samba Carnival Concert',
      type: 'event',
      url: '#',
      info: 'Feel the rhythm of Brazil with live samba performances and carnival dancers at the Sambadrome.',
      dates: { start: { localDate: getFutureDate(3), localTime: '21:00:00' } },
      classifications: [{ segment: { name: 'Music' }, genre: { name: 'Latin' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Sambadrome Marquês de Sapucaí', city: { name: 'Rio de Janeiro' }, state: { name: 'Rio de Janeiro' }, country: { name: 'Brazil' }, location: { longitude: '-43.1729', latitude: '-22.9068' } }] },
    },
    {
      id: 'fallback-music-4',
      name: 'Vienna Classical Symphony',
      type: 'event',
      url: '#',
      info: 'A breathtaking performance of Mozart and Beethoven masterpieces in the iconic Musikverein concert hall.',
      dates: { start: { localDate: getFutureDate(18), localTime: '19:00:00' } },
      classifications: [{ segment: { name: 'Music' }, genre: { name: 'Classical' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Musikverein', city: { name: 'Vienna' }, state: { name: 'Vienna' }, country: { name: 'Austria' }, location: { longitude: '16.3738', latitude: '48.2002' } }] },
    },
    {
      id: 'fallback-music-5',
      name: 'K-Pop World Festival',
      type: 'event',
      url: '#',
      info: 'A spectacular showcase of the hottest K-pop acts performing at the COEX Artium stage.',
      dates: { start: { localDate: getFutureDate(22), localTime: '18:00:00' } },
      classifications: [{ segment: { name: 'Music' }, genre: { name: 'Pop' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'COEX Artium', city: { name: 'Seoul' }, state: { name: 'Seoul' }, country: { name: 'South Korea' }, location: { longitude: '127.0596', latitude: '37.5120' } }] },
    },
    {
      id: 'fallback-music-6',
      name: 'Afrobeats Live Lagos',
      type: 'event',
      url: '#',
      info: 'A vibrant evening of Afrobeats featuring Nigeria\'s biggest artists at the Eko Convention Center.',
      dates: { start: { localDate: getFutureDate(8), localTime: '20:00:00' } },
      classifications: [{ segment: { name: 'Music' }, genre: { name: 'World' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Eko Convention Center', city: { name: 'Lagos' }, state: { name: 'Lagos' }, country: { name: 'Nigeria' }, location: { longitude: '3.4216', latitude: '6.4281' } }] },
    },

    // Arts & Theatre events — worldwide
    {
      id: 'fallback-arts-1',
      name: 'Broadway Musical: Starlight',
      type: 'event',
      url: '#',
      info: 'A dazzling new musical that has taken Broadway by storm with stunning performances.',
      dates: { start: { localDate: getFutureDate(8), localTime: '19:30:00' } },
      classifications: [{ segment: { name: 'Arts & Theatre' }, genre: { name: 'Musical' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Grand Theatre', city: { name: 'New York' }, state: { name: 'New York' }, country: { name: 'United States' }, location: { longitude: '-73.9857', latitude: '40.7580' } }] },
    },
    {
      id: 'fallback-arts-2',
      name: 'Louvre After Hours: Renaissance Unveiled',
      type: 'event',
      url: '#',
      info: 'An exclusive evening tour of the Louvre\'s Renaissance masterpieces, guided by expert curators.',
      dates: { start: { localDate: getFutureDate(2), localTime: '19:00:00' } },
      classifications: [{ segment: { name: 'Arts & Theatre' }, genre: { name: 'Fine Art' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Musée du Louvre', city: { name: 'Paris' }, state: { name: 'Île-de-France' }, country: { name: 'France' }, location: { longitude: '2.3376', latitude: '48.8606' } }] },
    },
    {
      id: 'fallback-arts-3',
      name: 'Kabuki Theatre Experience',
      type: 'event',
      url: '#',
      info: 'Witness the stunning traditional Japanese Kabuki performance at the historic Kabuki-za Theatre.',
      dates: { start: { localDate: getFutureDate(15), localTime: '16:00:00' } },
      classifications: [{ segment: { name: 'Arts & Theatre' }, genre: { name: 'Theatre' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Kabuki-za Theatre', city: { name: 'Tokyo' }, state: { name: 'Kanto' }, country: { name: 'Japan' }, location: { longitude: '139.7671', latitude: '35.6693' } }] },
    },
    {
      id: 'fallback-arts-4',
      name: 'Stand-Up Comedy Night',
      type: 'event',
      url: '#',
      info: 'An evening of laughs with top comedians performing their latest material at the Apollo.',
      dates: { start: { localDate: getFutureDate(4), localTime: '20:30:00' } },
      classifications: [{ segment: { name: 'Arts & Theatre' }, genre: { name: 'Comedy' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Hammersmith Apollo', city: { name: 'London' }, state: { name: 'England' }, country: { name: 'United Kingdom' }, location: { longitude: '-0.2255', latitude: '51.4928' } }] },
    },
    {
      id: 'fallback-arts-5',
      name: 'Bollywood Dance Spectacular',
      type: 'event',
      url: '#',
      info: 'A mesmerizing showcase of Bollywood dance featuring over 100 performers on a grand stage.',
      dates: { start: { localDate: getFutureDate(19), localTime: '18:30:00' } },
      classifications: [{ segment: { name: 'Arts & Theatre' }, genre: { name: 'Dance' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'National Centre for Performing Arts', city: { name: 'Mumbai' }, state: { name: 'Maharashtra' }, country: { name: 'India' }, location: { longitude: '72.8158', latitude: '18.9220' } }] },
    },

    // Film events — worldwide
    {
      id: 'fallback-film-1',
      name: 'Cannes Film Festival Screening',
      type: 'event',
      url: '#',
      info: 'A curated showcase of the best independent and international films at the world\'s most prestigious film festival.',
      dates: { start: { localDate: getFutureDate(6), localTime: '18:00:00' } },
      classifications: [{ segment: { name: 'Film' }, genre: { name: 'Film' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Palais des Festivals', city: { name: 'Cannes' }, state: { name: 'Provence-Alpes-Côte d\'Azur' }, country: { name: 'France' }, location: { longitude: '7.0174', latitude: '43.5513' } }] },
    },
    {
      id: 'fallback-film-2',
      name: 'Documentary Screening: Planet Earth',
      type: 'event',
      url: '#',
      info: 'A special IMAX screening of an award-winning documentary about our planet at the iconic BFI.',
      dates: { start: { localDate: getFutureDate(9), localTime: '17:00:00' } },
      classifications: [{ segment: { name: 'Film' }, genre: { name: 'Documentary' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'BFI IMAX', city: { name: 'London' }, state: { name: 'England' }, country: { name: 'United Kingdom' }, location: { longitude: '-0.1139', latitude: '51.5045' } }] },
    },
    {
      id: 'fallback-film-3',
      name: 'Toronto International Film Festival',
      type: 'event',
      url: '#',
      info: 'Premieres of highly anticipated films from around the world at one of North America\'s top festivals.',
      dates: { start: { localDate: getFutureDate(13), localTime: '19:00:00' } },
      classifications: [{ segment: { name: 'Film' }, genre: { name: 'Film' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'TIFF Bell Lightbox', city: { name: 'Toronto' }, state: { name: 'Ontario' }, country: { name: 'Canada' }, location: { longitude: '-79.3899', latitude: '43.6465' } }] },
    },

    // Miscellaneous events — worldwide
    {
      id: 'fallback-misc-1',
      name: 'Tech Innovation Expo',
      type: 'event',
      url: '#',
      info: 'Discover the latest in technology and innovation at this annual expo featuring startups from around the globe.',
      dates: { start: { localDate: getFutureDate(11), localTime: '09:00:00' } },
      classifications: [{ segment: { name: 'Miscellaneous' }, genre: { name: 'Expo' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Marina Bay Sands Expo', city: { name: 'Singapore' }, state: { name: 'Singapore' }, country: { name: 'Singapore' }, location: { longitude: '103.8610', latitude: '1.2834' } }] },
    },
    {
      id: 'fallback-misc-2',
      name: 'Marrakech Food & Spice Festival',
      type: 'event',
      url: '#',
      info: 'Sample exquisite Moroccan cuisine, spices, and street food in the vibrant souks of Marrakech.',
      dates: { start: { localDate: getFutureDate(16), localTime: '11:00:00' } },
      classifications: [{ segment: { name: 'Miscellaneous' }, genre: { name: 'Festival' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Jemaa el-Fnaa', city: { name: 'Marrakech' }, state: { name: 'Marrakech-Safi' }, country: { name: 'Morocco' }, location: { longitude: '-7.9811', latitude: '31.6258' } }] },
    },
    {
      id: 'fallback-misc-3',
      name: 'Dubai World Expo Innovation Pavilion',
      type: 'event',
      url: '#',
      info: 'Explore groundbreaking innovations from over 190 countries at the Dubai World Expo.',
      dates: { start: { localDate: getFutureDate(20), localTime: '10:00:00' } },
      classifications: [{ segment: { name: 'Miscellaneous' }, genre: { name: 'Expo' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Dubai Exhibition Centre', city: { name: 'Dubai' }, state: { name: 'Dubai' }, country: { name: 'United Arab Emirates' }, location: { longitude: '55.2708', latitude: '25.2048' } }] },
    },
    {
      id: 'fallback-misc-4',
      name: 'Buenos Aires Tango Festival',
      type: 'event',
      url: '#',
      info: 'The world\'s largest tango festival featuring milongas, workshops, and spectacular stage shows.',
      dates: { start: { localDate: getFutureDate(28), localTime: '19:00:00' } },
      classifications: [{ segment: { name: 'Miscellaneous' }, genre: { name: 'Festival' } }],
      images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', width: 600, height: 400 }],
      _embedded: { venues: [{ name: 'Usina del Arte', city: { name: 'Buenos Aires' }, state: { name: 'Buenos Aires' }, country: { name: 'Argentina' }, location: { longitude: '-58.3655', latitude: '-34.6345' } }] },
    },
  ];

  if (!classification) {
    return allEvents;
  }

  const classificationLower = classification.toLowerCase();
  return allEvents.filter((event) => {
    const segment = event.classifications[0]?.segment?.name?.toLowerCase() || '';
    return segment === classificationLower ||
      (classificationLower === 'theatre' && segment === 'arts & theatre') ||
      (classificationLower === 'arts' && segment === 'arts & theatre');
  });
}

export function getFallbackAttractions() {
  return {
    _embedded: {
      attractions: [
        { id: 'fallback-attr-1', name: 'City Sports League', type: 'attraction', url: '#', classifications: [{ segment: { name: 'Sports' } }], images: [{ url: 'https://images.unsplash.com/photo-1461896836934-bd45ba7b5742?w=300&h=200&fit=crop', width: 300, height: 200 }] },
        { id: 'fallback-attr-2', name: 'Jazz Ensemble', type: 'attraction', url: '#', classifications: [{ segment: { name: 'Music' } }], images: [{ url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&h=200&fit=crop', width: 300, height: 200 }] },
        { id: 'fallback-attr-3', name: 'Theatre Company', type: 'attraction', url: '#', classifications: [{ segment: { name: 'Arts & Theatre' } }], images: [{ url: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=300&h=200&fit=crop', width: 300, height: 200 }] },
      ],
    },
  };
}

export function getFallbackClassifications() {
  return {
    _embedded: {
      classifications: [
        { segment: { id: 'sports', name: 'Sports' }, type: { id: 'event', name: 'Event' } },
        { segment: { id: 'music', name: 'Music' }, type: { id: 'event', name: 'Event' } },
        { segment: { id: 'arts-theatre', name: 'Arts & Theatre' }, type: { id: 'event', name: 'Event' } },
        { segment: { id: 'film', name: 'Film' }, type: { id: 'event', name: 'Event' } },
        { segment: { id: 'miscellaneous', name: 'Miscellaneous' }, type: { id: 'event', name: 'Event' } },
      ],
    },
  };
}
