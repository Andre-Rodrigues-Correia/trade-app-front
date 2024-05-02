module.exports = {
  //...
  devServer: {
    historyApiFallback: true,
    rewrites: [
      // { from: /^\/$/, to: '/views/landing.html' },
      // { from: /^\/subpage/, to: '/views/subpage.html' },
      // { from: /./, to: '/views/404.html' },
    ],
  },
};