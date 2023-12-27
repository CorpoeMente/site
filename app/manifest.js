export default function manifest() {
    return {
        name: 'Clínica Corpo e Mente',
        short_name: 'Clínica Corpo e Mente',
        description: 'Clínica Especializada em Psicologia e Neuropsicologia',
        start_url: '/',
        display: 'standalone',
        background_color: '#000',
        theme_color: '#000',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
                purpose: 'any maskable',
            },
        ],
    }
}
