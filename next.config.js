/* eslint-disable no-underscore-dangle */
import path from 'path';
import { fileURLToPath } from 'url';

// Convert the URL to a directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url));
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'src/styles')],
  },
  experimental: {
    reactCompiler: true,
    ppr: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default config;
