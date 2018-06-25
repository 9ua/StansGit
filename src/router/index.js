import Vue from 'vue'
import Router from 'vue-router'
const sy = r => require.ensure([], () => r(require('@/components/page/sy.vue')), 'sy')
const home = r => require.ensure([], () => r(require('@/components/page/home.vue')), 'home')
const lott = r => require.ensure([], () => r(require('@/components/page/lott.vue')), 'lott')
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
        requiresAuth: true,
      },
      children: [{
          path: '/home',
          name: 'home',
          component: home,
        },
        {
          path: '/lott/lottery/index',
          name: 'lott',
          component: lott,
        },
        {
          path: '/activity',
          name: 'activity',
          component: activity,
        },
        {
          path: '/appdown',
          name: 'appdown',
          component: appdown,
        },
        {
          path: '/helpcenter',
          name: 'helpcenter',
          component: helpcenter,
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
