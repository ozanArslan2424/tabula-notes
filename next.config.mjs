/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
                port: "",
              },
              {
                protocol: "https",
                hostname: "via.placeholder.com",
                port: "",
              },
              {
                protocol:"https",
                hostname:"lh3.googleusercontent.com",
                port:""
              },
              {
                protocol:"https",
                hostname: "utfs.io",
                port:""
              }
        ]

    }
};

export default nextConfig;
