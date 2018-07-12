<template lang='jade'>
.layer(v-show='toggle')
  .layerBg
  .layerBox
    .headImgList
      .headImgListTitle 修改头像
        span(@click='close')
      .headImgContent
        .slider-con.fix(:class='"pageNum"+pageNum')
          .item-page.fix(v-for='img in imgs')
            p(:class="{'curr': index === imgIndex}",:title='item.title',v-for='(item,index) in img',@click='choose($event,index,item)',:key='index')
              img(:src='"/static/images/"+item.img+".jpg"', alt='',class='headImg')
      .headImgView
        h5 预览
        p 100x100
        img(:src='"/static/images/"+img+".jpg"', alt='')
        h5(style='color: rgb(83, 168, 241);margin-top:10px;') {{itemName}}
        .button
          span.submitBtn(@click='saveHeadImg') 保存头像
          span.submitBtn.cancel(@click='close') 取消
    .point
      p(:class="{'curr': index === pageNum}",v-for='(img,index) in imgs',@click='pageNum=index')
</template>
<script>
import { baseUrl } from "../../../assets/js/env";
export default {
  data() {
    return {
      toggle: true,
      pageNum: 0,
      imgIndex: null, //选择图片索引
      img: 0, //选中图片链接（可读取本地存储自身头像照片）
      itemName: "小姐姐", //选中图片名字
      imgs: [
        [
          { img: 0, title: "小姐姐" },
          { img: 1, title: "杰森斯坦森" },
          { img: 2, title: "金莎" },
          { img: 3, title: "高圆圆" },
          { img: 4, title: "迪丽热巴" },
          { img: 5, title: "黄宗泽" },
          { img: 6, title: "肌肉男" },
          { img: 7, title: "刘德华" },
          { img: 8, title: "李冰冰" },
          { img: 9, title: "苏有朋" },
          { img: 10, title: "贝克汉姆" },
          { img: 11, title: "谢霆锋" },
          { img: 12, title: "李敏镐" },
          { img: 13, title: "郑伊健" },
          { img: 14, title: "全智贤" },
          { img: 15, title: "李小龙" },
          { img: 16, title: "李连杰" },
          { img: 17, title: "小妹妹" },
          { img: 18, title: "特朗普" },
          { img: 19, title: "葛优" },
          { img: 20, title: "文章" },
          { img: 21, title: "赵薇" },
          { img: 22, title: "张学友" },
          { img: 23, title: "陈小春" },
          { img: 24, title: "林心如" },
          { img: 25, title: "吴奇隆" },
          { img: 26, title: "张一山" },
          { img: 27, title: "钟汉良" },
          { img: 28, title: "波多野结衣" },
          { img: 29, title: "赵丽颖" }
        ],
        [
          { img: 30, title: "王宝强" },
          { img: 31, title: "朱茵" },
          { img: 32, title: "科比" }
        ]
      ]
    };
  },
  methods: {
    choose(e, index, item) {
      this.imgIndex = index;
      this.img = item.img;
      this.itemName = item.title;
    },
    close() {
      this.toggle = false;
      this.$emit("close");
    },
    saveHeadImg() {
      let params = new URLSearchParams();
      params.append("image", this.img);
      this.$axios
        .post(
          baseUrl + "/api/userCenter/saveUserData",
          params,
          this.$store.state.config
        )
        .then(res => {
          this.$store.state.img = this.img;
          localStorage.setItem("img",this.img);          
          this.close();
        })
        .catch(error => {
          console.log("用户信息保存失败");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@for $i from 0 through 3 {
  .pageNum#{$i} {
    transform: translateX(0-$i * 420 + px);
  }
}
.layerBg {
  display: block;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  _position: absolute;
  pointer-events: auto;
  z-index: 999;
  background: #000;
  opacity: 0.3;
  filter: alpha(opacity=30);
}
.layerBox {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 657px;
  height: 412px;
  margin-top: -210px;
  margin-left: -278px;
  background: #fff;
  z-index: 10000;
  & .headImgList {
    width: 657px;
    height: 100%;
    overflow: hidden;
    & .headImgListTitle {
      background: #d7d7d7;
      font-size: 14px;
      padding: 0 10px;
      line-height: 34px;
      & span {
        float: right;
        cursor: pointer;
        position: relative;
        margin: 7px 6px;
        background-position: 4px -36px;
        width: 20px;
        height: 20px;
        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 25px;
          height: 1px;
          background-color: #888;
          transform: rotate(45deg);
        }
        &::after {
          transform: rotate(-45deg);
        }
      }
    }
    & .headImgContent {
      float: left;
      width: 430px;
      padding: 5px;
      height: 350px;
      overflow: hidden;
      & p {
        display: block;
        cursor: pointer;
        float: left;
        padding: 5px;
        line-height: 0;
        &:hover img {
          border: 1px solid #53a8f1;
          box-shadow: 0 0 5px #53a8f1;
        }
      }
      & .curr img {
        border: 1px solid #53a8f1;
        box-shadow: 0 0 5px #53a8f1;
      }
      & img {
        width: 60px;
        height: 60px;
        border: 1px solid #b1bac5;
        border-radius: 3px;
      }
    }
  }
}
.item-page {
  width: 420px;
  float: left;
}
.headImg {
  vertical-align: top;
  width: 100px;
  height: 100px;
  border-radius: 3px;
}
.slider-con {
  width: 1680px;
  transition: .8s;
}
.headImgView {
  float: left;
  width: 196px;
  text-align: center;
  padding-top: 15px;
  margin-left: 14px;
  & h5 {
    font-size: 14px;
  }
  & h5,
  & p {
    margin: 0;
  }
  & img {
    width: 102px;
    height: 102px;
    border: 1px solid #b1bac5;
    border-radius: 3px;
  }
  & .button {
    margin-top: 126px;
    & p {
      line-height: 25px;
      height: 25px;
      &:last-child {
        margin: 0;
      }
    }
  }
}
.resetForm,
.submitBtn {
  display: inline-block;
  line-height: 30px;
  color: #fff;
  height: 30px;
  padding: 0 15px;
  border-radius: 3px;
  font-size: 14px;
  margin-right: 10px;
  min-width: 55px;
  text-align: center;
  cursor: pointer;
  background: #2e4158;
  margin: 10px 0;
}
.cancel {
  background: #d6d6d6 !important;
  color: #666 !important;
  margin-left: 10px;
}
.point {
  width: 430px;
  height: 10px;
  position: absolute;
  bottom: 16px;
  text-align: center;
  & p {
    cursor: pointer;
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #e0e0e0;
    border-radius: 50%;
    margin: 0 3px;
  }
  & .curr {
    background: #b1b0b0;
  }
}
</style>