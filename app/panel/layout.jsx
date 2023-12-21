import { NextAuthProvider } from '../Provider'
export default function RootLayout({ children }) {
    return (
        <html lang="pt-br">
            <body>
                <NextAuthProvider>{children}</NextAuthProvider>
            </body>
        </html>
    )
}
