const  axios = require('axios')
const  webpack = require('webpack')
const  serverConfig = require('../../build/webpack.config.server')

const  getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res)
            })
            .catch(reject)
    })
}

// 启动一个webpack编译器
const serverCompiler = webpack(serverConfig)
serverCompiler.watch({}, (err, stats) => {
    if(err) throw err
    stats = stats.toJSON()
    stats.errors.forEach(err=> console.log(err))
    stats.warnings.forEach(warn=> console.log(warn))


})

module.exports = function (app) {

    app.get('*', function (req, res) {

    })
}