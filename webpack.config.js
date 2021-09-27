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
        //output filename: path/to/source/file

        //theme js files
        theme_js_index: "./src/js/index.js",
        // You can add multiple files to one entry
        // theme_js_index: ["./src/js/index.js", "./src/js/test.js"],
        
        //theme critical js files
        theme_js_critical_index: "./src/js/critical/critical_index.js",

        //theme ts files
        //theme_js_index: "./src/ts/index.ts",
        //theme critical ts files
        //theme_js_critical_index: "./src/ts/critical/critical_index.ts",

        //theme css files
        theme_css_index: "./src/styles/index.scss",
        theme_css_blog: "./src/styles/blog.scss",
        theme_css_post: "./src/styles/post.scss",

        //theme critical css files
        theme_css_critical_index: "./src/styles/critical_styles/critical_index.scss",
        theme_css_critical_blog: "./src/styles/critical_styles/critical_blog.scss",
        theme_css_critical_post: "./src/styles/critical_styles/critical_post.scss",
    },

    output: {
        //output directory
        path: path.resolve(__dirname, "public"),
        filename: 'js/[name].js',
    },

    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                exclude: /node_modules/,
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
        new IgnoreEmitPlugin(/theme_css.*\.js$/),
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
                // images
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
                },
                // fonts
                {
                    from: "./src/fonts/*.otf",
                    to: "fonts/[name][ext]",
                    noErrorOnMissing: true,
                },
                {
                    from: "./src/fonts/*.ttf",
                    to: "fonts/[name][ext]",
                    noErrorOnMissing: true,
                },
                {
                    from: "./src/fonts/*.eot",
                    to: "fonts/[name][ext]",
                    noErrorOnMissing: true,
                },
                {
                    from: "./src/fonts/*.woff",
                    to: "fonts/[name][ext]",
                    noErrorOnMissing: true,
                },
                {
                    from: "./src/fonts/*.woff2",
                    to: "fonts/[name][ext]",
                    noErrorOnMissing: true,
                }
            ]
        }),
    ],

    resolve: {
        extensions: [".js, .ts"],
    },

    devtool: "source-map",
};
