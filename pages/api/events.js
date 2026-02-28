// pages/api/events.js
import { apiLimiter } from '../../lib/rate-limit';
import { getFallbackEvents } from '../../lib/fallback-events';
import { fetchSeatGeekEvents } from '../../lib/seatgeek';

export default async function handler(req, res) {
  try {
    await apiLimiter.check(req, 20);
  } catch {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { classification } = req.query;
  const clientId = process.env.SEATGEEK_CLIENT_ID;

  // If no API key is configured, serve fallback data
  if (!clientId) {
    const events = getFallbackEvents(classification || undefined);
    return res.status(200).json({ _embedded: { events } });
  }

  try {
    const events = await fetchSeatGeekEvents(clientId, classification || undefined);
    res.status(200).json({ _embedded: { events } });
  } catch (error) {
    // Fall back to sample data if the API call fails
    const events = getFallbackEvents(classification || undefined);
    res.status(200).json({ _embedded: { events } });
  }
}
