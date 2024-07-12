import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import RootProvider from "@/providers/root";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "My Cyber Fun",
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
          <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="sm:h-[6rem] md:h-[5rem] lg:h-20" />
            {children}
          </div>
        </RootProvider>
      </body>
    </html>
  );
}
