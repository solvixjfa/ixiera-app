import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import "./globals.css";

const defaultUrl = process.env.NODE_ENV === 'production'
  ? "https://ixiera.id"
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Ixiera.id - Hybrid Agency Platform",
  description: "Kelola project, invoice, dan asset klien dalam satu tempat dengan AI assistant 24/7",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.className} antialiased`}>
          
          {/* SIHIR UMAMI ANALYTICS */}
          <Script 
            src="https://cloud.umami.is/script.js" 
            data-website-id="8623ed6d-c276-407c-b49a-b03c01a11e0c" 
            strategy="afterInteractive"
          />

          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {/* Bersih dari Newsletter */}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}