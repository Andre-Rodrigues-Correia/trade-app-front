module.exports = {
  //...
  devServer: {
    historyApiFallback: true,
    rewrites: [
      { from: /^\/$/, to: '/views/index.html' },
      { from: /^\/signUp/, to: '/views/signUp.html' },
    ],
  },
};