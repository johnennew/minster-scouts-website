const withNextra = require('nextra')({
  theme: 'nextra-theme-blog',
  themeConfig: './theme.config.js',
  unstable_staticImage: true,
})

module.exports = {
  images: {
    loader: 'imgix',
    path: '',
  },
  ...withNextra()
};
