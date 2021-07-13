// import "../publish-path"
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import less from "less"
import Vuex from "vuex"
// 引入乾坤
import { registerMicroApps, start, initGlobalState } from "qiankun"
import store from "./store/store"

Vue.use(ElementUI)
Vue.use(less)
Vue.use(Vuex)

let propsData = {
  sex: "男",
  age: 18,
  userName: "小东",
}
const actions = initGlobalState(propsData)
// 主项目项目监听和修改(在项目中任何需要监听的地方进行监听)
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log("改变前的值 ", prev)
  console.log("改变后的值 ", state)
})
// 将actions对象绑到Vue原型上，为了项目中其他地方使用方便
Vue.prototype.$actions = actions

const apps = [
  {
    name: "vueApp", // 应用的名字
    entry: "//localhost:8081", // 默认会加载这个html 解析里面的js 动态的执行 （子应用必须支持跨域）fetch
    container: "#vue", // 容器名
    activeRule: "/main/vue", // 激活的路径
    props: propsData,
  },
  {
    name: "reactApp",
    entry: "//localhost:20000", // 默认会加载这个html 解析里面的js 动态的执行 （子应用必须支持跨域）fetch
    container: "#react",
    activeRule: "/main/react",
    props: propsData,
  },
]
registerMicroApps(apps) // 注册应用
start({
  prefetch: false, // 取消预加载
}) // 开启

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")
