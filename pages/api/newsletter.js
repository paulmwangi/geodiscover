import { apiLimiter } from '../../lib/rate-limit';
import { sanitizeInput } from '../../lib/sanitize';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await apiLimiter.check(req, 5);
  } catch {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  const sanitizedEmail = sanitizeInput(email);

  // Log the subscription (in production, save to database or mailing list service)
  console.log('Newsletter subscription:', sanitizedEmail);

  return res.status(200).json({ success: true, message: 'Successfully subscribed to the newsletter.' });
}
