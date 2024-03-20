/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
	  	config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
	  	return config;
	  },
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
