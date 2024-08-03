/** @type {import('next').NextConfig} */

const isLocalhost = process.env.NODE_ENV === 'development';
const nextConfig = {

    images: {

        domains:['localhost'],
        unoptimized : true,

    },

    // basePath: process.env.NODE_ENV === 'production' ? '/rubicr-marketing-frontend' : '',
    // assetPrefix: process.env.NODE_ENV === 'production' ? '/rubicr-marketing-frontend' : '',

    basePath: isLocalhost ? '' : '/rubicr-marketing-frontend',
    env: {
      NEXT_PUBLIC_BASE_PATH: isLocalhost ? '' : '/rubicr-marketing-frontend',
    },

    trailingSlash: true,
};

export default nextConfig;
