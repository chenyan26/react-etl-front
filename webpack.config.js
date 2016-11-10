'use strict';

var path = require('path');
var fs = require('fs');

// For instructions about this file refer to
// webpack and webpack-hot-middleware documentation
var webpack = require('webpack');

var entryBase = [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client?reload=true'
];

console.log(__dirname);


var entries = fs.readdirSync(__dirname+'/src').reduce(function(entries, dir) {
    console.log(dir);
    if (fs.statSync(path.join(__dirname,'src', dir))
	.isDirectory() && dir !== 'node_modules')
	entries[dir] = entryBase.concat(path.join(__dirname, 'src', dir, 'app.js'));

    return entries;
}, {});

console.log('Found entries:');
console.log(entries);

module.exports = {
    debug: true,
    devtool: '#eval-source-map',
    // context: path.join(__dirname, 'app', 'js'),

    entry: entries,

    output: {
	path: __dirname + '/__build__',
	filename: '[name].bundle.js',
	chunkFilename: '[id].chunk.js',
	publicPath: '/__build__/'
    },

    /*
    resolve: {
	alias: {
	    'amazeui-react': path.join(__dirname, '../src/AMUIReact')
	}
    },
    */

    plugins: [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
    ],

    resolveLoader: {
	root: path.join(__dirname, 'node_modules')
    },

    module: {
	loaders: [
	    {
		test: /\.js$/,
		loaders: ['react-hot', 'babel'],
		include: [
		    path.join(__dirname, 'src'),
		    path.join(__dirname, 'src', 'admin')
		]
	    },
	    {
		test: /\.less$/,
		loaders: [
		    'style',
		    'css',
		    'autoprefixer',
		    'less'
		],
		include: [
		    path.join(__dirname, 'src', 'admin')
		]
	    }
	]
    }
};
