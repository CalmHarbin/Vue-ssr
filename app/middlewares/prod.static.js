// 当资源使用相对路径时使用静态资源处理
const path = require('path')
const serve = require('koa-static')
const resolve = file => path.resolve(__dirname, file)

//将dist目录设置为静态资源目录
const main = serve(resolve('../../'))

module.exports = main
