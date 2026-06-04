/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    // eslint-config-next@13 (pinned in dependencies) is incompatible with Next.js 15 flat config.
    // Run `npm run lint` separately; don't block the build.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'photo.yupoo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/proxy-image/**',
      },
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/api/proxy-image/**',
      },
    ],
    dangerouslyAllowSVG: true,
    // Ensure images render in-browser (not downloaded)
    contentDispositionType: 'inline',
    contentSecurityPolicy: "default-src 'self'; script-src 'none';",
  },
  webpack(config) {
    // MetaMask SDK and WalletConnect pull in optional React Native / Node deps
    // that don't exist in a browser bundle. Stub them out so webpack doesn't warn.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@react-native-async-storage/async-storage': false,
      'pino-pretty': false,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Referer',
            value: 'https://jersey-factory.x.yupoo.com/',
          },
          {
            key: 'User-Agent',
            value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;