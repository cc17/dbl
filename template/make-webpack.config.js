'use strict';

// @see http://christianalfoni.github.io/javascript/2014/12/13/did-you-know-webpack-and-react-is-awesome.html
// @see https://github.com/webpack/react-starter/blob/master/make-webpack-config.js

var path = require('path');
var fs = require('fs');

var webpack = require('webpack');
var _ = require('lodash');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var srcDir = path.resolve(process.cwd(), './src');
var assets = 'build/';
var sourceMap = require('./aliasMap.json');

var excludeFromStats = [
    /node_modules[\\\/]/
];

function makeConf(options) {
    options = options || {};

    var debug = options.debug !== undefined ? options.debug : true;
    var entries = genEntries(); 
    var chunks = Object.keys(entries);
    var config = {
        entry: entries,

        output: {
            // 在debug模式下，__build目录是虚拟的，webpack的dev server存储在内存里
            path: path.resolve(debug ? '__build' : assets),
            filename: debug ? '[name].js' : 'scripts/[name].js',
            chunkFilename: debug ? '[chunkhash:8].chunk.js' : 'scripts/[chunkhash:8].chunk.min.js',
            hotUpdateChunkFilename: debug ?'[id].[chunkhash:8].js' : 'scripts/[id].[chunkhash:8].min.js',
            publicPath: debug ? '/__build/' : ''
        },
        externals:{
            'jQuery':'window.jQuery',
            '$':'window.Zepto',
        },

        resolve: {
            root: [srcDir, './node_modules'],
            alias: sourceMap,
            extensions: ['', '.js', '.css', '.scss', '.tpl', '.png', '.jpg']
        },

        resolveLoader: {
            root: path.join(__dirname, 'node_modules')
        },
        module: {
            noParse: ['zepto'],
            loaders: [
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: [
                        'image?{bypassOnDebug: true, progressive:true, \
                            optimizationLevel: 3, pngquant:{quality: "65-80", speed: 4}}',
                        // url-loader更好用，小于10KB的图片会自动转成dataUrl，
                        // 否则则调用file-loader，参数直接传入
                        'url?limit=10000&name=img/[hash:8].[name].[ext]',
                    ]
                },
                {
                    test: /\.(woff|eot|ttf)$/i,
                    loader: 'url?limit=10000&name=fonts/[name].[ext]'
                },
                {test: /\.(tpl|ejs)$/, loader: 'ejs'},
                {test: /\.js$/, exclude: /node_modules/, loader: 'jsx'}
            ]
        },

        plugins: [
            new CommonsChunkPlugin({
                name: 'common',
                chunks: chunks,
                // Modules must be shared between all entries
                minChunks: chunks.length // 提取所有chunks共同依赖的模块
            })
        ],

        devServer: {
            stats: {
                cached: false,
                exclude: excludeFromStats,
                colors: true
            }
        }
    };
    if(debug) {
        // 开发阶段，css直接内嵌
        var cssLoader = {
            test: /\.css$/,
            loader:"style-loader!css-loader?module"
        };
        var sassLoader = {
            test: /\.scss$/,
            loader: 'style!css!sass'
        };
        var lessLoader = {
            test: /\.less/,
            loader: 'style!css!less'
        };
        config.module.loaders.push(cssLoader);
        config.module.loaders.push(sassLoader);
        config.module.loaders.push(lessLoader);
    } else {

        // 编译阶段，css分离出来单独引入
        var cssLoader = {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css?minimize') // enable minimize
        };
        /****
        注意啊，这里一定要用！写第二个参数ExtractTextPlugin.extract('style', 'css!less')，网上很多教程都是错误的
        ****/
        var lessLoader = {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        };
        var sassLoader = {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!sass')
        };

        config.module.loaders.push(cssLoader);
        config.module.loaders.push(lessLoader);
        //config.module.loaders.push(sassLoader);
        config.plugins.push(
            new ExtractTextPlugin('css/[name].css', {
                // 当allChunks指定为false时，css loader必须指定怎么处理
                // additional chunk所依赖的css，即指定`ExtractTextPlugin.extract()`
                // 第一个参数`notExtractLoader`，一般是使用style-loader
                // @see https://github.com/webpack/extract-text-webpack-plugin
                allChunks: false
            })
        );
        // 自动生成入口文件，入口js名必须和入口文件名相同
        // 例如，a页的入口文件是a.html，那么在js目录下必须有一个a.js作为入口文件
        var pages = fs.readdirSync(srcDir); 

        pages.forEach(function(filename) {
            var m = filename.match(/(.+)\.html$/);

            if(m) {
                // @see https://github.com/kangax/html-minifier
                var conf = {
                    template: path.resolve(srcDir, filename),
                    // @see https://github.com/kangax/html-minifier
                    // minify: {
                    //     collapseWhitespace: true,
                    //     removeComments: true
                    // },
                    filename: filename
                };

                if(m[1] in config.entry) {
                    conf.inject = 'body';
                    conf.chunks = ['common', m[1]];
                }

                config.plugins.push(new HtmlWebpackPlugin(conf));
            }
        });

        config.plugins.push(new UglifyJsPlugin());
    }

    return config;
}

function genEntries() {
    var jsDir = path.resolve(srcDir, 'scripts');
    var names = fs.readdirSync(jsDir);
    var map = {};

    names.forEach(function(name) {
        var m = name.match(/(.+)\.js$/);
        var entry = m ? m[1] : '';
        var entryPath = entry ? path.resolve(jsDir, name) : '';

        if(entry) map[entry] = entryPath;
    });

    return map;
}



module.exports = makeConf;
