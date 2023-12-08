import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  Image,
  Box,
  Heading,
} from '@chakra-ui/react';

interface EventFormProps {
  onSubmit: (event: Event) => void;
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
  const [eventData, setEventData] = useState<Event>({
    id: '',
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate form data as needed

    // Submit the new event to the parent component
    onSubmit({ ...eventData, id: 'generatedId' });

    // Clear the form
    setEventData({
      id: '',
      name: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: '',
    });
  };
  
  return (
    
    
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-8 bg-gradient-to-r from-teal-500 via-teal-400 to-teal-300 rounded-md shadow-lg text-white">
  <h2 className="text-4xl font-extrabold mb-6 text-center">Add New Event</h2>

  <div className="mb-6">
    <label htmlFor="name" className="block text-sm font-semibold mb-2">
      Event Name
    </label>
    <input
      id="name"
      type="text"
      name="name"
      value={eventData.name}
      onChange={handleChange}
      required
      placeholder="Enter event name"
      className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-teal-500 transition duration-300"
    />
  </div>

  <div className="mb-6">
    <label htmlFor="date" className="block text-sm font-semibold mb-2">
      Date
    </label>
    <input
      id="date"
      type="date"
      name="date"
      value={eventData.date}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-teal-500 transition duration-300"
    />
  </div>

  <div className="mb-6">
    <label htmlFor="time" className="block text-sm font-semibold mb-2">
      Time
    </label>
    <input
      id="time"
      type="time"
      name="time"
      value={eventData.time}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-teal-500 transition duration-300"
    />
  </div>

  <div className="mb-6">
    <label htmlFor="location" className="block text-sm font-semibold mb-2">
      Location
    </label>
    <input
      id="location"
      type="text"
      name="location"
      value={eventData.location}
      onChange={handleChange}
      placeholder="Event location"
      className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-teal-500 transition duration-300"
    />
  </div>

  <div className="mb-6">
    <label htmlFor="description" className="block text-sm font-semibold mb-2">
      Description
    </label>
    <textarea
      id="description"
      name="description"
      value={eventData.description}
      onChange={handleChange}
      placeholder="Event description"
      className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-teal-500 transition duration-300"
    />
  </div>

  <div className="mb-6">
    <label htmlFor="image" className="block text-sm font-semibold mb-2">
      Image URL
    </label>
    <input
      id="image"
      type="url"
      name="image"
      value={eventData.image}
      onChange={handleChange}
      placeholder="Event image URL"
      className="w-full px-4 py-2 bg-white bg-opacity-20 border rounded-md focus:outline-none focus:border-teal-500 transition duration-300"
    />
  </div>

  <button
    type="submit"
    className="w-full px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300"
  >
    Add Event
  </button>
</form>

    
  );
};

export default EventForm;
