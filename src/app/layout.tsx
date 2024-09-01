import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import Navigation from '../components/Navigation';

export const metadata: Metadata = {
  title: "Calorie Tracker App",
  description: "Track your calories and stay healthy!"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navigation></Navigation>
          <div className='container mx-auto'>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
