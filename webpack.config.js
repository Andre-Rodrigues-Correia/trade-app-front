module.exports = {
    //...
    devServer: {
      historyApiFallback: {
        rewrites: [
          { from: /^\/signUp/, to: '/views/SignUpView.html' },
        ],
      },
    },
  };
