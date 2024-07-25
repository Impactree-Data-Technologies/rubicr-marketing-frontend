/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {

        domains:['localhost'],
        unoptimized : true,

    },

    basePath: '/rubicr-marketing-frontend',

    assetPrefix: '/rubicr-marketing-frontend',

    trailingSlash: true,
};

export default nextConfig;
