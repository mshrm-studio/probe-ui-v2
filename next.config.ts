import { locales } from '@/utils/enums/Locale';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/nouns',
                permanent: true,
            },
        ];
    },
    experimental: {
        useCache: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'probewtf.fra1.cdn.digitaloceanspaces.com',
            },
        ],
    },
    webpack: (config) => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    },
};

export default nextConfig;
