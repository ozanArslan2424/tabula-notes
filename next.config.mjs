/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
              },
              {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: '',
              }
        ]

    }
};

export default nextConfig;
