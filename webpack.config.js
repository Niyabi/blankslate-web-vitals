const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');

let mode = "development";

if (process.env.NODE_ENV === "production") {
    mode = "production";
}

module.exports = {
    mode: mode,

    entry: {
        //output filename: path/to/source/file
        //theme js files
        theme_js_index: path.resolve(__dirname, "src/js/index.js"),
        //theme critical js files
        theme_js_critical_index: path.resolve(__dirname, "src/js/critical/critcal_index.js"),

        //theme ts files
        //theme_js_index: path.resolve(__dirname, "src/ts/index.ts"),
        //theme critical ts files
        //theme_js_critical_index: path.resolve(__dirname, "src/ts/critical/critical_index.ts"),

        theme_css_index: path.resolve(__dirname, "src/styles/index.scss"),
        theme_css_blog: path.resolve(__dirname, "src/styles/blog.scss"),
        theme_css_post: path.resolve(__dirname, "src/styles/post.scss"),
        //theme critical css files
        theme_css_critical_index: path.resolve(__dirname, "src/styles/critical_styles/critical_index.scss"),
        theme_css_critical_blog: path.resolve(__dirname, "src/styles/critical_styles/critical_blog.scss"),
        theme_css_critical_post: path.resolve(__dirname, "src/styles/critical_styles/critical_post.scss"),
    },

    output: {
        //output directory
        path: path.resolve(__dirname, "public"),
        filename: 'js/[name].js',
        assetModuleFilename: "images/[hash][ext][query]",
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)/i,
                type: "asset/resource",
            },
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
            },
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            //output css files to styles folder
            filename: 'styles/[name].css'
        }),
        new IgnoreEmitPlugin(/theme_css.*\.js$/)
    ],

    resolve: {
        extensions: [".js, .ts"],
    },

    devtool: "source-map",
};