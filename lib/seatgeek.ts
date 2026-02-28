// SeatGeek API client — free alternative to Ticketmaster.
// SeatGeek requires only a client_id (no OTP or complex auth).
// Docs: https://platform.seatgeek.com/

import axios from 'axios';

const SEATGEEK_BASE = 'https://api.seatgeek.com/2';

// Map frontend classification names to SeatGeek taxonomy names
const CLASSIFICATION_TO_TAXONOMY: Record<string, string> = {
  sports: 'sports',
  music: 'concert',
  'arts & theatre': 'theater',
  theatre: 'theater',
  arts: 'theater',
  film: 'theater',
  miscellaneous: 'comedy',
};

// Map SeatGeek taxonomy back to display classification names
const TAXONOMY_TO_CLASSIFICATION: Record<string, string> = {
  sports: 'Sports',
  concert: 'Music',
  theater: 'Arts & Theatre',
  comedy: 'Arts & Theatre',
  dance_performance_tour: 'Arts & Theatre',
  classical: 'Music',
  opera: 'Arts & Theatre',
  literary: 'Miscellaneous',
  family: 'Miscellaneous',
};

interface SeatGeekVenue {
  id: number;
  name: string;
  city: string;
  state: string;
  country: string;
  location: { lat: number; lon: number };
}

interface SeatGeekPerformer {
  id: number;
  name: string;
  short_name: string;
  image: string | null;
  images: Record<string, string>;
  type: string;
  taxonomies: Array<{ id: number; name: string }>;
}

interface SeatGeekTaxonomy {
  id: number;
  name: string;
  parent_id: number | null;
}

interface SeatGeekEvent {
  id: number;
  title: string;
  short_title: string;
  description: string | null;
  url: string;
  datetime_local: string;
  venue: SeatGeekVenue;
  performers: SeatGeekPerformer[];
  taxonomies: SeatGeekTaxonomy[];
  type: string;
}

// Transform a SeatGeek event to match the Ticketmaster-like format the frontend expects
function transformEvent(event: SeatGeekEvent) {
  const dateTime = event.datetime_local || '';
  const [datePart, timePart] = dateTime.includes('T')
    ? dateTime.split('T')
    : [dateTime, ''];

  const primaryTaxonomy = event.taxonomies?.[0]?.name || event.type || '';
  const classificationName =
    TAXONOMY_TO_CLASSIFICATION[primaryTaxonomy] || 'Miscellaneous';

  // Pick the best available performer image
  const performerImage =
    event.performers?.[0]?.image ||
    (event.performers?.[0]?.images
      ? Object.values(event.performers[0].images).find((url) => url) || ''
      : '');

  return {
    id: `sg-${event.id}`,
    name: event.title,
    type: 'event',
    url: event.url,
    info: event.description || event.short_title || '',
    dates: {
      start: {
        localDate: datePart,
        localTime: timePart ? timePart.replace(/([+-]\d{2}:?\d{2}|Z)$/, '') : '',
      },
    },
    classifications: [
      {
        segment: { name: classificationName },
        genre: { name: primaryTaxonomy || classificationName },
      },
    ],
    images: performerImage
      ? [{ url: performerImage, width: 600, height: 400 }]
      : [],
    _embedded: {
      venues: [
        {
          name: event.venue?.name || 'Venue TBD',
          city: { name: event.venue?.city || '' },
          state: { name: event.venue?.state || '' },
          country: { name: event.venue?.country || '' },
          location: {
            longitude: String(event.venue?.location?.lon || ''),
            latitude: String(event.venue?.location?.lat || ''),
          },
        },
      ],
    },
  };
}

/**
 * Fetch events from SeatGeek, transformed to the Ticketmaster-like format.
 */
export async function fetchSeatGeekEvents(
  clientId: string,
  classification?: string
): Promise<ReturnType<typeof transformEvent>[]> {
  const params: Record<string, string> = {
    client_id: clientId,
    per_page: '32',
    sort: 'datetime_local.asc',
  };

  if (classification) {
    const taxonomy =
      CLASSIFICATION_TO_TAXONOMY[classification.toLowerCase()] ||
      classification.toLowerCase();
    params['taxonomies.name'] = taxonomy;
  }

  const response = await axios.get(`${SEATGEEK_BASE}/events`, { params });
  const events: SeatGeekEvent[] = response.data?.events || [];
  return events.map(transformEvent);
}

/**
 * Fetch performers (attractions) from SeatGeek.
 */
export async function fetchSeatGeekPerformers(clientId: string) {
  const response = await axios.get(`${SEATGEEK_BASE}/performers`, {
    params: { client_id: clientId, per_page: '20' },
  });

  const performers: SeatGeekPerformer[] = response.data?.performers || [];

  return {
    _embedded: {
      attractions: performers.map((p) => ({
        id: `sg-${p.id}`,
        name: p.name,
        type: 'attraction',
        url: `https://seatgeek.com/${p.short_name || p.name.toLowerCase().replace(/\s+/g, '-')}`,
        classifications: [
          {
            segment: {
              name:
                TAXONOMY_TO_CLASSIFICATION[
                  p.taxonomies?.[0]?.name || p.type || ''
                ] || 'Miscellaneous',
            },
          },
        ],
        images: p.image
          ? [{ url: p.image, width: 300, height: 200 }]
          : [],
      })),
    },
  };
}

/**
 * Fetch taxonomies (classifications) from SeatGeek.
 */
export async function fetchSeatGeekTaxonomies(clientId: string) {
  const response = await axios.get(`${SEATGEEK_BASE}/taxonomies`, {
    params: { client_id: clientId },
  });

  const taxonomies: SeatGeekTaxonomy[] = response.data?.taxonomies || [];

  // Only return top-level taxonomies (parent_id === null)
  const topLevel = taxonomies.filter((t) => t.parent_id === null);

  return {
    _embedded: {
      classifications: topLevel.map((t) => ({
        segment: {
          id: t.name,
          name: TAXONOMY_TO_CLASSIFICATION[t.name] || t.name,
        },
        type: { id: 'event', name: 'Event' },
      })),
    },
  };
}
