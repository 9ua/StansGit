<template lang='jade'>
table
    tbody
    tr
        th(v-for='item in thead') {{item}}
    tbody
    tr(style="bottom:0px;",v-if="tradelist.length===0")
        td(colspan="100")
        .notContent(style="padding: 100px 0px;") 
            mu-icon(value='sentiment_dissatisfied',class='icon')
            暂无记录
    tr(v-for='item in tbody')
        td {{item.lotteryName}}
        td 第{{item.seasonId}}期
                p {{item.statusName}}
        td {{item.content}}
        p 玩法{{item.playName}}
        td {{item.amount}}                
        td {{item.openNum}}                
        td {{item.win}}                
        td {{item.createTime}}
        td 
.page
p 当前页共
    em {{tradelist.length}}
    条记录
.pageNav
    ul.pagination
    li
        router-link(to="",@click.native="pre",v-if='page>1') 上一页
    //- li(v-for="(item,index) in tradelist")
    li
        router-link(to="",@click.native="next",v-if='tradelist.length>0') 下一页   
</template>
<script>
export default {
   props:{
        thead: Object,
        tbody:Object,
   }     
}
</script>
