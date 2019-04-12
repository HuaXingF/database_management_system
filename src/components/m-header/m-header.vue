<template>
  <el-col :span="24" class="main-header">
    <el-col :span="4" class="logoBox" :class="collapsed ? 'logo-collapse-width' : 'logo-width'">
      <el-col :span="20" class="logoText" v-show="!collapsed">
        <i class="logoPic"></i>
        <span class="text">数据质量控制系统</span>
      </el-col>
      <div class="toolBtn" @click.prevent="collapse">
        <i class="fa fa-bars"></i>
      </div>
    </el-col>
    <el-col :span="12" class="tipBox">
      <ul :span="24" class="tipSwiper">
        <li class="item">今日推送</li>
        <li class="item">今日推送</li>
      </ul>
    </el-col>
    <el-col :span="7" class="toolBox clearfix">
      <div class="operate">
        <span class="operatePic"></span>
      </div>
      <!-- <div class="setting">
                <span class="setting-inner"><i class="fa fa-cog"></i>换肤</span>
      </div>-->
      <div class="userInfo">
        <span class="userInfo-inner">
          <img src="http://api.randomuser.me/portraits/thumb/men/10.jpg" class="userAvatar">
          <em>Hi, Sun</em>
          <i class="fa fa-sort-down"></i>
        </span>
      </div>
    </el-col>
  </el-col>
</template>

<script>
export default {
  name: "m-header",
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //折叠导航栏
    collapse() {
      this.$emit("collapse");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base.scss";
@import "~@/assets/css/mixin.scss";

.main-header {
  height: 4.5 * $fontSize16;
  line-height: 4.5 * $fontSize16;
  color: $themeWhite;
  .logoBox {
    padding-left: $fontSize14;
    padding-right: $fontSize10;
    height: 6 * $fontSize12;
    @include clearfix;
    .logoPic {
      width: 45px;
      height: 45px;
      position: absolute;
      top: 20px;
      margin-right: $fontSize8 / 2;
      background: url("uugai.com-1553134847220.png");
      background-size: cover;
    }
    .text {
      font-size: $fontSize22;
      font-weight: normal;
      letter-spacing: 1px;
      margin-left: 46px;
    }
    .toolBtn {
      float: right;
      cursor: pointer;
      width: 3 * $fontSize10;
      height: 3 * $fontSize10;
      line-height: 3 * $fontSize10;
      text-align: center;
      margin-top: $fontSize22 - 1;
      @include borderRadius(3px);
      font-size: $fontSize14;
      color: rgba(255, 255, 255, 0.8);
      @include link-posColor(rgba(34, 51, 76, 0.4), rgba(34, 51, 76, 0.85));
    }
  }
  .logo-width {
    width: 30 * $fontSize10;
  }
  .logo-collapse-width {
    width: 6 * $fontSize10;
  }
  .tipBox {
    background: none repeat scroll 0 0 rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.2);
    @include borderRadius(3 * $fontSize10);
    @include boxShadow(0 1px 0 rgba(255, 255, 255, 0.1));
    margin-top: $fontSize14 + 1;
    margin-left: 17 * $fontSize10;
    padding: $fontSize10 $fontSize20 $fontSize10 $fontSize20;
    width: 42%;
    @include mediaQuery(1600px) {
      margin-left: 14 * $fontSize10;
    }
    @include mediaQuery(1500px) {
      margin-left: 11 * $fontSize10;
    }
    @include mediaQuery(1400px) {
      margin-left: 7 * $fontSize10;
    }
    @include mediaQuery(1300px) {
      margin-left: 4 * $fontSize10;
    }
    @include mediaQuery(1300px) {
      margin-left: 2 * $fontSize10;
    }
    .tipSwiper {
      height: $fontSize20;
      text-align: center;
      overflow: hidden;
      .item {
        line-height: $fontSize20;
        font-size: $fontSize14;
        font-weight: normal;
        letter-spacing: 1px;
        color: $themeWhite;
      }
    }
  }
  .toolBox {
    @include clearfix;
    float: right;
    & > div {
      float: right;
      > span {
        margin: 0 $fontSize16 - 1;
        cursor: pointer;
      }
    }
    .operatePic {
      display: inline-block;
      width: $fontSize20;
      height: $fontSize10;
      @include bg-url("./operation.png");
      @include bg-full();
    }
    .setting-inner {
      font-size: $fontSize12;
      i {
        font-size: $fontSize14 + 1;
        margin-right: $fontSize12 / 2;
        vertical-align: middle;
        margin-top: -$fontSize12 / 6;
      }
    }
    .userInfo-inner {
      font-size: $fontSize14;
      .userAvatar {
        vertical-align: top;
        margin-top: $fontSize14;
        margin-right: $fontSize16;
        height: 2 * $fontSize20;
        width: 2 * $fontSize20;
        @include border(2px, solid, rgba(255, 255, 255, 0.8));
        @include borderRadius(50%);
      }
      .fa-sort-down {
        display: inline-block;
        vertical-align: middle;
        margin-top: -$fontSize12 / 2;
        margin-left: $fontSize8 / 2;
      }
    }
  }
}
</style>
