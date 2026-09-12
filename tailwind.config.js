import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    dark: '#002B7F',   // Biru Tua: Kepercayaan, Profesional
                    blue: '#0070F3',   // Biru Muda: Modern, Ramah
                    light: '#EBF4FF',  // Biru Lembut Background
                    orange: '#FF8A00', // Oranye: Optimisme, Kesempatan
                    'orange-hover': '#E67A00',
                },
            },
        },
    },

    plugins: [forms],
};
