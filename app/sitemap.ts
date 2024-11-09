import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://iamshium.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://iamshium.vercel.app/#about-me',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://iamshium.vercel.app/#portfolio',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://iamshium.vercel.app/#text-me',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}

export function getVideoMetadata() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Sheikh Mahmudul Hasan Shium",
    "description": "This is your friendly, neighbourhood, Web Developer",
    "thumbnailUrl": "https://iamshium.vercel.app/_next/image?url=%2Fprofile.png&w=96&q=75",
    "uploadDate": new Date().toISOString(),
    "contentUrl": "https://iamshium.vercel.app",
  }
}
