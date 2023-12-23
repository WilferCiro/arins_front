/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BACKEND_URL: process.env.API_BACKEND_URL,

    APP_DOMAIN: process.env.APP_DOMAIN,

    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    SECRET_JWT: process.env.SECRET_JWT,
    API_KEY_LOGIN: process.env.API_KEY_LOGIN,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.moralis.io',
        port: '2053',
      },
    ],
  },
};

module.exports = nextConfig;
