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
  // TypeORM registers each entity's metadata under its class's runtime
  // `.name` (e.g. Product.name === "Product"), and matches repository
  // lookups against that name whenever the exact class reference doesn't
  // match (which happens routinely here, since Next.js compiles Server
  // Components, Server Actions, and Route Handlers as separate module
  // graphs, each getting its own copy of our entity classes). Minifying
  // server code renames those classes inconsistently per chunk, breaking
  // the name-based fallback match and throwing EntityMetadataNotFoundError.
  experimental: {
    serverMinification: false,
    turbopackMinify: false,
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
