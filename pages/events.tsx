import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import React, { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { EventForm, LeafletMap, EventDetailModal} from '../components';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaSearch, FaTimes, FaFilter, FaMap, FaGlobeAmericas } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';
import type { MapEvent } from '../components/LeafletMap';



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
      location?: {
        latitude: string;
        longitude: string;
      };
    }>;
  };
  info: string;
  images: Array<{
    url: string;
  }>;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr: string): string {
  if (!timeStr) return '';
  try {
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  } catch {
    return timeStr;
  }
}

const categoryColors: Record<string, string> = {
  sports: 'from-orange-500 to-red-500',
  music: 'from-violet-500 to-purple-600',
  'Arts & Theatre': 'from-pink-500 to-rose-500',
  Film: 'from-cyan-500 to-blue-500',
  Miscellaneous: 'from-emerald-500 to-teal-500',
  Transportation: 'from-amber-500 to-yellow-500',
  Parking: 'from-gray-500 to-slate-600',
};

function getCategoryGradient(category: string): string {
  return categoryColors[category] || 'from-primary-500 to-primary-600';
}

// Skeleton loader for cards
const CardSkeleton: React.FC = () => (
  <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md animate-pulse">
    <div className="w-full h-52 bg-gray-200 dark:bg-gray-700" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
    </div>
  </div>
);

