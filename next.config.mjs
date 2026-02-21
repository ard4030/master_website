/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  reactCompiler: true,
      images:{
            remotePatterns:[
                {
                    protocol:"https",
                    pathname:"/**",
                    hostname:"fakestoreapi.com",
                },
                {
                    protocol: "https",
                    hostname: "sleepy-moser-ro-qpewlr.storage.c2.liara.space", // hashing
                    pathname: "/**",
                },
            ]
    }
};

export default nextConfig;
