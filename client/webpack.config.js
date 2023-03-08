var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  cache: true,
  mode: 'development',
  output: {
    path: __dirname,
    filename: '../src/main/resources/static/built/bundle.js'
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, '.'),
        exclude: [/(node_modules)/, /\.json$/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  // CHANGE THIS
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "REACT_APP_AUTH0_DOMAIN": JSON.stringify("dev-pcky01vnwqgbdjnz.us.auth0.com"),
        "REACT_APP_AUTH0_CLIENT_ID": JSON.stringify("NErva1C7e4BYmfD3c3XmiPY5hVz3Ux0Z")
      }
    }),
  ]
};
