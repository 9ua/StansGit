<template>
  <div class="pop" v-show="openSimple" @click="$pop.hide()">
    <ul class="loginSuccess num1" v-if="number =='1'">
      <li class="title">
        <span></span>
        <p>{{title}}</p>
        <span><i class="el-icon-circle-close-outline transition"></i></span>
      </li>
      <li class="content">
        <p><i class="el-icon-warning"></i>{{content}}</p>
      </li>
      <li class="button"><button class="logoAffirm" @click="openSimple = false">确认</button></li>
    </ul>
    <!-- 3秒后自动关闭 -->
    <ul class="loginSuccess num2" v-if="number =='2'">
      <li class="content">{{content}}</li>
    </ul>
    <!-- 时间到弹窗 -->
    <ul class="loginSuccess num3" v-if="number =='3'">
      <li class="title">
        <span></span>
        <p>{{title}}</p>
        <span><i class="el-icon-circle-close-outline transition"></i></span>
      </li>
      <li class="content">
        <p>{{content1}}期已截止</p>
        <p>当前期号<b>{{content2}}</b></p>
        <p>投注时请注意期号!</p>
      </li>
      <li class="button"><button class="logoAffirm" @click="openSimple = false">确认</button></li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openSimple: true,
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
    closeSimpleDialog() {
      this.openSimple = !this.openSimple;
    },
    //3秒后自动关闭
    three(){
      if(this.number === '3'){
        setTimeout(() =>{
          this.openSimple = false;
        },2000)
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

