import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PHIR VIEW",
  description: "FHIR Pharmacy Viewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
           <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900">
            {/* <div className="w-full flex-none md:w-2">
              <NavBar />
            </div> */}
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
              {children}
            </div>
          </div>
      </body>
    </html>
  );
}
