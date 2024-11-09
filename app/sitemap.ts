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
      priority: 0.5,
    },
    {
        url: 'https://iamshium.vercel.app/#text-me',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
  ]
}