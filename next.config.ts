import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/ecommerce-beauty-app' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/ecommerce-beauty-app' : '',
  },
};

export default nextConfig;
