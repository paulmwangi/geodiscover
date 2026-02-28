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

  const { name, email, subject, message, phone } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, subject, message.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  // Sanitize inputs
  const sanitizedData = {
    name: sanitizeInput(name),
    email: sanitizeInput(email),
    phone: sanitizeInput(phone || ''),
    subject: sanitizeInput(subject),
    message: sanitizeInput(message),
    timestamp: new Date().toISOString(),
  };

  // Log the contact submission (in production, this would send to a database or email service)
  console.log('Contact form submission:', sanitizedData);

  return res.status(200).json({ success: true, message: 'Message received successfully.' });
}
