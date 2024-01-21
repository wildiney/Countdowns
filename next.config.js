/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack: (config => {
    //     config.watchOptions = {
    //         poll: 1000,
    //         aggregateTimeout: 300,
    //         ignored: ['**/node_modules']
    //     }
    //     return config
    // }),
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'source.unsplash.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: ''
            }
        ]
    }
}

module.exports = nextConfig
