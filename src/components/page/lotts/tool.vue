<template>
  <div>
    <span :class="{'active':tools.choose}" v-for="(tools,indexto) in ballTools" :key="indexto" @click="toolsCur(tools)">{{tools.name}}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ballTools: [
        { fncode: "full", name: "全", choose: false },
        { fncode: "big", name: "大", choose: false },
        { fncode: "small", name: "小", choose: false },
        { fncode: "single", name: "单", choose: false },
        { fncode: "double", name: "双", choose: false },
        { fncode: "empty", name: "清", choose: false }
      ]
    };
  },
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    toolsCur(tools) {
      if (Object.is(tools.fncode, "full")) {
        this.full({
          ball: this.item.nums
        });
      } else if (Object.is(tools.fncode, "big")) {
        this.big({
          ball: this.item.nums
        });
      } else if (Object.is(tools.fncode, "small")) {
        this.small({
          ball: this.item.nums
        });
      } else if (Object.is(tools.fncode, "single")) {
        this.single({
          ball: this.item.nums
        });
      } else if (Object.is(tools.fncode, "double")) {
        this.double({
          ball: this.item.nums
        });
      } else {
        this.empty({
          ball: this.item.nums
        });
      }
    },
    //全
    full({ ball }) {
      this.empty({
        ball
      });
      ball.filter(list => {
        list.choose = true;
      });
    },
    //大
    big({ ball }) {
      this.empty({
        ball
      });
      let len = Math.ceil(ball.length / 2);
      ball.filter((list, idx) => {
        if (idx >= len) {
          list.choose = true;
        }
      });
    },
    //小
    small({ ball }) {
      this.empty({
        ball
      });
      let len = Math.ceil(ball.length / 2);
      ball.filter((list, idx) => {
        if (idx < len) {
          list.choose = true;
        }
      });
    },
    //单
    single({ ball }) {
      this.empty({
        ball
      });
      ball.filter(list => {
        if (list.ball % 2 === 0) {
          list.choose = true;
        }
      });
    },
    //双
    double({ ball }) {
      this.empty({
        ball
      });
      ball.filter(list => {
        if (list.ball % 2 === 1) {
          list.choose = true;
        }
      });
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
@import '../../../assets/minix/main.scss';
.changes {
  @extend %flex, %fr;
  width: 168px;
  margin-right: 10px;
  cursor: pointer;
  & span {
    @extend %faj;
    width: 26px;
    height: 26px;
    margin: 0px 1px;
    padding: 2px;
    border-radius: 50%;
    border: 1px solid #c0c5d2;
    box-shadow: 0 1px 3px #d4d4d4, inset 0 -1px 5px #fff;
    background: linear-gradient(180deg, #fff 0, #f1efef);
  }
}
</style>
