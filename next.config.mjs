/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {

        domains:['localhost'],
        unoptimized : true,

    },

    basePath: process.env.NODE_ENV === 'production' ? '/rubicr-marketing-frontend' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/rubicr-marketing-frontend' : '',

    trailingSlash: true,
};

export default nextConfig;
