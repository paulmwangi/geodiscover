import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Spinner, Input, Select, Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import React, { ChangeEvent } from 'react';
import { EventForm, LeafletMap} from '../components';
import 'leaflet/dist/leaflet.css';



interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

interface ApiEvent {
  id: string;
  name: string;
  dates: {
    start: {
      localDate: string;
      localTime: string;
    };
  };
  _embedded: {
    venues: Array<{
      name: string;
      city: {
        name: string;
      };
    }>;
  };
  info: string;
  images: Array<{
    url: string;
  }>;
}
// const LeafletMap = dynamic(() => import('../components/LeafletMap'), {
//   ssr: false, // This will prevent the component from being rendered on the server
// });


const LoadingSpinner: React.FC = () => <Spinner />;
const ErrorMessage: React.FC<{ error: string }> = ({ error }) => (
  <div className="text-red-500 font-bold">{`Error fetching events: ${error}`}</div>
);

export default function Events() {
  const [eventsByCategory, setEventsByCategory] = useState<{ [key: string]: Event[] }>({});
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [classifications, setClassifications] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const classifications = ['sports', 'music', 'Arts & Theatre', 'Film','Miscellaneous', 'Transportation', 'Parking' ];
        const categorizedEvents: { [key: string]: Event[] } = {};

        for (const classification of classifications) {
          const response = await axios.get(
            `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${classification}&size=32&apikey=Ioy6HZKL50qYLEJMoCtNAr65PsEqlBPH`
          );

          const events = response.data._embedded.events.map((event: ApiEvent) => ({
            id: event.id,
            name: event.name,
            date: event.dates.start.localDate,
            time: event.dates.start.localTime,
            location: `${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}`,
            description: event.info,
            image: event.images[0].url,
          }));

          categorizedEvents[classification] = events;
        }

        setEventsByCategory(categorizedEvents);
        setClassifications(classifications);
        setFilteredEvents(categorizedEvents[classifications[0]]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('An error occurred while fetching events.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setFilteredEvents(eventsByCategory[category]);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    // Implement filtering by date here
    // setFilteredEvents(filteredEvents.filter((event) => event.date === date));
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedDate('');
    setFilteredEvents(eventsByCategory[classifications[0]]);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const handleAddEvent = (newEvent: Event) => {
    setEventsByCategory((prevEvents) => {
      const category = selectedCategory || classifications[0];
      const updatedEvents = { ...prevEvents, [category]: [...prevEvents[category], newEvent] };
      return updatedEvents;
    });
  };
  return (
    <div className="min-h-screen p-20 bg-gray-300 relative z-20">


      <div className="flex items-center space-x-4 mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e)}
          className="text-black p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
        >
          <option value="" disabled hidden className="text-gray-500">
            Select Category
          </option>
          {classifications.map((category) => (
            <option key={category} value={category} className="text-black">
              {category}
            </option>
          ))}
        </select>

        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          placeholder="Select Date"
          className="text-black"
        />

        <Button
          onClick={clearFilters}
          disabled={!selectedCategory && !selectedDate}
          color="danger"
          className="bg-gradient-to-r from-teal-500 via-teal-400 to-teal-300 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-red"
        >
          Clear Filters
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          {/* You may customize the LoadingSpinner component as needed */}
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 font-bold">{`Error fetching events: ${error}`}</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={cardVariants}
        >
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="m-2"
            >
              <Card
                shadow="lg"
                className="bg-gradient-to-b from-purple-600 to-indigo-600 rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  className="w-full h-64 object-cover rounded-t-md"
                  src={event.image}
                  alt={event.name}
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-3 text-yellow-300">{event.name}</h3>
                  <p className="text-sm mb-3 text-white-600">
                    <strong>Date:</strong> {event.date} at {event.time}
                  </p>
                  <p className="text-sm text-white-600">
                    <strong>Location:</strong> {event.location}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
   <div style={{ backgroundColor: 'teal', borderRadius: '20px', padding: '3em' }}>
  <div style={{ display: 'flex', width: '100%', height: 'calc(100vh - 2em)', backgroundColor: 'teal', borderRadius: '15px' }}>
    <div id="map-container" style={{ flex: 3, borderRight: '1px solid #ccc' }}>
      <LeafletMap />
    </div>
    <div className="mt-1" style={{ flex: 1, padding: '1em' }}>
      <EventForm onSubmit={handleAddEvent} />
    </div>
  </div>
</div>


     
    </div>
  );
}
