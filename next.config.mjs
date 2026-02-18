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
                // {
                //     protocol: "https",
                //     hostname: "d3o47ov0yc40fm.cloudfront.net", // hashing
                //     pathname: "/**",
                // },
            ]
    }
};

export default nextConfig;
