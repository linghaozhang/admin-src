var path = require('path');
var homeUrl = path.resolve(__dirname, '../'); // 项目根目录


module.exports = {
     entry:  __dirname + "/../src/main.js",//已多次提及的唯一入口文件
     output: {
        path: __dirname + "/",//打包后的文件存放的地方
        filename: "bundle.js"//打包后输出文件的文件名
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: { colors: true },
        proxy: {
            '/index.php/': {
                target: 'http://www.taihetourongbao.com/xn203-backend/public/', //开发服务器
                pathRewrite: {'^/index.php' : '/index.php'},
                changeOrigin: true
            }
        }
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                  presets: ['react', 'es2015','stage-1'],
                    plugins: [
                        ["import", {"libraryName": "antd", "style": "css"}]
                    ]
                },
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015','stage-1'],
                    plugins: [
                        ["import", {"libraryName": "antd", "style": "css"}]
                    ]
                },
            },
            {
                test: /\.css?$/,
                loaders: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.less/,
                loaders: ['style-loader','css-loader','less-loader','postcss-loader'],
            },{
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }

        ],
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        // extensions: ['', '.js', '.jsx'],
        alias: {
            '@containers': path.resolve( homeUrl , './src/containers/'), // 业务模块容器组件
            '@components': path.resolve( homeUrl , './src/components/'), // 展示组件
            '@api': path.resolve( homeUrl , './src/api/'), // 接口
            '@layout': path.resolve( homeUrl , './src/layouts/one/'), // 当前项目整体布局文件夹
            '@fun': path.resolve( homeUrl , './src/fun/'), // 函数与变量
            '@static': path.resolve( homeUrl , './src/static/'), // 静态资源

        }
    },
};
