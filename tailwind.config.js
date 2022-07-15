/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            'white': '#ffffff',
            "blue": "#3B66FF",
            "gold": "#FFD43B",
            "darkgold": "#D0AE33",
            "darkblue": "#1C223C",
            "darkgrey": "#161515",
            "lightgrey": "#D8E0FF"
        },
        fontFamily: {
            "fredoka": ["Fredoka One"],
            "open": ["Open Sans"]
        },
        extend: {},
    },
    plugins: [],
}
