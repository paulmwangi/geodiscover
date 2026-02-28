import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface MapEvent {
  id: string;
  name: string;
  date?: string;
  time?: string;
  location?: string;
  category?: string;
  lat?: number;
  lng?: number;
}

interface LeafletMapProps {
  events?: MapEvent[];
  selectedEventId?: string | null;
  onMapClick?: (lat: number, lng: number) => void;
}

let L: typeof import('leaflet');

const LeafletMap: React.FC<LeafletMapProps> = ({ events = [], selectedEventId, onMapClick }) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const clickMarkerRef = useRef<L.Marker | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      L = require('leaflet');
      require('leaflet/dist/leaflet.css');
      setLeafletLoaded(true);
    }
  }, []);

  // Initialize the map once
  useEffect(() => {
    if (!leafletLoaded || !containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current).setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    markersRef.current = L.layerGroup().addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = null;
      }
    };
  }, [leafletLoaded]);

  // Handle map clicks
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current) return;

    const pinIcon = new L.Icon({
      iconUrl: '/marker-icon.png',
      iconRetinaUrl: '/marker-icon-2x.png',
      shadowUrl: '/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const handleClick = (e: L.LeafletMouseEvent) => {
      if (!mapRef.current) return;

      if (clickMarkerRef.current) {
        clickMarkerRef.current.remove();
      }

      const marker = L.marker(e.latlng, { icon: pinIcon }).addTo(mapRef.current);
      marker
        .bindPopup(
          `<div style="text-align:center;min-width:140px;">
            <b>📍 Selected Location</b><br/>
            <span style="font-size:12px;color:#666;">Lat: ${e.latlng.lat.toFixed(4)}<br/>Lng: ${e.latlng.lng.toFixed(4)}</span><br/>
            <span style="font-size:11px;color:#888;">Use the form to add an event here</span>
          </div>`
        )
        .openPopup();
      clickMarkerRef.current = marker;

      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    };

    mapRef.current.on('click', handleClick);

    return () => {
      mapRef.current?.off('click', handleClick);
    };
  }, [leafletLoaded, onMapClick]);

  // Render event markers whenever events change
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || !markersRef.current) return;

    markersRef.current.clearLayers();

    const categoryIcons: Record<string, string> = {
      sports: '🏟️',
      music: '🎵',
      'Arts & Theatre': '🎭',
      Film: '🎬',
      Miscellaneous: '🎪',
    };

    const categoryColors: Record<string, string> = {
      sports: '#f97316',
      music: '#8b5cf6',
      'Arts & Theatre': '#ec4899',
      Film: '#06b6d4',
      Miscellaneous: '#10b981',
    };

    const bounds: L.LatLngExpression[] = [];

    events.forEach((event) => {
      if (event.lat == null || event.lng == null) return;

      const color = categoryColors[event.category || ''] || '#6366f1';
      const emoji = categoryIcons[event.category || ''] || '📌';

      const icon = L.divIcon({
        className: 'custom-event-marker',
        html: `<div style="
          background:${color};
          width:36px;height:36px;
          border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-size:18px;
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
          border:3px solid white;
          cursor:pointer;
        ">${emoji}</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20],
      });

      const popupContent = `
        <div style="min-width:200px;max-width:280px;font-family:system-ui,sans-serif;">
          <div style="font-weight:700;font-size:15px;margin-bottom:6px;color:#1f2937;">${event.name}</div>
          ${event.category ? `<span style="display:inline-block;background:${color};color:white;font-size:11px;padding:2px 8px;border-radius:12px;margin-bottom:6px;">${emoji} ${event.category}</span>` : ''}
          ${event.date ? `<div style="font-size:13px;color:#6b7280;margin-top:4px;">📅 ${event.date}</div>` : ''}
          ${event.time ? `<div style="font-size:13px;color:#6b7280;">🕐 ${event.time}</div>` : ''}
          ${event.location ? `<div style="font-size:13px;color:#6b7280;">📍 ${event.location}</div>` : ''}
        </div>
      `;

      const marker = L.marker([event.lat, event.lng], { icon });
      marker.bindPopup(popupContent);
      markersRef.current!.addLayer(marker);
      bounds.push([event.lat, event.lng]);
    });

    // Auto-fit map to show all event markers
    if (bounds.length > 0 && !selectedEventId && mapRef.current) {
      mapRef.current.fitBounds(L.latLngBounds(bounds), { padding: [40, 40], maxZoom: 12 });
    }
  }, [leafletLoaded, events, selectedEventId]);

  // Fly to selected event
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || !selectedEventId) return;

    const event = events.find((e) => e.id === selectedEventId);
    if (event?.lat != null && event?.lng != null) {
      mapRef.current.flyTo([event.lat, event.lng], 14, { duration: 1.2 });

      // Open the popup for the selected event
      markersRef.current?.eachLayer((layer: L.Layer) => {
        const marker = layer as L.Marker;
        if (marker.getLatLng) {
          const latlng = marker.getLatLng();
          if (
            Math.abs(latlng.lat - event.lat!) < 0.0001 &&
            Math.abs(latlng.lng - event.lng!) < 0.0001
          ) {
            marker.openPopup();
          }
        }
      });
    }
  }, [leafletLoaded, selectedEventId, events]);

  // Handle container resize
  useEffect(() => {
    const handleResize = () => {
      mapRef.current?.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    // Also invalidate after a brief delay to handle layout shifts
    const timeout = setTimeout(handleResize, 300);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ height: '100%', width: '100%', minHeight: '400px' }}
    />
  );
};

export default LeafletMap;
