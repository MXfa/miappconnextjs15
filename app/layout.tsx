
import './globals.css'
import { inter } from '@/components/shared/fonts'
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from '@/lib/constants'
import { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import ServiceWorkerProvider from './ServiceWorkerProvider'

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
    
  },
  manifest:"/manifest.json",
  description: APP_DESCRIPTION,
  icons: {
    icon: "/imagenes/icons/icon-192x192.png", 
    shortcut: "/imagenes/icons/icon-512x512.png", 
  },

  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ServiceWorkerProvider />
       <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}