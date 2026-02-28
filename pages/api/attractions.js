// pages/api/attractions.js
import { apiLimiter } from '../../lib/rate-limit';
import { getFallbackAttractions } from '../../lib/fallback-events';
import { fetchSeatGeekPerformers } from '../../lib/seatgeek';

export default async function handler(req, res) {
  try {
    await apiLimiter.check(req, 20);
  } catch {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const clientId = process.env.SEATGEEK_CLIENT_ID;

  if (!clientId) {
    return res.status(200).json(getFallbackAttractions());
  }

  try {
    const data = await fetchSeatGeekPerformers(clientId);
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json(getFallbackAttractions());
  }
}
