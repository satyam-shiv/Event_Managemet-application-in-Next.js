import type { Metadata } from "next";
import { Geist, Geist_Mono, Martian_Mono, Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRays from '../components/LightRays';
import Navbar from '../components/Navbar';

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The Hub for Every Dev Event You Mustn't Miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("q", "antialiased", schibstedGrotesk.variable, martianMono.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <div className="fixed inset-0 -z-10">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1.5}
              lightSpread={0.5}
              rayLength={3}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              className="custom-rays"
              pulsating={false}
              fadeDistance={1}
              saturation={1}
            />
         </div>
         
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
