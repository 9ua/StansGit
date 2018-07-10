<template lang='jade'>
.viewBox
  .userRight
    .userTitle 设置密保问题
    .userMain
      el-steps(:active='active', finish-status='success',align-center,class='queue')
        el-step(title='设置新密保问题')
        el-step(title='完成')
      ul.submitContent.mglr30.mgt15(v-show='active===1')
        li
          el-form(ref='form', label-width='200px',size='medium')
            el-form-item(label='问题一：')
              el-select(v-model='title1', placeholder='请选择密保问题')
                el-option(:label='item.label', :value='item.value',v-for="(item,index) in options",:key="index")
            el-form-item(label='答案一：')
              el-input(v-model='answer1', placeholder='请输入答案',style="width:210px;")
        li
          el-form(ref='form', label-width='200px',size='medium')
            el-form-item(label='问题二：')
              el-select(v-model='title2', placeholder='请选择密保问题')
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
      answer2: "" //密保答案二
    };
  },
  methods: {
    //设置密保问题
    submit() {
      if (this.answer1 == "") {
        this.$message.error({
          message: "答案一不能为空！",
          center: true,
          showClose: true
        });
        return;
      }
      if (this.answer2 == "") {
        this.$message.error({
          message: "答案二不能为空！",
          center: true,
          showClose: true
        });
        return;
      }
      let md5answer1 = md5(this.answer1);
      let md5answer2 = md5(this.answer2);
      let formData = new FormData();
      formData.append("title1", this.title1);
      formData.append("title2", this.title2);
      formData.append("answer1", md5answer1);
      formData.append("answer2", md5answer2);
      if (this.title1 != this.title2) {
        this.$axios
          .post(
            baseUrl + "/api/userCenter/setSecurityQuestion",
            formData,
            this.$store.state.config
          )
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: res.data.message,
                type: "success",
                center: true,
                showClose: true
              });
              this.active = 2;
              setTimeout(() => {
                this.$router.push({ path: "/user" });
              }, 2000);
            } else {
              this.$message.error({
                message: res.data.content,
                center: true,
                showClose: true
              });
            }
          })
          .catch(error => {
            console.log("设置密保问题No");
          });
      } else {
        this.$message.error({
          message: "密保问题不能相同！",
          center: true,
          showClose: true
        });
      }
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/user/comm.scss";
@import "@/assets/scss/user/setComm.scss";
</style>


