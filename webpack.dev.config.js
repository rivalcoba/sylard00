const path = require('path')
const MiniExtractCssPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './client/index.js',
  output: {
    filename: 'js/index.js', // outputfile
    publicPath: '/', // only to serve files virtually
    path: path.resolve(__dirname, 'server/public'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'server','public'),
    port: 3000,
    host: 'localhost'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env',
              {
                'modules': "auto",
                'useBuiltIns': 'usage',
                'targets': {"chrome": "80"},
                'corejs': 3
              }]
            ],
            "plugins":[
              [
                "module-resolver",
                {
                  "root": ["./"],
                  "alias": {
                    "@client" : "./client",
                    "@chelpers": "./client/helpers",
                    "@node_modules" : "./node_modules"
                  }
                }
              ]
            ]
          }
        },
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        },
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true, // optional
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniExtractCssPlugin.loader, // Extrae css
          'css-loader', // Permite compilar css
        ],
      },
    ],
  },
  plugins: [
    // new CopyWebpackPlugin({
    //     patterns: Assets.map(asset => {
    //         return {
    //             from: path.resolve(__dirname, `./node_modules/${asset}`),
    //             to: path.resolve(__dirname, './server/public/vendor')
    //         };
    //     })
    // }),
    new VueLoaderPlugin(),
    new MiniExtractCssPlugin({
      filename: 'styles/index.css',
    }),
  ],
}
