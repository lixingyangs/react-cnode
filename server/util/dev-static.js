// const path = require('path')
const path = require('path')
const axios = require('axios')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.config.server')
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')

const  getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res)
            })
            .catch(reject)
    })
}
const  Module = module.constructor

const mfs = new MemoryFs
// 启动一个webpack编译器
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err, stats) => {
    if(err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err=> console.log(err))
    stats.warnings.forEach(warn=> console.log(warn))
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath, 'utf8')
    console.log(bundle)
    // debugger
    // 解析bundle字符串成为html文件
    const m = new Module()
    // m._compiler(bundle)
    m._compiler(bundle, 'server-entry.js')
    // m.
    serverBundle = m.default
})

module.exports = function (app) {
    app.get('*', function (req, res) {
        getTemplate().then(template=>{
            const content = ReactDomServer.renderToString(serverBundle)
            res.send(template.replace('<!-- span -->', content))
        })
    })
}