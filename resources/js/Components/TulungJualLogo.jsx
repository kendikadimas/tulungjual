import React from 'react';

/**
 * TulungJual.id Official Brand Logo
 * Sesuai panduan visual image.png:
 * - Ikon: Atap rumah biru tua & muda dengan 2 lingkaran orang (penghubung) di kiri-kanan, 4 kotak jendela oranye di tengah, dan badan rumah biru muda.
 * - Teks: TULUNG (Biru Tua) + JUAL (Biru Muda) + .ID (Oranye)
 * - Subteks: MARKETPLACE PROPERTI - Temukan Properti yang Tepat.
 */
export default function TulungJualLogo({ className = 'h-10', showTagline = false, variant = 'full' }) {
    if (variant === 'icon') {
        return (
            <svg 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                {/* Background rounded rect */}
                <rect width="100" height="100" rx="24" fill="#0070F3" />
                {/* Orang Kiri */}
                <circle cx="28" cy="38" r="5" fill="white" />
                {/* Orang Kanan */}
                <circle cx="72" cy="38" r="5" fill="white" />
                {/* Atap Rumah Segitiga Melengkung */}
                <path 
                    d="M50 22L20 44C18.5 45.1 18 47 19 48.5C20 50 22 50.5 23.5 49.5L50 30L76.5 49.5C78 50.5 80 50 81 48.5C82 47 81.5 45.1 80 44L50 22Z" 
                    fill="white" 
                />
                {/* Dinding Rumah */}
                <path 
                    d="M28 50V74C28 76.2 29.8 78 32 78H68C70.2 78 72 76.2 72 74V50L50 33L28 50Z" 
                    fill="white" 
                    fillOpacity="0.9"
                />
                {/* 4 Jendela Oranye */}
                <rect x="42" y="52" width="7" height="7" rx="1.5" fill="#FF8A00" />
                <rect x="51" y="52" width="7" height="7" rx="1.5" fill="#FF8A00" />
                <rect x="42" y="61" width="7" height="7" rx="1.5" fill="#FF8A00" />
                <rect x="51" y="61" width="7" height="7" rx="1.5" fill="#FF8A00" />
            </svg>
        );
    }

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Logo Mark Icon */}
            <svg 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 shrink-0"
            >
                {/* Orang Kiri (Biru Muda) */}
                <circle cx="18" cy="36" r="6" fill="#0070F3" />
                {/* Orang Kanan (Biru Muda) */}
                <circle cx="82" cy="36" r="6" fill="#0070F3" />
                {/* Atap Rumah (Biru Tua) */}
                <path 
                    d="M50 18L10 46C8 47.5 7.5 50.5 9 52.5C10.5 54.5 13.5 55 15.5 53.5L50 29L84.5 53.5C86.5 55 89.5 54.5 91 52.5C92.5 50.5 92 47.5 90 46L50 18Z" 
                    fill="#002B7F" 
                />
                {/* Dinding Rumah (Biru Muda) */}
                <path 
                    d="M22 52V82C22 84.2 23.8 86 26 86H74C76.2 86 78 84.2 78 82V52L50 32L22 52Z" 
                    fill="#0070F3" 
                />
                {/* 4 Jendela Oranye */}
                <rect x="39" y="54" width="9" height="9" rx="2" fill="#FF8A00" />
                <rect x="52" y="54" width="9" height="9" rx="2" fill="#FF8A00" />
                <rect x="39" y="66" width="9" height="9" rx="2" fill="#FF8A00" />
                <rect x="52" y="66" width="9" height="9" rx="2" fill="#FF8A00" />
            </svg>

            {/* Typography */}
            <div className="flex flex-col">
                <div className="flex items-baseline font-black tracking-tight leading-none text-2xl">
                    <span className="text-[#002B7F]">TULUNG</span>
                    <span className="text-[#0070F3]">JUAL</span>
                    <span className="text-[#FF8A00]">.ID</span>
                </div>
                <div className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#002B7F] mt-0.5">
                    MARKETPLACE PROPERTI
                </div>
                {showTagline && (
                    <div className="text-[10px] text-slate-500 font-medium tracking-normal mt-0.5">
                        Temukan Properti yang Tepat.
                    </div>
                )}
            </div>
        </div>
    );
}
