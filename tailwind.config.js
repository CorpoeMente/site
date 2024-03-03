/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            sans: ['Urbanist', 'sans-serif'],
        },
        colors: {
            primary: '#003458',
            secondary: '#59b6de',
            'light-blue': '#DBFAFF',
            purple: '#DCD6FC',
            'light-purple': '#E2E9FC',
            pink: '#FFEEFF',
            orange: '#FEECE0',
            green: '#DFFDF9',
            'gray-dark': '#273444',
            gray: '#D9D9D9',
            'gray-light': '#d3dce6',
            white: '#FFFFFF',
            black: '#000000',
        },
        backgroundImage: {
            'gradient-45': 'linear-gradient(135deg, var(--tw-gradient-stops))',
            'gradient-180': 'linear-gradient(180deg, var(--tw-gradient-stops))',
            'gradient-to-r':
                'linear-gradient(to right, var(--tw-gradient-stops))',
        },
        keyframes: {
            slideDownAndFade: {
                from: { opacity: 0, transform: 'translateY(-2px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
            },
            slideLeftAndFade: {
                from: { opacity: 0, transform: 'translateX(2px)' },
                to: { opacity: 1, transform: 'translateX(0)' },
            },
            slideUpAndFade: {
                from: { opacity: 0, transform: 'translateY(2px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
            },
            slideRightAndFade: {
                from: { opacity: 0, transform: 'translateX(-2px)' },
                to: { opacity: 1, transform: 'translateX(0)' },
            },
        },
        animation: {
            slideDownAndFade:
                'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            slideLeftAndFade:
                'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            slideUpAndFade:
                'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            slideRightAndFade:
                'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        },
    },
    plugins: [require('flowbite/plugin'), 'tailwindcss/nesting'],
    darkMode: 'class',
}
