import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Sheikh Mahmudul Hasan Shium",
  description: "Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" type="image/x-icon"/>

      <meta
        property="og:title"
        content="Sheikh Mahmudul Hasan Shium"
      />

      <meta
        property="og:description"
        content="Software Engineer  "
      />
      <meta
        name="twitter:card"
        content={"/profile.png"}
      />
      <meta property="twitter:title" content="Sheikh Mahmudul Hasan Shium"></meta>
      <meta property="twitter:description" content="Software Engineer  "></meta>
      <meta property="og:site_name" content="Sheikh Mahmudul Hasan Shium | Top Software Engineer Near You"></meta>
      <meta property="twitter:image" content={"/profile.png"}></meta>
      <meta property="og:url" content="https://iamshium.vercel.app/"></meta>
      <meta
        property="og:image"
        content={"/profile.png"}
      />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
