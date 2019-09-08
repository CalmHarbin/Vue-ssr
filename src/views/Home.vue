<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <div v-if="book">{{ book.name }}</div>
        <div v-else>nothing</div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'home',
    data() {
        return {
            item: ''
        }
    },
    computed: {
        book() {
            return this.$store.state.Book.items[this.$route.params.id || 1]
        }
    },
    // 此函数只会在服务器端调用，注意，只有 vue v2.6.0+ 才支持此函数
    serverPrefetch() {
        return this.fetchBookItem()
    },
    created() {
        console.log(1111111)
    },
    // 此生命周期函数只会在客户端调用
    // 客户端需要判断在 item 不存在的场景再去调用 fetchBookItem 方法获取数据
    mounted() {
        console.log(this.item, 2222)
        if (!this.item) {
            this.fetchBookItem()
        }
    },

    methods: {
        fetchBookItem() {
            this.item = 111
            // 这里要求 book 的 fetchItem 返回一个 Promise
            return this.$store.dispatch(
                'Book/fetchItem',
                this.$route.params.id || 1
            )
        }
    },

    components: {
        HelloWorld
    }
}
</script>
