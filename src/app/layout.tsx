import ActivityListener from "@/components/ActivityListener";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { verifySession } from "@/lib/session";
import { ChakraProvider } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { SessionProvider } from "./context/SessionProvider";
import { WeekProvider } from "./context/WeekContext";
import "./globals.css";
import { UserProvider } from "./context/UserContext";
import { MealProvider } from "./context/MealContext";

export const metadata: Metadata = {
  title: "Calorie Tracker App",
  description: "Track your calories and stay healthy!",
};

const roboto = Nunito({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();

  return (
    <html lang="en" className="h-full box-border">
      <body
        className={`${roboto.className} min-h-full bg-gray-100 text-gray-600 pb-16`} // bottom padding for footer or add/save meal buttons in smaller screens
      >
        <SessionProvider initialSession={session}>
          <ActivityListener />
          <Navigation />
          <UserProvider>
            <WeekProvider>
              <MealProvider>
                <ChakraProvider>{children}</ChakraProvider>
              </MealProvider>
            </WeekProvider>
          </UserProvider>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
