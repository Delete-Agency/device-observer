const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env, argv) => {
    return {
        mode: 'production',
        entry: {
            'index': './src/index.ts'
        },
        output: {
            filename: './[name].js',
            library: 'device-observer',
            libraryTarget: 'umd',
            umdNamedDefine: true,
            globalObject: 'this',
        },
        resolve: {
            extensions: ['.ts'],
            modules: ['node_modules', path.resolve(__dirname, './src'), path.resolve(__dirname, './'), path.resolve(__dirname, './node_modules')]
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(jsx?)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.(tsx?)$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                }

            ]
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin(),
            new CleanWebpackPlugin()
        ]
    };
};
