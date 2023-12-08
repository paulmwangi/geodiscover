// pages/api/events.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const classifications = ['sports', 'music', 'theatre', 'arts'];
    const events = [];

    for (const classification of classifications) {
        const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=${classification}&size=10&apikey=Ioy6HZKL50qYLEJMoCtNAr65PsEqlBPH`);
        events.push(...response.data._embedded.events);
    }

    res.status(200).json({ _embedded: { events } });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' });
  }
}
