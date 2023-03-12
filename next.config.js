/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/weather/2.7527/54.6641/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
