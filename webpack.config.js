var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var dev = process.env.NODE_ENV !== 'PRODUCTION';

module.exports = {
	entry : {
		app : './app'
	},

	output : {
	    filename : "js/[name].js",
	    path : dev ? './dist' : path.resolve('./build')
	},

	module : {
	    loaders : [
	        {
	            test: /\.jsx?$/,
	            exclude: /node_modules/,
	            loader: 'babel',
	            query: {
	                presets: ['react', 'es2015', 'stage-0']
	            }
	        },
	        {
	            test: /\.css$/,
	            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
	            // loader: "style!css"
	        },
	        {
	            test: /\.scss$/,
	            loaders: ['style', "css", "sass"]
	        },
	        {
	            test: /\.(png|jpg|jpeg|gif)$/, 
	            loader: 'url-loader?limit=80000&name=[path][name].[ext]'
	        },
	        {
	            test: /\.(woff|eot|ttf|svg)$/i,
	            loader: 'url-loader?limit=80000&name=[path][name].[ext]'
	        }
	    ]
	},

	resolve : {
	    
	},

	plugins : (function(){
	    var ret = [
	        // 生成单独的 css 文件
	        new ExtractTextPlugin( "css/[name].css"),
	        // 模块依赖去重
	        new webpack.optimize.DedupePlugin(),

	        new HtmlWebpackPlugin({
	            template: './demo/demos.html',
	            filename: 'demos.html',
	            inject: 'body'
	        })
	    ];

	    return ret;
	})(),

	devServer: {
	    contentBase : './build',
	    historyApiFallback: true,
	    port : 3202,
	    progress: true,
	    compress: true,
	    quiet : true,
	    noInfo : false,
	    hot : true
	}
};