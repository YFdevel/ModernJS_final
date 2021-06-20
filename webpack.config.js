module.exports = {
    entry: "../ModernJS-8/js/main.js",
    output: {
        filename: "./build.js"
    },
    mode: 'production',
    watch: true,
    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000
    }
}