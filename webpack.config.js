var webpack = require('webpack');

module.exports = {
	entry: {
		client: "./src/client",
		server: "./src/server"
	},
	output: {
		path: './dist',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			},
			{ test: /\.css$/, loader: "style-loader!css-loader" }
		]
	},
	resolve: {
		alias: {
			'components': __dirname + '/src/components',
			'types': __dirname + '/src/types',
			'entity': __dirname + '/src/entity',
			'css': __dirname + '/css',
			'systems': __dirname + '/src/systems'
		}
	},
	plugins: [
		//new webpack.HotModuleReplacementPlugin()
	],
	devtool: 'eval',
	devServer: {
		//hot: true
	},
	watch: true,
	//recordsPath: __dirname + '/records.json'
};