import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pages deployment path:
  // If repository name is "hayrunnisa-portfolio-os", URL will be: https://<username>.github.io/hayrunnisa-portfolio-os/
  // Set basePath to matching repository subfolder name (with leading slash).
  // If repository name is exactly "<username>.github.io", change this to undefined or remove it.
  basePath: isProd ? "/hayrunnisa-portfolio-os" : undefined,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
