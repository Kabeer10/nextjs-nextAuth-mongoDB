import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Define you custom font here and add font variable in tailwind.config.ts and in root layout html tag
// Default font is Inter for body, defined in global.css

export const metadata = {
  title:
    "NextJS, TailwindCSS, NextAuth, MongoDB, Mongoose, Typescript Template",
  description: "Generated by Kabeer",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeCookie = cookies().get("theme")?.value ?? "light";
  return (
    // ADD More fonts here
    <html lang="en" data-theme={themeCookie} className={`${inter.variable}`}>
      <body>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
