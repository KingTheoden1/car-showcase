/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['carimagesapi.com', 'upload.wikimedia.org']
    },
    typescript: {
        ignoreBuildErrors: true,
    }
}

module.exports = nextConfig