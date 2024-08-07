/** @type {import('next').NextConfig} */
const isLocalhost = process.env.NODE_ENV === 'development';
const nextConfig = {
    images: {
        domains: ['localhost'],
        unoptimized: true,
    },
    // Remove basePath and env configurations
    trailingSlash: true,
};

export default nextConfig;