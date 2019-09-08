import createApp from './main.js'

const { app, router, store } = createApp()

//在服务器端渲染路由组件树，所产生的 context.state 将作为脱水数据挂载到 window.__INITIAL_STATE__
if (window.__INITIAL_STATE__) {
    //重新注入到 store 中
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    app.$mount('#app')
})
