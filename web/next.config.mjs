/** @type {import('next').NextConfig} */
const nextConfig = { 
    reactStrictMode: false,
    images: {

        remotePatterns: [
            {
              protocol: "http",
              hostname: "127.0.0.1",
            },
          ],

      
    },
    experimental: {
        serverActions: {
          bodySizeLimit: '20mb',
        },
    },
    
};

export default nextConfig;
