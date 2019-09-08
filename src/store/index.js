import Vue from 'vue'
import Vuex from 'vuex'

import { Book } from './modules/book'

Vue.use(Vuex)

//工厂模式,防止公用一个实例
export default function createStore() {
    return new Vuex.Store({
        modules: {
            Book
        },
        state: {},
        mutations: {},
        actions: {}
    })
}
