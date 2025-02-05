import { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google';
import ThemeProvider from "@/components/theme-provider";


export const metadata: Metadata = {
  title: "Sheikh Mahmudul Hasan Shium",
  description: "Sheikh Mahmudul Hasan Shium is a passionate software engineer with expertise in full-stack development, web technologies, and delivering high-quality software solutions. 📧 officials.shium@gmail.com",
  metadataBase: new URL("https://iamshium.vercel.app/"),  // Add this line
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
    siteName: "Sheikh Mahmudul Hasan Shium | Top Software Engineer Near You",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheikh Mahmudul Hasan Shium",
    description: "Sheikh Mahmudul Hasan Shium is a passionate software engineer with expertise in full-stack development, web technologies, and delivering high-quality software solutions.",
    images: ["/profile.png"],
    creator: "@shium",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" >
      <head>
      <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content="iamShium" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
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
        <meta name="twitter:creator" content="@skshium" />
        <meta name="twitter:site" content="@shium" />
        {/* Optional: Facebook verification */}
        <meta property="fb:app_id" content="3813506352229130" />
      </head>
      <body  suppressHydrationWarning> 
        <ThemeProvider >{children}</ThemeProvider>
      </body>
    </html>
  );
}
