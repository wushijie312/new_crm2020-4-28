// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import rem from '@/assets/rem'
import echarts from 'echarts'
import Calendar from 'vue2-datepick'
import tools from '@/view/new_kehu/tool.js'

Vue.use(tools);
Vue.use(Calendar);


Vue.prototype.$echarts = echarts
import './assets/css/reset.styl';

rem()
Vue.use(ElementUI)
// import { Button } from 'ant-design-vue';
// Vue.use(Button);
Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>'
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
