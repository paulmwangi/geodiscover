import React from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTimes, FaMap, FaShareAlt } from 'react-icons/fa';

interface EventDetailModalProps {
  event: {
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
  };
  onClose: () => void;
  onViewOnMap?: () => void;
  formatDate: (d: string) => string;
  formatTime: (t: string) => string;
}

const categoryEmojis: Record<string, string> = {
  sports: '🏟️',
  music: '🎵',
  'Arts & Theatre': '🎭',
  Film: '🎬',
  Miscellaneous: '🎪',
};

const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onViewOnMap,
  formatDate,
  formatTime,
}) => {
  const handleShare = async () => {
    const shareData = {
      title: event.name,
      text: `Check out this event: ${event.name}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${event.name} - ${window.location.href}`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Event details: ${event.name}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <FaTimes size={14} />
        </button>

        {/* Image */}
        {event.image ? (
          <div className="relative h-56 overflow-hidden rounded-t-3xl">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {event.category && (
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white bg-white/20 backdrop-blur-md border border-white/10">
                {categoryEmojis[event.category] || '📌'} {event.category}
              </div>
            )}
          </div>
        ) : (
          <div className="h-32 bg-gradient-to-br from-primary-500 to-accent-500 rounded-t-3xl flex items-center justify-center">
            <span className="text-5xl">{categoryEmojis[event.category || ''] || '🎉'}</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {event.name}
          </h2>

          <div className="space-y-3 mb-6">
            {event.date && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center">
                  <FaCalendarAlt className="text-primary-500" size={14} />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{formatDate(event.date)}</div>
                  <div className="text-gray-500 text-xs">Date</div>
                </div>
              </div>
            )}
            {event.time && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-accent-50 dark:bg-accent-900/20 flex items-center justify-center">
                  <FaClock className="text-accent-500" size={14} />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{formatTime(event.time)}</div>
                  <div className="text-gray-500 text-xs">Time</div>
                </div>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-red-400" size={14} />
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{event.location}</div>
                  <div className="text-gray-500 text-xs">Venue</div>
                </div>
              </div>
            )}
          </div>

          {event.description && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">About this Event</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {event.lat != null && event.lng != null && onViewOnMap && (
              <button
                onClick={onViewOnMap}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg"
              >
                <FaMap size={14} />
                View on Map
              </button>
            )}
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FaShareAlt size={12} />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
