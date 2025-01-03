import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import StoreProvider from "@/providers/StoreProvider";
import AuthProvider from "@/providers/AuthProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <StoreProvider>
          <AuthProvider>
            <ReactQueryProvider>
                {children}
            </ReactQueryProvider>
            <ToastContainer />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
