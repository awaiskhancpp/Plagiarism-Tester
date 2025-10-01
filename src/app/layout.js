// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RoleModal from "@/components/RoleModal";

import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <RoleModal />
        </AuthProvider>
      </body>
    </html>
  );
}
