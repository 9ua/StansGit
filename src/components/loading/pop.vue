<template lang='jade'>
.pop(v-show='openSimple', @click='clearBox')
  ul.loginSuccess.num1(v-if="number =='1'")
    li.title
      span
      p {{title}}
      span
        i.el-icon-circle-close-outline.transition
    li.content
      p
        i.el-icon-warning
        | {{content}}
    li.button
      button.logoAffirm(@click='openSimple = false') 确认
  ul.loginSuccess.num1(v-if="number =='302'")
    li.title
      span
      p {{title}}
      span
        i.el-icon-circle-close-outline.transition
    li.content
      p
        i.el-icon-warning
        | {{content}}
    li.button
      button.logoAffirm(@click='windowOpen') 确认
  // 3秒后自动关闭
  ul.loginSuccess.num2(v-if="number =='2'")
    li.content {{content}}
  // 时间到弹窗
  ul.loginSuccess.num3(v-if="number =='3'")
    li.title
      span
      p {{title}}
      span
        i.el-icon-circle-close-outline.transition
    li.content
      p {{content1}}期已截止
      p
        | 当前期号
        b {{content2}}
      p 投注时请注意期号!
    li.button
      button.logoAffirm(@click='openSimple = false') 确认
</template>
<script>
export default {
  data() {
    return {
      openSimple: true,
      hides:null
    };
  },
  props:{
    title:{
      type:String
    },
    content:{
      type:String
    },
    content1:{
      type:String
    },
    content2:{
      type:String
    },
    number:{
      type:String
    }
  },
  destroyed(){
    this.closeSimpleDialog();
  },
  mounted(){
    this.three();
  },
  methods: {
    windowOpen(){
      window.location.href = "http://localhost:8899/login/ashore";
    },
    clearBox(){
      this.$pop.hide();
      clearTimeout(this.hides);
    },
    closeSimpleDialog() {
      this.openSimple = !this.openSimple;
    },
    //3秒后自动关闭
    three(){
      if(this.number === '3'){
        this.hides = setTimeout(() =>{
          this.$pop.hide();
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
    max-width: 350px;
    background: #FFF;
    border-radius: 4px;
    @extend %flex;
    @extend %fdc;
    @extend %sbetween;
    & .title{
      @extend %flex,%aitems,%sbetween;
      background: rgb(175,58,49);
      color: #fff;
      font-size: 16px;
      height: 40px;
      border: 1px solid rgb(175,58,49);
      border-radius: 4px 4px 0px 0px;
      border-bottom: 0px solid #ddd;
      & span{
        @extend %faj;
        width: 10%;
        height: 40px;
      }
      & p{
        width: 80%;
        height: 40px;
      }
      & i{
        width: 26px;
        height: 26px;
        font-size: 26px;
      }
      & i.transition:hover{
        transition: All 4s ease-in-out;
        transform: rotate(3600deg);
      }
    }
    & .content{
      @extend %faj;
      font-size: 14px;
      min-height: 118px;
      padding:0px 16px;
      & i{
        color: rgb(175,58,49);
        font-size: 32px;
        margin-right: 18px;
      }
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
.num3{
  & li.content{
    @extend %flex,%fdc,%aitems;
    & p{
      height: 30px;
      & b{
        color: red;
        margin-left: 4px;
      }
    }
  }
}
</style>

