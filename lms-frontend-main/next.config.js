/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/course",
        destination: "http://learn.educationnest.com/course-detail/"
      }
    ];
  }
};

module.exports = nextConfig;
