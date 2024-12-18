// webpack.config.js
const webpack = require('webpack');

module.exports = {
    // ... other configurations
    plugins: [
        // other plugins,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],
    // ...
};