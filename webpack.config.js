module.exports = {
    entry: ["./app/assets/scripts/index.js"],
    output: {
        path: __dirname + "/app/temp/assets/scripts",
        filename: "app.js"
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ["react", "es2015", "stage-1"]
                }
            }
        ]
    }
}