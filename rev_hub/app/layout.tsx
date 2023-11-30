import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/footer'

export const metadata: Metadata = {
    title: 'RevHub',
    description: 'Applicazione sviluppata dal gruppo G13',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div>

                {children}
                <p>l1</p>
                </div>
                <Footer banane={5} mele={10} />
            </body>
        </html>
    )
}
