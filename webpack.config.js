module.exports = {
    //...
    devServer: {
      historyApiFallback: true,
      historyApiFallback: {
        rewrites: [
          { from: /^\/signUp/, to: '/views/SignUpView.html' },
        ],
      },
    },
  };
