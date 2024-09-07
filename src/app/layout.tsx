import { Nunito } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";
import { ChakraProvider } from '@chakra-ui/react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ActivityListener from '@/components/ActivityListener';

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

    return (
      <html lang="en">
        <body className={`${roboto.className} min-h-screen bg-gray-50 min-w-fit`}>
          <ActivityListener />
          <Navigation />
          <ChakraProvider>{children}</ChakraProvider>
          <Footer />
        </body>
      </html>
  )
}
