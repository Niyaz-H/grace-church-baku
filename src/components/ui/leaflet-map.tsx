"use client"

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface LeafletMapProps {
  theme: 'light' | 'dark' | 'system';
}

const LeafletMap: React.FC<LeafletMapProps> = ({ theme }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(theme === 'dark');
  }, [theme]);

  const lightTileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const darkTileUrl = "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";

  const position: [number, number] = [40.405639, 49.947306]; // 40°24'20.3"N 49°56'50.3"E
  const googleMapsUrl = `https://maps.app.goo.gl/UF3p7uxMmhbWojXu7`;

  const handleMapClick = () => {
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div
      className="aspect-video bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden cursor-pointer"
      onClick={handleMapClick}
      title="Click to open in Google Maps"
    >
      <MapContainer center={position} zoom={17} style={{ height: '100%', width: '100%' }} zoomControl={false} scrollWheelZoom={false} dragging={false}>
        <TileLayer
          url={isDark ? darkTileUrl : lightTileUrl}
          attribution={isDark
            ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        />
        <Marker position={position}>
          <Popup>
            Grace Church Baku
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;