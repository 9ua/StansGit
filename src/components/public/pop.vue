<template>
  <div class="pop" v-show="true">
    <ul class="loginSuccess">
      <li>{{title}}</li>
      <li>
        <h4>{{content}}</h4>
        <p>欢迎您，来到宏發娱乐！</p>
      </li>
      <li><button class="logoAffirm" @click="closeSimpleDialog">确认</button></li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openSimple: false,
      title:'温馨提示！',
      content: "欢迎您，来到宏發娱乐！"
    };
  },
  methods: {
    //登陆成功
    openSimpleDialog() {
      this.openSimple = !this.openSimple;
      this.content = '登陆成功';
    },
    //关闭登陆成功窗口
    closeSimpleDialog() {
      this.openSimple = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/minix/main.scss";
.pop{
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 20180608;
  // background: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & ul{
    min-width: 300px;
    max-width: 500px;
    min-height:160px;
    max-height:400px;
    background: #FFF;
    border-radius: 4px;
    @extend %flex;
    @extend %fdc;
    @extend %sbetween;
    & li{
      border: 1px solid #ddd;
    }
    & li:nth-child(1){
      @extend %faj;
      background: #AF3A31;
      color: #fff;
      font-size: 16px;
      height: 40px;
      border: 1px solid #AF3A31;
      border-radius: 4px 4px 0px 0px;
      border-bottom: 0px solid #ddd;
    }
    & li:nth-child(2){
      min-height: 118px;
      padding: 4px 10px;
    }
    & li:nth-child(3){
      @extend %flex;
      @extend %sbetween;
      border-top: 0px solid #ddd;
      & button{
        width: 100%;
        @extend %faj;
        border:none;
        background: none;
        outline: none;
        height: 40px;
        font-size: 14px;
      }
      & .logoAffirm{
        color:red;
      }
    }
  }
  & .loginSuccess{
    & h4{
      height: 28px;
      line-height: 28px;
      color: #FA7E00;
    }
    & p{
      height: 70px;
      @extend %faj;
    }
  }
}
</style>

