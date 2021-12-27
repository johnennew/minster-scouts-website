const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.js',
  unstable_staticImage: true,
  images: {
    loader: "imgix",
    path: "https://noop/",
  }
})
module.exports = withNextra()
