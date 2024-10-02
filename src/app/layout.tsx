import ActivityListener from '@/components/ActivityListener';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { verifySession } from '@/lib/session';
import { ChakraProvider } from '@chakra-ui/react';
import type { Metadata } from "next";
import { Nunito } from 'next/font/google';
import { SessionProvider } from './context/SessionProvider';
import { WeekProvider } from './context/WeekContext';
import "./globals.css";
import { UserProvider } from './context/UserContext';

export const metadata: Metadata = {
  title: "Calorie Tracker App",
  description: "Track your calories and stay healthy!"
};

const roboto = Nunito({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await verifySession();

    return (
      <html lang="en">
        <body className={`${roboto.className} min-h-screen bg-gray-50 min-w-fit`}>
          <SessionProvider initialSession={session}>
            <ActivityListener />
            <Navigation/>
            <UserProvider>
              <WeekProvider>
                <ChakraProvider>{children}</ChakraProvider>
              </WeekProvider>
            </UserProvider>
            <Footer />
          </SessionProvider>
        </body>
      </html>
  )
}
