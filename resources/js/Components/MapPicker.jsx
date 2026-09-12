import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon issue in Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition, onSelectLocation }) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            onSelectLocation(lat, lng);
        },
    });

    return position ? <Marker position={position} /> : null;
}

export default function MapPicker({ lat, lng, onSelectLocation }) {
    const defaultCenter = [-8.067, 111.901]; // Tulungagung default
    const [position, setPosition] = useState(
        lat && lng ? [parseFloat(lat), parseFloat(lng)] : defaultCenter
    );

    useEffect(() => {
        if (lat && lng) {
            setPosition([parseFloat(lat), parseFloat(lng)]);
        }
    }, [lat, lng]);

    return (
        <div className="space-y-2">
            <div className="h-64 w-full rounded-2xl overflow-hidden border border-slate-300 shadow-inner z-0 relative">
                <MapContainer
                    center={position}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker 
                        position={position} 
                        setPosition={setPosition} 
                        onSelectLocation={onSelectLocation} 
                    />
                </MapContainer>
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1">
                * Klik pada peta di atas untuk menentukan titik latitude/longitude lokasi properti secara presisi.
            </p>
        </div>
    );
}
