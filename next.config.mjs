/** @type {import('next').NextConfig} */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 要設置 images + hostname，不然會 complain
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
  // 處理使用不到 middleware，看 stack overflow 加的
  // pageExtensions: ["ts", "tsx"],
};

export default nextConfig;
