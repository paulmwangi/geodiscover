import axios from 'axios';

type AppEvent = {
  name: string;
  date: string;
  // include other properties as per your API response
};



export const getEvents = async (params: Record<string, string>): Promise<AppEvent[]> => {
  // Validate the params object
  if (!params || !params.apikey || !params.keyword) {
    throw new Error('Invalid parameters');
  }

  try {
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?${new URLSearchParams(params).toString()}`;

    const response = await axios.get(url);

    // Check if the events data exists
    if (response.data._embedded && response.data._embedded.events) {
      // Return the events data
      return response.data._embedded.events;
    } else {
      throw new Error('No events found');
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    // Throw an error or return an empty array
    throw new Error('Failed to fetch events');
    // or
    // return [];
  }
};
