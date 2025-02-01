/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['media.graphassets.com', 'localhost', '31.220.51.235'],
		dangerouslyAllowSVG: true
	}
}

export default nextConfig
