import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = '/ecommerce-beauty-app';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only apply prefixes when building for GitHub Pages production
  basePath: isProd ? repoName : '',
  assetPrefix: isProd ? `${repoName}/` : '',
};

export default nextConfig;
