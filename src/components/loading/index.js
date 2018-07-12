import LoadingComponent from "./Loading.vue";
export default {
  install: function (Vue) {
    Vue.component("loading", LoadingComponent);
    Vue.prototype.$loader = {}
    Vue.prototype.$loader.show = () => {
      // 如果页面有loading则不继续执行
      if (document.querySelector('.loader')) return
      // 1、创建构造器，定义loading模板
      let LoadingTip = Vue.extend({
        template: `<loading></loading>`
      })
      // 2、创建实例，挂载到文档以后的地方
      let tpl = new LoadingTip().$mount().$el
      // 3、把创建的实例添加到body中
      document.querySelector("#app").appendChild(tpl)
      // 阻止遮罩滑动
      document.querySelector('.loader').addEventListener('touchmove', function (e) {
        e.stopPropagation()
        e.preventDefault()
      })
    }
    Vue.prototype.$loader.hide = () => {
      let tpl = document.querySelector('.loader')
      document.querySelector("#app").removeChild(tpl)
    }
  }
}