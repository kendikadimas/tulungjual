import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapViewer({ lat, lng, isApproximate = false, title = 'Lokasi Properti' }) {
    const containerRef = useRef(null);
    const mapRef = useRef(null);

    const center = [lat || -8.067, lng || 111.901];
    const zoom = isApproximate ? 14 : 16;

    useEffect(() => {
        if (!containerRef.current) return;

        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }

        const map = L.map(containerRef.current, {
            center,
            zoom,
            scrollWheelZoom: false,
        });

        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        if (isApproximate) {
            L.circle(center, {
                radius: 600,
                color: '#059669',
                fillColor: '#10b981',
                fillOpacity: 0.25,
            }).addTo(map);
        } else {
            L.marker(center).addTo(map);
        }

        setTimeout(() => {
            map.invalidateSize();
        }, 100);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [lat, lng, isApproximate]);

    return (
        <div className="h-72 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative z-0">
            <div ref={containerRef} className="h-full w-full" />
            {isApproximate && (
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#002B7F] text-xs font-bold px-3 py-1.5 rounded-xl shadow-md border border-blue-200 z-[1000]">
                    Area Perkiraan (Privasi Alamat Diaktifkan)
                </div>
            )}
        </div>
    );
}
