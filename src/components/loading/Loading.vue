<template>
    <div class="loader layermbox layermbox2 layermshow">
        <div class="laymshade"></div>
        <div class="layermmain">
            <div class="section">
                <div class="layermchild  layermanim">
                    <div class="layermcont">
                        <i></i>
                        <i class="laymloadtwo"></i>
                        <i></i>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/loader.scss";
.laymshade {
  background-color: rgba(0, 0, 0, 0.05);
  pointer-events: auto;
}
.layermbox2 .layermchild {
  box-shadow: none;
  background-color: inherit;
}
.layermchild {
  position: relative;
  border-radius: 3px !important;
}
.layermcont {
  text-align: center;
  padding: 0 20px;
  margin-top: 40px;
  margin-bottom: 65px;
  word-break: break-all;
  max-height: 500px;
  max-height: 60vh;
  overflow: auto;
}
.layermbox2 .layermcont i:first-child{
    background-color: #f20;
}
.layermbox2 .layermcont i:nth-child(2){
    background-color: #f50;
}
.layermbox2 .layermcont i:nth-child(3){
    background-color: #f80;
}
</style>
