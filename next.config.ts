import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'media.licdn.com',
        },
        {
            protocol: 'https',
            hostname: 'raw.githubusercontent.com',
        },
        {
            protocol: 'https',
            hostname: 'upload.wikimedia.org',
        },
        {
            protocol: 'https',
            hostname: 'camo.githubusercontent.com',
        },
        {
            protocol: 'https',
            hostname: 'ui.shadcn.com',
        },
        {
            protocol: 'https',
            hostname: 'cdn.freelogovectors.net',
        }, 
        {
            protocol: 'https',
            hostname: 'cdn.icon-icons.com',
        },
        {
            protocol: 'https',
            hostname: 'feedback.clerk.com',
        },
        {
            protocol: 'https',
            hostname: 'images.stripeassets.com',
        },
        {
            protocol: 'https',
            hostname: 'encrypted-tbn0.gstatic.com',
        },
        {
            protocol: 'https',
            hostname: 'storage.googleapis.com',
        },
        {
            protocol: 'https',
            hostname: 'firebase.google.com',
        },
        {
            protocol: 'https',
            hostname: 'stripe.com',
        },
        {
            protocol: 'https',
            hostname: 'github.com',
        },
        
    ], 
},
};

export default nextConfig;
