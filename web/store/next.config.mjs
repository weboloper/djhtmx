/** @type {import('next').NextConfig} */
const nextConfig = { 
    reactStrictMode: false,
    images: {
        domains: ['127.0.0.1']
    },
    async rewrites() {
        return [
          {
            source: '/@:username',
            destination: '/users/:username',
          },
        ];
      },
};

export default nextConfig;
