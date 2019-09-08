const path = require('path')
const send = require('koa-send')
const PWD = process.env.PWD || process.cwd()
const clientPort = process.env.CLIENT_PORT || 8080
const devHost = `http://localhost:${clientPort}`
const resolve = file => path.resolve(__dirname, file)

const staticSuffixList = [
    'js',
    'css',
    'jpg',
    'jpeg',
    'png',
    'gif',
    'map',
    'json'
]

const main = async (ctx, next) => {
    const url = ctx.path

    if (url.includes('favicon.ico')) {
        return send(ctx, url, { root: resolve(PWD + '/public') })
    }

    // In the development environment, you need to support every static file without CDN
    //处理静态资源
    if (staticSuffixList.includes(url.split('.').pop())) {
        // if(url.substr(0, 1) === '/') {
        //     //绝对路径
        //     resolve(url)
        // } else {
        //     //相对路径
        // }
        // console.log(url)
        return ctx.redirect(devHost + url)
    }
    await next()
}

module.exports = main
