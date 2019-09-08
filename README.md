# Vue-ssr

基于 vue cli3.x 版本,增加 ssr 功能,可作为单页面应用开发,同时支持服务端渲染.

## 项目结构

```
./Vue-ssr
├── README.md
├── app
│   ├── middlewares         //中间件
│   │   ├── dev.ssr.js      //开发环境服务端渲染
│   │   ├── dev.static.js   //开发环境静态资源处理
│   │   ├── prod.static.js  //生产环境静态资源处理
│   │   └── prod.ssr.js     //生产环境服务端渲染
│   └── server.js
├── babel.config.js
├── package.json
├── public
│   └── index.ejs           //模板文件
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── entry-client.js     //客户端入口文件
│   ├── entry-server.js     //服务端入口文件
│   ├── main.js
│   ├── router
│   │   └── index.js
│   ├── store
│   │   ├── index.js
│   │   └── modules
│   │       └── book.js
│   └── views
│       ├── About.vue
│       └── Home.vue
├── vue.config.js           //项目配置文件
└── yarn.lock
```

## 项目的运行

```sh
# 下载源码
git clone https://github.com/CalmHarbin/Vue-ssr.git
# 安装依赖
cd Vue-ssr
cnpm install
# 开发环境运行
npm run serve # 运行vue脚手架
npm run ssr:serve # 运行开发环境的服务端
```

此时打开浏览器输入 <br/>

<p>http://localhost:8080/  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    spa模式</p>
<p>http://localhost:3000/  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     ssr模式</p>

## 发布到生产环境

```sh
# 打包
npm run build
```

打包完成后会生成一个 dist 目录,结果如下

```
./dist
├── index.html       spa模式的页面
├── vue-ssr-client-manifest.json        ssr客户端配置
├── vue-ssr-server-bundle.json          ssr服务端配置页面
├── app
│   ├── middlewares         //中间件
│   │   ├── dev.ssr.js      //开发环境服务端渲染
│   │   ├── dev.static.js   //开发环境静态资源处理
│   │   ├── prod.static.js  //生产环境静态资源处理
│   │   └── prod.ssr.js     //生产环境服务端渲染
│   └── server.js           //node运行的主文件
│   └── index.ejs           //服务端渲染的模板文件
│   └── package.json        //node程序的依赖配置
├── static                  //静态资源
│   ├── css
│   ├── js
└───└── img
```

### spa 模式的发布

将 index.html 和 static 文件放入到服务器中即可 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; history 需要配置,详见[这里](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

### ssr 模式的发布

将整个 dist 文件夹放入的服务器中,然后运行 node 程序

```sh
# 运行
npm run server
```

浏览器输入 http://localhost:3000/ 即可

以上所有内容均是学习 [水滴前端](https://zhuanlan.zhihu.com/shuidi-fed)的教程所编写<br/>
强烈推荐先看他的[完整教程](https://zhuanlan.zhihu.com/p/64829195),一步一步的搭建框架,感谢大佬的分享
