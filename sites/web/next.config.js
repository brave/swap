const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  ...nextConfig,
  webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Perform customizations to webpack config
    config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: 'node_modules/brave-wallet-lists/images',
              to: path.join(__dirname, 'public/images/')
            },
          ],
        })
    )

    // Important: return the modified config
    return config
  },
}
