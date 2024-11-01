import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  position: [number, number];
}

const LeafletMap: React.FC<LeafletMapProps> = ({ position }) => {
  return (
    <MapContainer center={position} zoom={13} className='z-10' style={{ width: '100%', height: '400px', borderRadius: '10px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Vị trí hiện tại của bạn
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
