const nextConfig = {
  output: "export",
  experimental: {
    // D3 page transitions via React <ViewTransition> (see app/*/template.tsx)
    viewTransition: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
