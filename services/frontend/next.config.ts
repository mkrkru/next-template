import { NextConfig } from 'next';

// const withPWA = require('next-pwa')({
//     dest: 'public',
//     disable: process.env.NODE_ENV === 'development'
// });

// module.exports = withPWA({
//     output: 'standalone',
//     reactStrictMode: false,
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: '*.twodev.cc'
//             }
//         ]
//     }
// })

const config: NextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ['@chakra-ui/react']
  }
};

export default config;
