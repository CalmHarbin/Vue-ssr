import Vue from 'vue'
import App from './App.vue'
import createRouter from './router/index'
import createStore from './store/index'

Vue.config.productionTip = false

//工厂模式,防止公用一个实例
export default function createApp() {
    const router = new createRouter()
    const store = new createStore()
    const app = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
    return { app, router, store }
}
