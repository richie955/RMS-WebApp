"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Spinner = () => (
  <div className="flex items-center justify-center w-full h-screen bg-gray-800">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const noSidebarPages = ["/", "/signin", "/signup"];
  const showSidebar = !noSidebarPages.includes(pathname);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Simulate loading time
  }, []);

  return (
    <html lang="en">
      <body
        className={` antialiased flex   bg-gray-900`}
        style={{ fontFamily: "'Jakarta', sans-serif" }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            {showSidebar && <Sidebar />}
            <div className="w-full h-[100vh]">
              <nav className="bg-gray-900 text-white p-4 h-[10%] flex justify-between items-center">
              <h1  className="text-2xl font-bold">
  Restaurant Management System
</h1>

                <ul className="flex gap-6">
                  <li>
                    <a href="/" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/signin" className="hover:underline">
                      Sign In
                    </a>
                  </li>
                  <li>
                    <a href="/signup" className="hover:underline">
                      Sign Up
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard" className="hover:underline">
                      Dashboard
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="w-full min-h-full">{children}</div>
            </div>
          </>
        )}
      </body>
    </html>
  );
}