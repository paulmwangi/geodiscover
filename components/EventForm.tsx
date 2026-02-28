import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface EventFormProps {
  onSubmit: (event: Event) => void;
  selectedLocation?: { lat: number; lng: number } | null;
  categories?: string[];
}

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category?: string;
  lat?: number;
  lng?: number;
}

const inputClasses =
  'w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm';

const labelClasses = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5';

const EventForm: React.FC<EventFormProps> = ({ onSubmit, selectedLocation, categories = [] }) => {
  const [eventData, setEventData] = useState<Event>({
    id: '',
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image: '',
    category: '',
    lat: undefined,
    lng: undefined,
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedLocation) {
      setEventData((prev) => ({
        ...prev,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      }));
    }
  }, [selectedLocation]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...eventData,
      id: `user-event-${Date.now()}`,
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);

    setEventData({
      id: '',
      name: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image: '',
      category: '',
      lat: undefined,
      lng: undefined,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Add New Event
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
        Click the map to pick a location, then fill in the details.
      </p>

      {submitted && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
          <span>✅</span> Event added successfully! Check the map for your marker.
        </div>
      )}

      {selectedLocation && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-blue-700 dark:text-blue-300 text-sm flex items-center gap-2">
          <span>📍</span> Location selected: {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClasses}>
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
            className={inputClasses}
          />
        </div>

        {categories.length > 0 && (
          <div>
            <label htmlFor="category" className={labelClasses}>
              Category
            </label>
            <select
              id="category"
              name="category"
              value={eventData.category}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="date" className={labelClasses}>
              Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="time" className={labelClasses}>
              Time
            </label>
            <input
              id="time"
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className={labelClasses}>
            Location Name
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            placeholder="e.g. Central Park, NYC"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="description" className={labelClasses}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            rows={3}
            placeholder="What's this event about?"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="image" className={labelClasses}>
            Image URL <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="image"
            type="url"
            name="image"
            value={eventData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={inputClasses}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-medium transition-all text-sm shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          🎉 Add Event to Map
        </button>
      </div>
    </form>
  );
};

export default EventForm;
