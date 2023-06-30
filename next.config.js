/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  async headers() {
    return [
      {
        source: "/Build/:path*\\.gz",
        locale: false,
        headers: [
          {
            key: "Content-Encoding",
            value: "gzip",
          },
          {
            key: "Content-Type",
            value: "application/gzip",
          },
          {
            key: "Content-Disposition",
            value: "attachment",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
