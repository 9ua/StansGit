import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const state = {
    login:true,//是否登录
    userInfo: null, //用户信息
};

export default new Vuex.Store({
    state
})