const webpack = require('webpack');

module.exports = function override(config) {
    // Remove the ModuleScopePlugin which prevents importing modules from outside /src/
    config.resolve.plugins = config.resolve.plugins.filter(plugin => 
        !(plugin.constructor && plugin.constructor.name === "ModuleScopePlugin")
    );

    // Add polyfills
    config.resolve.fallback = {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url"),
        "zlib": require.resolve("browserify-zlib"),
        "path": require.resolve("path-browserify"),
        "fs": false,
        "net": false,
        "tls": false,
        "child_process": false
    };

    // Add plugins
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ];

    // Ignore warnings for source maps
    config.ignoreWarnings = [/Failed to parse source map/];

    // Add buffer to the list of modules that should be transpiled
    config.module.rules.unshift({
        test: /\.m?js$/,
        resolve: {
            fullySpecified: false
        }
    });

    // Add buffer as a global
    config.plugins.push(
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        })
    );

    return config;
}
