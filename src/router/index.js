import Vue from 'vue'
import Router from 'vue-router'
const sy = r => require.ensure([], () => r(require('@/components/page/sy.vue')), 'sy')
const home = r => require.ensure([], () => r(require('@/components/page/home.vue')), 'home')
const lott = r => require.ensure([], () => r(require('@/components/page/lott.vue')), 'lott')
const k3 = r => require.ensure([], () => r(require('@/components/page/lotts/k3.vue')), 'lott')
const ssc = r => require.ensure([], () => r(require('@/components/page/lotts/ssc.vue')), 'lott')
const pk10 = r => require.ensure([], () => r(require('@/components/page/lotts/pk10.vue')), 'lott')
const activity = r => require.ensure([], () => r(require('@/components/page/activity.vue')), 'activity')
const appdown = r => require.ensure([], () => r(require('@/components/page/appdown.vue')), 'appdown')
const helpcenter = r => require.ensure([], () => r(require('@/components/page/helpcenter.vue')), 'helpcenter')
const login = r => require.ensure([], () => r(require('@/components/logins/login.vue')), 'login')
const pop = r => require.ensure([], () => r(require('@/components/public/pop.vue')), 'pop')
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'sy',
      redirect: "home",
      component: sy,
      meta: {
        requiresAuth: false
      },
      children: [{
          path: '/home',
          name: 'home',
          component: home,
          meta:{
            title:"宏發娱乐-首页"
          }
        },
        {
          path: '/lott',
          name: 'lott',
          component: lott,
          meta:{
            title:"宏發娱乐-彩票大厅"
          }
        },
        {
          path: '/lotts/k3',
          name: 'k3',
          component: k3,
          meta:{
            title:"宏發娱乐-彩票大厅-快3"
          }
        },
        {
          path: '/lotts/ssc',
          name: 'ssc',
          component: ssc,
          meta:{
            title:"宏發娱乐-彩票大厅-时时彩"
          }
        },
        {
          path: '/lotts/pk10',
          name: 'pk10',
          component: pk10,
          meta:{
            title:"宏發娱乐-彩票大厅-北京赛车"
          }
        },
        {
          path: '/activity',
          name: 'activity',
          component: activity,
          meta:{
            title:"宏發娱乐-活动中心"
          }
        },
        {
          path: '/appdown',
          name: 'appdown',
          component: appdown,
          meta:{
            title:"宏發娱乐-手机购彩"
          }
        },
        {
          path: '/helpcenter',
          name: 'helpcenter',
          component: helpcenter,
          meta:{
            title:"宏發娱乐-帮助指南"
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
  ]
});
