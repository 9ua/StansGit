<template lang='jade'>
.viewBox
  .userRight
    .userTitle 下级开户
    .userMain.openAgent
      .newTab
        router-link(:to="nav.to", v-for='(nav,index) in listnav',:class="{'curr': index === navNum}",:key='index') {{nav.title}}
      ul.searchFirst
        li 
          span 开户类型：
          router-link.userSearch(to="",:class="{'active': index === toggle}",v-for='(item,index) in usertypes',:key='index',@click.native='changUserType($event,item.value,index)') {{item.title}}
      .invitationCode
        noContent(v-if='noContent')
        table(width="100%", border="0", margin="0" ,padding="0" ,cellspacing="0" ,cellpadding="0", class="manageInvite",v-if='!noContent')
          tr
            th(v-for='item in ths') {{item}}
          tr(style="bottom:0px;",v-if="invitelist.length===0")
              td(colspan="100")
                .notContent(style="padding: 100px 0px;") 
                  mu-icon(value='sentiment_dissatisfied',class='icon')
                  | 暂无记录
          tr(v-for='(item,index) in invitelist',v-if='index<start+limit&&index>=start')
            td {{item.code}}
            td {{item.code|createUrl}}
            td {{item.id}}
            td {{item.date}}
            td 注册（{{item.count}}）
            td 
              //- router-link(to='',@click.native='detail($event,item.id)') 详情
              //- em |
              router-link(to='',@click.native='del($event,item.id)') 删除
        //- pageNav(:list='invitelist',:limit='limit',ref='pageNav',@pageTo='pageTo')
        el-dialog(title='详情', :visible.sync='dialogTableVisible')
          el-table(:data='gridData')
            el-table-column(property='lottery', label='彩种', width='150')
            el-table-column(property='code', label='下级返点', width='200')
            el-table-column(property='selfCode', label='自身返点')
        .userTip.mg30
          p ※ 温馨提示：“邀请码” 与 “注册链接” 功能一致，可以使用邀请码，也可以使用注册链接。
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
import noContent from "../public/noContent";
// import pageNav from "../public/pageNav";
export default {
  components: {
    noContent,
    // pageNav
  },
  data() {
    return {
      noContent: true,
      toggle: 0,
      navNum: 1,
      start: 0,
      limit: 15,
      select: "",
      dialogTableVisible: false,
      gridData: [
        {
          lottery: "快3",
          code: "8.0",
          selfCode: "（自身返点：10.0）"
        },
        {
          lottery: "PK10",
          code: "9.0",
          selfCode: "（自身返点：10.0）"
        },
        {
          lottery: "时时彩",
          code: "10.0",
          selfCode: "（自身返点：10.0）"
        }
      ],
      //   page:1,
      usertype: 2,
      invitelist: [],
      ths: ["邀请码", "注册链接", "备注", "生成时间", "状态", "操作"],
      listnav: [
        { title: "下级开户", to: "manageInvite" },
        { title: "邀请码管理", to: "manageIcode" }
      ],
      usertypes: [{ title: "会员", value: 2 }, { title: "代理", value: 1 }]
    };
  },
  mounted() {
    this.getInviteList();
  },
  methods: {
    //接收pageNav组件分页信号
    pageTo($event) {
      this.start = this.limit * ($event - 1);
    },
    detail() {
      this.dialogTableVisible = true;
    },
    del(e, id) {
      this.$confirm("删除该邀请码, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.select = id;
          this.delInviteCode();
        })
        .catch(() => {});
    },
    changUserType(e, v, i) {
      this.usertype = v;
      this.toggle = i;
      this.getInviteList();
    },
    getInviteList() {
      this.noContent = true;
      // this.$refs.pageNav.reset();
      this.start = 0;
      this.$axios
        .get(baseUrl + "/api/agent/inviteCode", {
          params: { type: this.usertype }
        })
        .then(res => {
          this.invitelist = res.data.data;
          this.noContent = false;
        })
        .catch(error => {
          console.log("获取邀请码列表Err");
        });
    },
    delInviteCode() {
      let formData = new FormData();
      formData.append("id", this.select);
      this.$axios
        .post(baseUrl + "/api/agent/deleteInviteCode", formData)
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            this.$message({
              type: "success",
              message: res.data.message
            });
          }
          this.getInviteList();
        })
        .catch(error => {
          this.$message({
            type: "error",
            message: "删除失败"
          });
          console.log("deleteInviteCode No");
        });
    }
  },
  filters: {
    createUrl(value) {
      return "http://" + location.host + "/login/register?code=" + value;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/agent/manageIcode.scss";
</style>


