import Vue from 'vue'
import Router from 'vue-router'
const sy = r => require.ensure([], () => r(require('@/components/page/sy.vue')), 'sy')
const home = r => require.ensure([], () => r(require('@/components/page/home.vue')), 'home')
const lott = r => require.ensure([], () => r(require('@/components/page/lott.vue')), 'lott')
const k3 = r => require.ensure([], () => r(require('@/components/page/lotts/k3.vue')), 'lott')
const ssc = r => require.ensure([], () => r(require('@/components/page/lotts/ssc.vue')), 'lott')
const pk10 = r => require.ensure([], () => r(require('@/components/page/lotts/pk10.vue')), 'lott')
const activity = r => require.ensure([], () => r(require('@/components/page/activity.vue')), 'activity')
const appdown = r => require.ensure([], () => r(require('@/components/page/appdown.vue')), 'appdown')
const helpcenter = r => require.ensure([], () => r(require('@/components/page/helpcenter.vue')), 'helpcenter')
const login = r => require.ensure([], () => r(require('@/components/logins/login.vue')), 'login')
const user = r => require.ensure([], () => r(require('@/components/page/user.vue')), 'user')
const userinfo = r => require.ensure([], () => r(require('@/components/page/user/userinfo.vue')), 'userinfo')
const securityCenter = r => require.ensure([], () => r(require('@/components/page/user/securityCenter.vue')), 'securityCenter')
const manageBankcard = r => require.ensure([], () => r(require('@/components/page/user/manageBankcard.vue')), 'manageBankcard')
const seekOrder = r => require.ensure([], () => r(require('@/components/page/user/seekOrder.vue')), 'seekOrder')
const billRecord = r => require.ensure([], () => r(require('@/components/page/user/billRecord.vue')), 'billRecord')
const agentIntro = r => require.ensure([], () => r(require('@/components/page/agent/agentIntro.vue')), 'agentIntro')
const agentReport = r => require.ensure([], () => r(require('@/components/page/agent/agentReport.vue')), 'agentReport')
const lowerReport = r => require.ensure([], () => r(require('@/components/page/agent/lowerReport.vue')), 'lowerReport')
const manageInvite = r => require.ensure([], () => r(require('@/components/page/agent/manageInvite.vue')), 'manageInvite')
const manageIcode = r => require.ensure([], () => r(require('@/components/page/agent/manageIcode.vue')), 'manageIcode')
const agentMember = r => require.ensure([], () => r(require('@/components/page/agent/agentMember.vue')), 'agentMember')
const agentBetRecord = r => require.ensure([], () => r(require('@/components/page/agent/agentBetRecord.vue')), 'agentBetRecord')
const agentBillRecord = r => require.ensure([], () => r(require('@/components/page/agent/agentBillRecord.vue')), 'agentBillRecord')
const letter = r => require.ensure([], () => r(require('@/components/page/user/letter.vue')), 'letter')
const notice = r => require.ensure([], () => r(require('@/components/page/user/notice.vue')), 'notice')
const personalLevel = r => require.ensure([], () => r(require('@/components/page/user/personalLevel.vue')), 'personalLevel')
const setMobile = r => require.ensure([], () => r(require('@/components/page/user/setMobile.vue')), 'setMobile')
const setMail = r => require.ensure([], () => r(require('@/components/page/user/setMail.vue')), 'setMail')
const setSafePwd = r => require.ensure([], () => r(require('@/components/page/user/setSafePwd.vue')), 'setSafePwd')
const verifyPwd = r => require.ensure([], () => r(require('@/components/page/user/verifyPwd.vue')), 'verifyPwd')
const verifyMail = r => require.ensure([], () => r(require('@/components/page/user/verifyMail.vue')), 'verifyMail')
const setQuestion = r => require.ensure([], () => r(require('@/components/page/user/setQuestion.vue')), 'setQuestion')
const verifyQuestion = r => require.ensure([], () => r(require('@/components/page/user/verifyQuestion.vue')), 'verifyQuestion')
const verifySafePwd = r => require.ensure([], () => r(require('@/components/page/user/verifySafePwd.vue')), 'verifySafePwd')
const resetWay = r => require.ensure([], () => r(require('@/components/page/user/resetWay.vue')), 'resetWay')
const setBankcard = r => require.ensure([], () => r(require('@/components/page/user/setBankcard.vue')), 'setBankcard')
const betRecord = r => require.ensure([], () => r(require('@/components/page/betManage/betRecord.vue')), 'betRecord')
const PLstatement = r => require.ensure([], () => r(require('@/components/page/betManage/PLstatement.vue')), 'PLstatement')
const NoticeDetail = r => require.ensure([], () => r(require('@/components/page/user/NoticeDetail.vue')), 'NoticeDetail')
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'sy',
      redirect: "home",
      component: sy,
      meta: {
        requiresAuth: false
      },
      children: [{
          path: '/home',
          name: 'home',
          component: home,
          meta: {
            title: "宏發娱乐-首页"
          }
        },
        {
          path: '/lott',
          name: 'lott',
          component: lott,
          meta: {
            title: "宏發娱乐-彩票大厅"
          }
        },
        {
          path: '/lotts/k3/:lotteryId',
          name: 'k3',
          component: k3,
          meta: {
            title: "宏發娱乐-彩票大厅"
          }
        },
        {
          path: '/lotts/ssc/:lotteryId',
          name: 'ssc',
          component: ssc,
          meta: {
            title: "宏發娱乐-彩票大厅"
          }
        },
        {
          path: '/lotts/pk10/:lotteryId',
          name: 'pk10',
          component: pk10,
          meta: {
            title: "宏發娱乐-彩票大厅"
          }
        },
        {
          path: '/activity',
          name: 'activity',
          component: activity,
          meta: {
            title: "宏發娱乐-活动中心"
          }
        },
        {
          path: '/appdown',
          name: 'appdown',
          component: appdown,
          meta: {
            title: "宏發娱乐-手机购彩"
          }
        },
        {
          path: '/helpcenter',
          name: 'helpcenter',
          component: helpcenter,
          meta: {
            title: "宏發娱乐-帮助指南"
          }
        },
        {
          path: '/user',
          name: 'user',
          redirect: "/user/userinfo",
          component: user,
          children: [{
              path: '/user/userinfo',
              component: userinfo,
              meta: {
                title: "宏發娱乐-个人信息"
              }
            },
            {
              path: '/user/securityCenter',
              component: securityCenter,
              meta: {
                title: "宏發娱乐-安全中心"
              }
            },
            {
              path: '/user/manageBankcard',
              component: manageBankcard,
              meta: {
                title: "宏發娱乐-银行卡管理"
              }
            },
            {
              path: '/betManage/betRecord',
              component: betRecord,
              meta: {
                title: "宏發娱乐-投注记录"
              }
            },
            {
              path: '/betManage/seekOrder',
              component: seekOrder,
              meta: {
                title: "宏發娱乐-追号记录"
              }
            },
            {
              path: '/user/billRecord',
              component: billRecord,
              meta: {
                title: "宏發娱乐-交易记录"
              }
            },
            {
              path: '/user/PLstatement',
              component: PLstatement,
              meta: {
                title: "宏發娱乐-今日盈亏"
              }
            },
            {
              path: '/agent/agentIntro',
              component: agentIntro,
              meta: {
                title: "宏發娱乐-代理说明"
              }
            },
            {
              path: '/agent/agentReport',
              component: agentReport,
              meta: {
                title: "宏發娱乐-代理报表"
              }
            },
            {
              path: '/agent/lowerReport',
              component: lowerReport,
              meta: {
                title: "宏發娱乐-下级报表"
              }
            },
            {
              path: '/agent/manageInvite',
              component: manageInvite,
              meta: {
                title: "宏發娱乐-下级开户"
              }
            },
            {
              path: '/agent/manageIcode',
              component: manageIcode,
              meta: {
                title: "宏發娱乐-邀请码管理"
              }
            },
            {
              path: '/agent/agentMember',
              component: agentMember,
              meta: {
                title: "宏發娱乐-会员管理"
              }
            },
            {
              path: '/agent/agentBetRecord',
              component: agentBetRecord,
              meta: {
                title: "宏發娱乐-投注明细"
              }
            },
            {
              path: '/agent/agentBillRecord',
              component: agentBillRecord,
              meta: {
                title: "宏發娱乐-交易明细"
              }
            },
            {
              path: '/user/letter',
              component: letter,
              meta: {
                title: "宏發娱乐-站内信"
              }
            },
            {
              path: '/user/notice',
              component: notice,
              meta: {
                title: "宏發娱乐-网站公告"
              }
            },
            {
              path: '/user/personalLevel',
              component: personalLevel,
              meta: {
                title: "宏發娱乐-等级头衔"
              }
            },
            {
              path: '/user/setMobile',
              component: setMobile,
              meta: {
                title: "宏發娱乐-设置密保手机"
              }
            },
            {
              path: '/user/setMail',
              component: setMail,
              meta: {
                title: "宏發娱乐-设置邮箱"
              }
            },
            {
              path: '/user/setSafePwd',
              component: setSafePwd,
              meta: {
                title: "宏發娱乐-设置安全密码"
              }
            },
            {
              path: '/user/verifyPwd',
              component: verifyPwd,
              meta: {
                title: "宏發娱乐-修改密码"
              }
            },
            {
              path: '/user/verifyMail',
              component: verifyMail,
              meta: {
                title: "宏發娱乐-修改密保邮箱"
              }
            },
            {
              path: '/user/setQuestion',
              component: setQuestion,
              meta: {
                title: "宏發娱乐-设置密保问题"
              }
            },
            {
              path: '/user/verifyQuestion',
              component: verifyQuestion,
              meta: {
                title: "宏發娱乐-设置密保问题"
              }
            },
            {
              path: '/user/verifySafePwd',
              component: verifySafePwd,
              meta: {
                title: "宏發娱乐-验证安全密码"
              }
            },
            {
              path: '/user/resetWay',
              component: resetWay,
              meta: {
                title: "宏發娱乐-找回安全密码"
              }
            },
            {
              path: '/user/setBankcard',
              component: setBankcard,
              meta: {
                title: "宏發娱乐-找回安全密码"
              }
            },
            {
              path: '/user/NoticeDetail',
              component: NoticeDetail,
              meta: {
                title: "宏發娱乐-公告详情"
              }
            },
          ],
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
  ]
});
