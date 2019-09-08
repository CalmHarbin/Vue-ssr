const Koa = require('koa')
const app = new Koa()
const host = '127.0.0.1'
const port = process.env.PORT
const productionEnv = ['production', 'test']
const isProd = productionEnv.includes(process.env.NODE_ENV)
const fs = require('fs')
const PWD = process.env.PWD || process.cwd()

// 产品环境：我们在服务端进程启动时，将客户端入口文件读取到内存中，当 发生异常 或 需要返回客户端入口文件时响应给客户端。
const getClientEntryFile = isProd =>
    isProd ? fs.readFileSync('../index.html') : ''
const clientEntryFile = getClientEntryFile(isProd)

app.use(async (ctx, next) => {
    //非GEt请求则退出
    if (ctx.method !== 'GET') return

    try {
        await next()
    } catch (err) {
        ctx.set('content-type', 'text/html')
        console.log(ctx.url)
        if (err.code === 404) {
            ctx.body = clientEntryFile
            return
        }

        console.error(' [SERVER ERROR] ', err.toString())

        ctx.body = clientEntryFile
    }
})

if (process.env.NODE_ENV === 'production') {
    app.use(require('./middlewares/prod.static.js'))
    app.use(require('./middlewares/prod.ssr.js'))
} else {
    // //开发环境静态资源处理中间件
    app.use(require('./middlewares/dev.static.js'))
    // // TODO：在这里引入开发环境请求处理中间件
    app.use(require('./middlewares/dev.ssr.js'))
    // app.use(require('./middlewares/dev.js'))
}

app.listen(port, host, () => {
    console.log(`[${process.pid}]server started at ${host}:${port}`)
})
