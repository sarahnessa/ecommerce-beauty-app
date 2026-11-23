import type { NextConfig } from 'next';

// Check if explicitly building for GitHub Pages
const isGitHubPages = process.env.IS_GITHUB_PAGES === 'true';
const repoName = '/ecommerce-beauty-app';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Only apply prefixes when explicitly targeting GitHub Pages
  basePath: isGitHubPages ? repoName : '',
  assetPrefix: isGitHubPages ? `${repoName}/` : '',
};

export default nextConfig;
