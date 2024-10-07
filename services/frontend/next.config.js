/** @type {import('next').NextConfig} */

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

// eslint-disable-next-line no-undef
module.exports = {
    output: 'standalone',
    reactStrictMode: false
}