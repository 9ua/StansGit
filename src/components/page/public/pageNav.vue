<template lang='jade'>
.page
  p 共
    em {{list.length}}
    span 条记录
  .pageNav
    ul.pagination
      li
        router-link(to="",@click.native="pre",v-show='active>1') 上一页
      li(v-for="index in pages",:class="{active:index===active}",v-if='pages>1&&pages<=6')
        router-link(to="",@click.native="goTo(index)") {{index}}
      li(v-for='(item,index) in pageArr',:class="{active:item===active}",v-if='pages>6')
        router-link(to="",@click.native="goTo(item)") {{item}}
      li
        router-link(to="",@click.native="next",v-show='active<pages') 下一页   
</template>
<script>
export default {
  props: {
    list: Array,
    limit: Number,
  },
  data() {
    return {
      active: 1,
      pageArr: [1, 2, 3, 4, 5, 6, 7]
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.list.length / this.limit);
    }
  },
  methods: {
    reset(){     
      this.active=1;
      this.pageArrGet();
    },
    pageArrGet() {
      if (this.pages <= 6) {
        return;
      } else {
        if (this.active - 3 > 0 && this.active + 3 <= this.pages) {
          this.pageArr = [
            this.active - 3,
            this.active - 2,
            this.active - 1,
            this.active,
            this.active + 1,
            this.active + 2,
            this.active + 3
          ];
        } else if (this.active - 3 < 0) {
          this.pageArr = [1, 2, 3, 4, 5, 6, 7];
        } else if (this.active + 3 > this.pages) {
          this.pageArr = [
            this.pages - 6,
            this.pages - 5,
            this.pages - 4,
            this.pages - 3,
            this.pages - 2,
            this.pages - 1,
            this.pages
          ];
        }
      }
    },
    pre() {
      this.$emit("pageTo", this.active - 1);
      this.active--;
      this.pageArrGet();
    },
    goTo(index) {
      this.$emit("pageTo", index);
      this.active = index;
      this.pageArrGet();
    },
    next() {
      this.$emit("pageTo", this.active + 1);
      this.active++;
      this.pageArrGet();
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  width: 95%;
  display: table;
  padding: 10px 2.5%;
  & p {
    display: table-cell;
    & em {
      font-style: inherit;
      color: #e4393c;
      padding: 3px;
    }
  }
}
.pageNav {
  text-align: right;
  & .active,
  & a:hover {
    background: #eee;
    color: #e4393c !important;
    text-decoration: underline;
  }
}

.pagination {
  position: relative;
  & li {
    display: inline-block;
    margin: 0 5px;
    &.active a {
      color: #666;
      border: none;
      font-weight: 700;
    }
    & a {
      padding: 0 10px;
      display: inline-block;
      border: 1px solid #ddd;
      background: #fff;
      color: #666;
    }
  }
}
</style>

