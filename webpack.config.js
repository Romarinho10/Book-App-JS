const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// tipo de modo (desarrollo/produccion)
const devMod = process.env.NODE_ENV !== 'production';

module.exports = {

    entry: './frontend/app.js',
    output: {
        path: path.join(__dirname, 'backend/public'),
        filename: 'js/bundle.js'
    },

    mode: 'production', //cambiar dependiendo del estado

    module:{
        rules:[
            {
                test: /\.css/,
                use:[
                    //carga los estilos dentro del archivo Javascript si devMod esta en desarrollo
                    //de lo contrario (produccion) carga el css en su propio archivo
                    devMod ? 'style-loader': MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]
            }
        ]
    },

    //arreglo de objetos

    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            //compresion de codigo
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                useShortDoctype: true
            }
        }),

        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        })
    ],
    //para ver lineas de codigo con errores
    devtool: 'source-map'
}