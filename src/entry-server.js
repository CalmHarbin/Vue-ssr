import createApp from './main.js'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()

        router.push(context.url)
        //路由加载完成后
        router.onReady(() => {
            //渲染虚拟dom
            context.rendered = () => {
                //当我们将 state 挂载到 context ，并在使用 renderer 的时候传递了 template 选项，
                //那么 state 会自动序列化并注入到 HTML 中，作为 window.__INITIAL_STATE__ 存在。
                context.state = store.state
            }

            resolve(app)
        }, reject)
    })
}
