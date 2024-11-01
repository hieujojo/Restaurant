// /** @type {import('next').NextConfig} */
const nextConfig = {};
// next.config.mjs

export default {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8800/api/:path*', // Proxy to Backend
            },
            {
                source: '/:path*',
                destination: 'http://localhost:8800/:path*', // Proxy to Backend Images
            },
        ];
    },
    images: {
        domains: ['localhost'], // Thay thế bằng domain của bạn nếu khác
        formats: ['image/avif', 'image/webp'],
    },
};

// export default nextConfig;