export default function Events() {
  const router = useRouter();
  const [eventsByCategory, setEventsByCategory] = useState<{ [key: string]: Event[] }>({});
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [classifications, setClassifications] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
   const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [modalEvent, setModalEvent] = useState<Event | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const mapSectionRef = useRef<HTMLDivElement>(null);

  // Read search query from URL when navigating from navbar search
  useEffect(() => {
    if (router.isReady && router.query.q) {
      setSearchQuery(router.query.q as string);
    }
  }, [router.isReady, router.query.q]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const classifications = ['sports', 'music', 'Arts & Theatre', 'Film', 'Miscellaneous'];
        const categorizedEvents: { [key: string]: Event[] } = {};

        for (const classification of classifications) {
          const response = await axios.get(
            `/api/events?classification=${encodeURIComponent(classification)}`
          );

          if (response.data._embedded?.events) {
            const events = response.data._embedded.events.map((event: ApiEvent) => {
              const venue = event._embedded?.venues?.[0];
              const rawLat = venue?.location?.latitude;
              const rawLng = venue?.location?.longitude;
              const parsedLat = rawLat ? parseFloat(rawLat) : NaN;
              const parsedLng = rawLng ? parseFloat(rawLng) : NaN;
              return {
                id: event.id,
                name: event.name,
                date: event.dates?.start?.localDate || '',
                time: event.dates?.start?.localTime || '',
                location: venue
                  ? `${venue.name}, ${venue.city?.name || ''}`
                  : 'Location TBD',
                description: event.info || '',
                image: event.images?.[0]?.url || '',
                category: classification,
                lat: !isNaN(parsedLat) ? parsedLat : undefined,
                lng: !isNaN(parsedLng) ? parsedLng : undefined,
              };
            });

            categorizedEvents[classification] = events;
          }
        }

        setEventsByCategory(categorizedEvents);
        setClassifications(classifications);
        setSelectedCategory(classifications[0]);
        setFilteredEvents(categorizedEvents[classifications[0]] || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('An error occurred while fetching events.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    let events = selectedCategory ? (eventsByCategory[selectedCategory] || []) : Object.values(eventsByCategory).flat();

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      events = events.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          (e.description && e.description.toLowerCase().includes(q))
      );
    }

    if (selectedDate) {
      events = events.filter((e) => e.date === selectedDate);
    }

    setFilteredEvents(events);
  }, [searchQuery, selectedCategory, selectedDate, eventsByCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const clearFilters = () => {
    setSelectedCategory(classifications[0] || '');
    setSelectedDate('');
    setSearchQuery('');
  };

  const totalEvents = Object.values(eventsByCategory).reduce((sum, arr) => sum + arr.length, 0);

  const handleAddEvent = (newEvent: Event) => {
    setEventsByCategory((prevEvents) => {
      const category = newEvent.category || selectedCategory || classifications[0];
      const eventWithCategory = { ...newEvent, category };
      const existing = prevEvents[category] || [];
      const updatedEvents = { ...prevEvents, [category]: [...existing, eventWithCategory] };
      return updatedEvents;
    });
    // Auto-select the new event on the map
    if (newEvent.lat != null && newEvent.lng != null) {
      setSelectedEventId(newEvent.id);
    }
    setSelectedLocation(null);
  };

  const handleMapClick = useCallback((lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
  }, []);

  const handleEventCardClick = (event: Event) => {
    if (event.lat != null && event.lng != null) {
      setSelectedEventId(event.id);
      mapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Collect all events with lat/lng for the map
  const allMapEvents: MapEvent[] = Object.values(eventsByCategory)
    .flat()
    .filter((e) => e.lat != null && e.lng != null)
    .map((e) => ({
      id: e.id,
      name: e.name,
      date: e.date ? formatDate(e.date) : undefined,
      time: e.time ? formatTime(e.time) : undefined,
      location: e.location || undefined,
      category: e.category,
      lat: e.lat,
      lng: e.lng,
    }));

  const eventsOnMapCount = allMapEvents.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-primary-800 dark:via-primary-900 dark:to-gray-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-accent-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Explore Events Worldwide
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto mb-8">
            Discover incredible experiences happening across the globe — from live music in Berlin and sports in Tokyo to art exhibitions in Paris and festivals in Marrakech.
          </p>

          {/* Search bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by name, location, or keyword..."
                aria-label="Search events"
                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-base transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {!loading && (
            <p className="mt-4 text-primary-200 text-sm">
              {totalEvents} events across {classifications.length} categories
            </p>
          )}
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
            <FaFilter className="text-gray-400 flex-shrink-0" aria-hidden="true" />
            <button
              onClick={() => setSelectedCategory('')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === ''
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              aria-pressed={selectedCategory === ''}
            >
              <FaGlobeAmericas size={12} />
              All
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedCategory === '' ? 'bg-white/25' : 'bg-gray-200 dark:bg-gray-700'}`}>
                {totalEvents}
              </span>
            </button>
            {classifications.map((category) => {
              const isActive = selectedCategory === category;
              const count = eventsByCategory[category]?.length || 0;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? `bg-gradient-to-r ${getCategoryGradient(category)} text-white shadow-md`
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  aria-pressed={isActive}
                >
                  {category}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/25' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    {count}
                  </span>
                </button>
              );
            })}

            <div className="ml-auto flex items-center gap-2 flex-shrink-0">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                aria-label="Filter by date"
                className="px-3 py-2 rounded-xl text-sm bg-gray-100 dark:bg-gray-800 border-none text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              {(selectedDate || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-red-500 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <FaTimes className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Something went wrong</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <FaSearch className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No events found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
              Try adjusting your search or filters to discover more events.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? 's' : ''}
                {selectedCategory && (
                  <> in <span className="font-semibold text-gray-900 dark:text-white">{selectedCategory}</span></>
                )}
              </p>
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
                >
                  List
                </button>
              </div>
            </div>

            <motion.div
              className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4'}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={selectedCategory + searchQuery + selectedDate + viewMode}
            >
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={cardVariants}
                    layout
                    className="group cursor-pointer"
                    onClick={() => setModalEvent(event)}
                  >
                    <div className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700/50 h-full ${viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'}`}>
                      {/* Image */}
                      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-52'}`}>
                        {event.image ? (
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={event.image}
                            alt={event.name}
                            loading="lazy"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${getCategoryGradient(event.category || '')} flex items-center justify-center`}>
                            <FaCalendarAlt className="text-white/40 text-5xl" />
                          </div>
                        )}
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {/* Category badge */}
                        {event.category && (
                          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getCategoryGradient(event.category)} shadow-sm`}>
                            {event.category}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {event.name}
                        </h3>

                        <div className="space-y-2 mt-auto">
                          {event.date && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <FaCalendarAlt className="text-primary-500 flex-shrink-0" size={12} />
                              <span>{formatDate(event.date)}</span>
                            </div>
                          )}
                          {event.time && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <FaClock className="text-accent-500 flex-shrink-0" size={12} />
                              <span>{formatTime(event.time)}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <FaMapMarkerAlt className="text-red-400 flex-shrink-0" size={12} />
                              <span className="truncate">{event.location}</span>
                            </div>
                          )}
                          {event.lat != null && event.lng != null && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleEventCardClick(event); }}
                              className="mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                            >
                              <FaMap size={10} />
                              View on Map
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>

      {/* Map & Event form section */}
      <section ref={mapSectionRef} className="max-w-7xl mx-auto px-6 pb-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Explore the Map
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            {eventsOnMapCount > 0
              ? `${eventsOnMapCount} event${eventsOnMapCount !== 1 ? 's' : ''} pinned on the map. Click a card's "View on Map" to fly there, or click the map to pick a location for a new event.`
              : 'Click anywhere on the map to drop a pin, or add your own event using the form.'}
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex flex-col lg:flex-row" style={{ minHeight: '70vh' }}>
            <div className="flex-[3] min-h-[400px]">
              <LeafletMap
                events={allMapEvents}
                selectedEventId={selectedEventId}
                onMapClick={handleMapClick}
              />
            </div>
            <div className="flex-1 p-6 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
              <EventForm
                onSubmit={handleAddEvent}
                selectedLocation={selectedLocation}
                categories={classifications}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Event Detail Modal */}
      {modalEvent && (
        <EventDetailModal
          event={modalEvent}
          onClose={() => setModalEvent(null)}
          onViewOnMap={() => {
            handleEventCardClick(modalEvent);
            setModalEvent(null);
          }}
          formatDate={formatDate}
          formatTime={formatTime}
        />
      )}
    </div>
  );
}
