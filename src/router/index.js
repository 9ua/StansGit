import Vue from 'vue'
import Router from 'vue-router'
// import pageindex from '@/components/page/pageindex'
const pageindex = r => require.ensure([], () => r(require('@/components/page/pageindex')), 'pageindex')
const pagedetails = r => require.ensure([], () => r(require('@/components/page/pagedetails')), 'pagedetails')
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'pageindex',
      component: pageindex
    },
    {
      path: 'pagedetails',
      name: 'pagedetails',
      component: pagedetails
    },
  ]
})
