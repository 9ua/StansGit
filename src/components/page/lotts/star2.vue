<template>
  <div class="star2">
    <span @click="curBallsAll"></span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      stan1: "",
      stan2: "",
      stan3: "",
      stan4: "",
      stan5: "",
      stcon:'',
      std1: [], //选中的号码的下标
      std2: [], //选中的号码的下标
      std3: [], //选中的号码的下标
      std4: [], //选中的号码的下标
      std5: [], //选中的号码的下标
    };
  },
  props:{
    numViews:{
      type:Object
    },
    indexf:{
      type:Number
    },
    item:{
      type:Object
    },
    indexha:{
      type:Number
    }
  },
  methods:{
    curBallsAll(){
      // console.log(this.numViews.nums.length)
        if(this.indexf === 0){
          // this.numViews.nums.map(key => {
          //   key.choose = !key.choose;
          // });
          this.std1[this.indexha] = this.item.ball;
          this.std1 = this.std1.filter(function(n) {return n;});
          this.stcon = this.std1.join(",");
          // console.log(this.std1)
        }
      console.log(this.indexf,this.item,this.std1)
    },
    onClickStan1(e){

    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/lotts/k3.scss";
</style>

