// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import VueRouter from 'vue-router';

import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import seller from 'components/seller/seller.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);
const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  scrollBehavior (to, from, savedPosition) { // 路由切换的时候页面回到顶部,第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  },
  routes: [
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ]
});
// router.push('/goods');

/* eslint-disable no-new */
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app');
