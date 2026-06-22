/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    // Dangerously allow production builds to successfully complete 
    // even if your project has type errors.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
/*
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  config options here  
};

export default nextConfig; */


