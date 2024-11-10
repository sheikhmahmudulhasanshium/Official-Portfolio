import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'

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
  description: "Sheikh Mahmudul Hasan Shium is a passionate software engineer with expertise in full-stack development, web technologies, and delivering high-quality software solutions. 📧 officials.shium@gmail.com",
  openGraph: {
    title: "Sheikh Mahmudul Hasan Shium",
    description: "Sheikh Mahmudul Hasan Shium is a passionate software engineer with expertise in full-stack development, web technologies, and delivering high-quality software solutions.",
    url: "https://iamshium.vercel.app/",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "Sheikh Mahmudul Hasan Shium",
      },
    ],
    siteName: "Sheikh Mahmudul Hasan Shium | Top Software Engineer Near You", // Correct property name here
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheikh Mahmudul Hasan Shium",
    description: "Sheikh Mahmudul Hasan Shium is a passionate software engineer with expertise in full-stack development, web technologies, and delivering high-quality software solutions.",
    images: ["/profile.png"], // Correct property name here
    creator: "@shium",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <GoogleTagManager gtmId="G-P72CS8VFGE" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Sheikh Mahmudul Hasan Shium" />
        <meta property="og:description" content="Sheikh Mahmudul Hasan Shium is a passionate software engineer with expertise in front-end development, web technologies, and delivering high-quality software solutions." />
        <meta property="og:url" content="https://iamshium.vercel.app/" />
        <meta property="og:site_name" content="Sheikh Mahmudul Hasan Shium | Top Software Engineer Near You" />
        <meta property="og:image" content="/profile.png" />
        <meta property="og:image:alt" content="Sheikh Mahmudul Hasan Shium" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sheikh Mahmudul Hasan Shium" />
        <meta name="twitter:description" content="Sheikh Mahmudul Hasan Shium is a passionate software engineer with expertise in full-stack development, web technologies, and delivering high-quality software solutions." />
        <meta name="twitter:image" content="/profile.png" />
        <meta name="twitter:creator" content="@shium" />
        <meta name="twitter:site" content="@shium" />

        {/* Optional: Facebook verification */}
        <meta property="fb:app_id" content="3813506352229130" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
