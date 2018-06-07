import{RETSET_NAME,OUT_LOGIN,GET_USERINFO}from './mutation-types'
import { setStore, getStore } from '../config/mUtils'
export default {
    //修改用户名
    [RETSET_NAME](state,{}){},
    //退出登陆
    [OUT_LOGIN](state){
        state.userInfo = {};
        state.login = false;
    },
    //修改用户名
    [RETSET_NAME](state, username) {
        state.userInfo = Object.assign({}, state.userInfo, { username })
    },
}