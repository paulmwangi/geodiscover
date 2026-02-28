// pages/api/classifications.js
import { apiLimiter } from '../../lib/rate-limit';
import { getFallbackClassifications } from '../../lib/fallback-events';
import { fetchSeatGeekTaxonomies } from '../../lib/seatgeek';

export default async function handler(req, res) {
  try {
    await apiLimiter.check(req, 20);
  } catch {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const clientId = process.env.SEATGEEK_CLIENT_ID;

  if (!clientId) {
    return res.status(200).json(getFallbackClassifications());
  }

  try {
    const data = await fetchSeatGeekTaxonomies(clientId);
    res.status(200).json(data);
  } catch (error) {
    res.status(200).json(getFallbackClassifications());
  }
}
