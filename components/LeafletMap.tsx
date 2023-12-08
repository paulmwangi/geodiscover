import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Import from react-leaflet
import { Point, Feature } from 'geojson';
import { LeafletMouseEvent, Layer } from 'leaflet'; // Import from leaflet

let L: typeof import('leaflet');
const LeafletMap = () => {
  const mapRef = useRef<L.Map | null>(null); // Use the correct type for the map reference
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      L = require('leaflet');
      require('leaflet/dist/leaflet.css');
      setLeafletLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (leafletLoaded) {
      mapRef.current = L.map('map').setView([51.505, -0.09], 13); // Use the correct type for the map position

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      // Request user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          mapRef.current?.setView([latitude, longitude], 13);
        });
      }
    }
  }, [leafletLoaded]);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize(); // Update the map size
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (leafletLoaded && mapRef.current) {
      // Custom marker icon
      const customIcon = new L.Icon({
        iconUrl: '/folded-map.svg',
        iconSize: [38, 95],
      });

      // Add an event when a layer is clicked
      const onMapClick = (e: L.LeafletMouseEvent) => { // Use the correct type for the map event
        if (mapRef.current) {
          const marker = L.marker(e.latlng, { icon: customIcon }).addTo(mapRef.current);
          marker.bindPopup('<b>New Marker!</b><br>You added a new marker.').openPopup();
        }
      }

      mapRef.current.on('click', onMapClick);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [leafletLoaded]);

  return <div id="map" style={{ height: '100vh', width: '100%', borderRadius: '15px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}></div>; // Use a valid CSS value for the height
};

export default LeafletMap;
