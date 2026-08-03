import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["typeorm", "pg"],
  // TypeORM loads its DB driver via a dynamic `require(name)` (the module
  // name is a variable, not a string literal), so Vercel's static output
  // file tracing can't detect that "pg" is actually needed and drops it
  // from the deployed function — causing DriverPackageNotInstalledError at
  // runtime even though `pg` is a real dependency and works fine locally.
  outputFileTracingIncludes: {
    "/*": ["./node_modules/pg*/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
