import { Nunito } from 'next/font/google';
import type { Metadata } from "next";
import "./globals.css";
import { ChakraProvider } from '@chakra-ui/react';
import Navigation from '../components/Navigation';

export const metadata: Metadata = {
  title: "Calorie Tracker App",
  description: "Track your calories and stay healthy!"
};

const roboto = Nunito({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
    return (
    
      <html lang="en">
        <body className={roboto.className}>
          <Navigation></Navigation>
          <div className='container mx-auto w-3/5 text-xl'>
            <ChakraProvider>{children}</ChakraProvider>
          </div>
        </body>
      </html>
    
  )
}
