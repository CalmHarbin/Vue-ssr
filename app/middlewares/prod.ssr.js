const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
// const get = require('lodash.get')

const resolve = file => path.resolve(__dirname, file)
const PWD = process.env.PWD || process.cwd()
const cdn = {
    css: [],
    js: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
        'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
        'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
        'https://cdn.bootcss.com/axios/0.19.0/axios.min.js'
    ]
}

const { createBundleRenderer } = require('vue-server-renderer')
const bundle = require('../../vue-ssr-server-bundle.json')
const clientManifest = require('../../vue-ssr-client-manifest.json')
const tempStr = fs.readFileSync(resolve('../index.ejs'), 'utf-8')
const template = ejs.render(tempStr, {
    title: '{{title}}',
    mode: 'server',
    cdn: cdn
})

const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: template,
    clientManifest: clientManifest,
    basedir: PWD
})

const renderToString = context =>
    new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) =>
            err ? reject(err) : resolve(html)
        )
    })

// const renderToStream = context => renderer.renderToStream(context)

const main = async (ctx, next) => {
    ctx.set('content-type', 'text/html')

    const context = {
        title: 'ssr mode',
        url: ctx.url
    }

    ctx.body = await renderToString(context)
}

module.exports = main
