import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

import '@/styles/reset.css' /* 初始化标签默认样式 */
import '@/mobile/flexible' /* 自动适应宽度改变fontsize */
/* 全局引入vant组件库 */
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
