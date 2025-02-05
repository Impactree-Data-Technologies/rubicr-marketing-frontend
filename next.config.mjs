/** @type {import('next').NextConfig} */
const isLocalhost = process.env.NODE_ENV === 'development';
const nextConfig = {
    images: {
        domains: ['localhost', 'rubicr.ai', 'www.rubicr.ai'],
        unoptimized: true,
    },
    trailingSlash: true,
    reactStrictMode : true,
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'www.rubicr.ai',
                    },
                ],
                destination: 'https://rubicr.ai/:path*',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;