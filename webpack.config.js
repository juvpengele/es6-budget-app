const path = require("path");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "public/assets")
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};