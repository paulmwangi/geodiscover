// pages/api/classifications.js
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=Ioy6HZKL50qYLEJMoCtNAr65PsEqlBPH');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching classifications' });
  }
}
