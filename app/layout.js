import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import {
  homeMetadata,
  businessStructuredData,
  serializeJsonLd,
} from "./seo.mjs";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = homeMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(businessStructuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
