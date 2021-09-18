const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") {
    mode = "production";
}

module.exports = {
    mode: mode,

    entry: {
        theme_js_index: path.resolve(__dirname, "src/js/index.js"),
        theme_css_index: path.resolve(__dirname, "src/styles/index.scss"),
    },

    output: {
        path: path.resolve(__dirname, "public"),
        filename: 'js/[name].js',
    },

    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { publicPath: "" }
                    },
                    "css-loader", "postcss-loader", "sass-loader"
                ],
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        }),
        new IgnoreEmitPlugin(/theme_css.*\.js$/),
        new IgnoreEmitPlugin(/images\.js$/),
        new ImageMinimizerPlugin({
            minimizerOptions: {
                // Lossless optimization with custom option
                // Feel free to experiment with options for better result for you
                plugins: [
                    ["gifsicle", { 
                        interlaced: true ,
                        optimizationLevel: 3
                    }],
                    ["mozjpeg", { 
                        progressive: true,
                        quality: 80, 
                    }],
                    ["pngquant", { quality: [0.7, 0.8] }],
                    // Svgo configuration here https://github.com/svg/svgo#configuration
                    ["svgo", { }],
                ],
            },
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/images/*.png",
                    to: "images/[name][ext]",
                    noErrorOnMissing: true,
                },
                {
                    from: "./src/images/*.jpg",
                    to: "images/[name][ext]",
                    noErrorOnMissing: true,
                },
                {
                    from: "./src/images/*.jpeg",
                    to: "images/[name][ext]",
                    noErrorOnMissing: true,
                },
                {
                    from: "./src/images/*.gif",
                    to: "images/[name][ext]",
                    noErrorOnMissing: true,
                },
                {
                    from: "./src/images/*.svg",
                    to: "images/[name][ext]",
                    noErrorOnMissing: true,
                }
            ]
        }),
    ],

    resolve: {
        extensions: [".js"],
    },

    devtool: "source-map",
};