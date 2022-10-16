const {VueLoaderPlugin} = require('vue-loader');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool:'eval',
    devServer:{
        static:{
            directory : path.join(__dirname,'./'),
            watch: true
        }
    },
    resolve:{
        extensions:['.js','.vue'],
    },
    entry:{
        app: path.join(__dirname,'main.js') // 하나로 합쳐질 파일 이름 app.js 생성
    },
    module:{
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        },{
            test: /\.css$/,
            use:[
                'vue-style-loader',
                'css-loader',
            ]
        }],
    },
    plugins:[
        new VueLoaderPlugin(),
    ],
    output:{
        filename:"app.js", // == [name].js
        path : path.join(__dirname,'dist'),
        publicPath:'/dist',
    },
};