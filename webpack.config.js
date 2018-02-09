const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { existsSync } = require('fs');

module.exports = {
	entry: {
		app: existsSync('./src/index.js') ? './src/index.js' : './src/index.ts',
		tests: './tests/unit/all.ts'
	},
	output: {
		path: resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, use: 'ts-loader' }
		]
	},
	resolve: {
		extensions: [ '*', '.js', '.ts' ]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
			inject: 'body',
			excludeChunks: ['tests']
		})
	],
	devtool: 'source-map'
};
