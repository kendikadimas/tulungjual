import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon issue in Webpack/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapPicker({ lat, lng, onSelectLocation }) {
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    const initialLat = lat ? parseFloat(lat) : -8.067;
    const initialLng = lng ? parseFloat(lng) : 111.901;

    useEffect(() => {
        if (!containerRef.current) return;

        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }

        const map = L.map(containerRef.current, {
            center: [initialLat, initialLng],
            zoom: 13,
            scrollWheelZoom: false,
        });

        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        const marker = L.marker([initialLat, initialLng]).addTo(map);
        markerRef.current = marker;

        map.on('click', (e) => {
            const { lat: clickLat, lng: clickLng } = e.latlng;
            marker.setLatLng([clickLat, clickLng]);
            if (onSelectLocation) {
                onSelectLocation(clickLat, clickLng);
            }
        });

        setTimeout(() => {
            map.invalidateSize();
        }, 100);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (lat && lng && markerRef.current && mapRef.current) {
            const newLat = parseFloat(lat);
            const newLng = parseFloat(lng);
            markerRef.current.setLatLng([newLat, newLng]);
            mapRef.current.panTo([newLat, newLng]);
        }
    }, [lat, lng]);

    return (
        <div className="space-y-2">
            <div className="h-64 w-full rounded-2xl overflow-hidden border border-slate-300 shadow-inner z-0 relative">
                <div ref={containerRef} className="h-full w-full" />
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1">
                * Klik pada peta di atas untuk menentukan titik latitude/longitude lokasi properti secara presisi.
            </p>
        </div>
    );
}
