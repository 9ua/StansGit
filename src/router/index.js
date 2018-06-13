import Vue from 'vue'
import Router from 'vue-router'
const sy = r => require.ensure([], () => r(require('@/components/page/sy.vue')), 'sy')
const login = r => require.ensure([], () => r(require('@/components/logins/login.vue')), 'login')
const pop = r => require.ensure([], () => r(require('@/components/public/pop.vue')), 'pop')
Vue.use(Router)
export default new Router({
  mode:'history',
  routes: [{
      path: '/',
      name: 'sy',
      component: sy,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
  ]
});


