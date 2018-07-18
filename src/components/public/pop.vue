<template>
  <div class="pop" v-show="openSimple" @click="openSimple = false">
    <ul class="loginSuccess num1" v-if="number ===1">
      <li class="title">{{title}}</li>
      <li class="content">
        <h4>{{content}}</h4>
        <p>欢迎您，来到宏發娱乐！</p>
      </li>
      <li class="button"><button class="logoAffirm" @click="closeSimpleDialog">确认</button></li>
    </ul>
    <ul class="loginSuccess num2" v-if="number ===2">
      <li class="content">{{content}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openSimple: false,
    };
  },
  props:{
    title:{
      type:String
    },
    content:{
      type:String
    },
    number:{
      type:Number
    }
  },
  methods: {
    closeSimpleDialog() {
      this.openSimple = !this.openSimple;
    },
    //3秒后自动关闭
    three(){
      if(this.num === 2){
        setTimeout(() =>{
          this.openSimple = false;
        },3000)
      }
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:rgba(0,0,0,.4);
  & ul{
    min-width: 300px;
    max-width: 500px;
    max-height:400px;
    background: #FFF;
    border-radius: 4px;
    @extend %flex;
    @extend %fdc;
    @extend %sbetween;
    & .title{
      @extend %faj;
      background: #AF3A31;
      color: #fff;
      font-size: 16px;
      height: 40px;
      border: 1px solid #AF3A31;
      border-radius: 4px 4px 0px 0px;
      border-bottom: 0px solid #ddd;
    }
    & .content{
      min-height: 118px;
    }
    & .button{
      @extend %flex;
      @extend %sbetween;
      border-top: 1px solid #ddd;
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
.num1{}
.num2{
  & li{
    @extend %faj;
  }
}
</style>

