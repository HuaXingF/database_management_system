<template>
  <el-col :span="24" class="topNav">
    <el-col :span="24" class="topNav-pageName">
      <slot name="pageName"></slot>
    </el-col>
    <!-- <el-col :span="18" class="topNav-operation">
            <slot name="operation"></slot>
    </el-col>-->
  </el-col>
</template>

<script>
export default {
  name: "topNav"
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base.scss";

.topNav {
  height: 5 * $fontSize10;
  line-height: 5 * $fontSize10;
  background: $color3;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  .topNav-pageName {
    height: 5 * $fontSize10;
    line-height: 5 * $fontSize10;
    padding: 0 $fontSize16 0 $fontSize10 * 3;
  }
  .topNav-operation {
    padding: 0 $fontSize16;
  }
}
</style>
<style>
.el-breadcrumb {
  line-height: 50px;
}
.el-breadcrumb__inner {
  color: #9ca4af !important;
}
</style>
