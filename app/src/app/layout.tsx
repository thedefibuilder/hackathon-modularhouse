import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import RootProvider from "@/providers/root";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "My Cyber Fund",
  description:
    "Easily launch your Token on Cyber and share it with the community.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <RootProvider>
          <Header />
          <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            {children}
          </div>
        </RootProvider>
      </body>
    </html>
  );
}
