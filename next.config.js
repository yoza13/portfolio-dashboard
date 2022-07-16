/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["media-exp1.licdn.com"],
  },
  env: {
    SEND_EMAIL_URL: process.env.SEND_EMAIL_URL,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(pdf)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
