/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      `${process.env.AWS_BUCKET}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com`,
    ],
  },
  // Configurações específicas para Windows em desenvolvimento
  ...(process.env.NODE_ENV === 'development' && process.platform === 'win32'
    ? {
        webpack: (config) => {
          config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
          }
          return config
        },
      }
    : {}),
}

module.exports = nextConfig 