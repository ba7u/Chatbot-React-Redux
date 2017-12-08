const { resolve } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCompiledSCSS = new ExtractTextPlugin({
    filename: './style.css',
    disable: false,
    allChunks: true
});

const config = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    output: {
        filename: 'bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: '',
    },
    module: {
        rules: [{
            test: /\.js|.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        'babel-preset-env',
                        'babel-preset-react',
                        'babel-preset-stage-2'
                    ]
                }
            }
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', { loader: 'sass-loader', query: { sourceMap: false } }],
                publicPath: '/'
            }),
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                'file-loader', {
                    loader: 'image-webpack-loader',
                    options: {
                        bypassOnDebug: true
                    }
                }
            ]
        }
        ]
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.jsx', '.scss', '.png', '.json', '.gif']
    },
    plugins: [
        extractCompiledSCSS
    ],
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        publicPath: '/'
    },
    devtool: 'eval'
}

module.exports = config;