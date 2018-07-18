<template>
  <div class="star2">
    <span v-for="(tools,indexto) in stanArr" :key="indexto" @click="curBallsAll(tools)"></span>
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
      stan6: "",
      con:'',
      stzhu1:0,
      stzhu2:0,
      stzhu3:0,
      stzhu4:0,
      stzhu5:0,
      stzhu6:0,
      zhu:0,
      std1: [], //选中的号码的下标
      std2: [], //选中的号码的下标
      std3: [], //选中的号码的下标
      std4: [], //选中的号码的下标
      std5: [], //选中的号码的下标
      std5: [], //选中的号码的下标
      stanArr:[
        {fncode: "A",title:"全选",choose:false},
      ]
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
    },
  },
  methods:{
    curBallsAll(tools){
      tools.choose = !tools.choose;
      if (Object.is(tools.fncode, "A")) {
        this.full({ball: this.numViews.nums,tools});
      }
    },
    //全
    full({ ball,tools}) {
      if(tools.choose === true){
        if(this.indexf === 0){
          ball.filter(list => {
            list.choose = !list.choose;
            this.stan1 += list.ball+",";
            this.stzhu1 ++;
          });
          this.stan1 = this.stan1.split(",").filter(function(n) {return n;}).join(",");
          this.con = this.stan1;
          this.zhu = this.stzhu1;
        }
        console.log(this.stan1,this.stzhu1);
      }else if(tools.choose === false){
        if(this.indexf === 0){
          ball.filter(list => {
            list.choose = !list.choose;
            this.stan1 = "";
            this.stzhu1 --;
          });
          this.stan1 = this.stan1.split(",").filter(function(n) {return n;}).join(",");
          this.con = this.stan1;
          this.zhu = this.stzhu1;
        }
        console.log(this.stan1,this.stzhu1);
      }
    },
    //清
    empty({ ball }) {
      ball.filter(list => {
        list.choose = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/lotts/k3.scss";
</style>

