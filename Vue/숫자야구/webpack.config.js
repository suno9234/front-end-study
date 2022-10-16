const {VueLoaderPlugin} = require('vue-loader');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool:'eval',
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
        }],
    },
    plugins:[
        new VueLoaderPlugin(),
    ],
    output:{
        filename:"app.js", // == [name].js
        path : path.join(__dirname,'dist'),
    },
};