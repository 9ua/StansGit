<template lang='jade'>
.viewBox
  .userRight
    .userTitle 验证密保问题
    .userMain
      el-steps(:active='active', finish-status='success',align-center,class='queue')
        el-step(title='验证密保问题')
        el-step(title='绑定密保问题')
        el-step(title='完成')
      ul.submitContent.mglr30.mgt15(v-show='active===1')
        li
          el-form(ref='form', label-width='200px',size='medium')
            el-form-item(label='问题一：')
              el-select(v-model='title1')
                el-option(:label='item.label', :value='item.value',v-for="(item,index) in options",:key="index")
            el-form-item(label='答案一：')
              el-input(v-model='answer1', placeholder='请输入答案',style="width:210px;")
        li
          el-form(ref='form', label-width='200px',size='medium')
            el-form-item(label='问题二：')
              el-select(v-model='title2')
                el-option(:label='item.label', :value='item.value',v-for="(item,index) in options",:key="index")
            el-form-item(label='答案二：')
              el-input(v-model='answer2', placeholder='请输入答案',style="width:210px;",@keyup.enter="submit")
        li
          span
          router-link(to='',class='submitBtn ClickShade',@click.native="submit") 确定
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import md5 from "js-md5";
export default {
  data() {
    return {
      active: 1,
      options: [
        { value: 1, label: "您的出生地是哪里？" },
        { value: 2, label: "您高中的学校是？" },
        { value: 3, label: "您父亲的名字是？" },
        { value: 4, label: "您母亲的名字是？" },
        { value: 5, label: "您的兴趣爱好是什么？" },
        { value: 6, label: "您配偶的名字是？" },
        { value: 7, label: "您大学学校的名字是？" },
        { value: 8, label: "你的家乡是？" }
      ],
      title1: "", //密保问题一
      title2: "", //密保问题二
      answer1: "", //密保答案一
      answer2: "", //密保答案二
      answer3: "", //密保答案一
      answer4: "" //密保答案二
    };
  },
  created() {
    this.getUserSafeData();
  },
  methods: {
    //获取密保问题
    getUserSafeData() {
      this.$axios
        .get(
          baseUrl + "/api/userCenter/getUserSafeData",
          this.$store.state.config
        )
        .then(res => {
          this.title1 = Number(res.data.data.title1);
          this.title2 = Number(res.data.data.title2);
          this.answer3 = res.data.data.answer1;
          this.answer4 = res.data.data.answer2;
        })
        .catch(error => {
          console.log("获取密保问题No");
        });
    },
    //验证密保问题
    setQuestion() {
      let md5answer1 = md5(this.answer1);
      let md5answer2 = md5(this.answer2);
      if (md5answer1 === this.answer3) {
        if (md5answer2 === this.answer4) {
          this.$router.push({ path: "/setQuestion" });
        }
      } else {
        this.$message.error({
          message: "密保问题验证失败！",
          center: true,
          showClose: true
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/user/comm.scss";
@import "@/assets/scss/user/setComm.scss";
</style>


