<template>
    <el-col :span="24" class="topTip">
        <el-col :span="6" class="topTip-pageName">
            <slot name="pageName"></slot>
        </el-col>
        <el-col :span="14" class="topTip-tipText">
            <i class="fa fa-info-circle"></i>
            欢迎登录，Sun!，你最后一次登录是在昨天下午16:52
        </el-col>
        <el-col :span="4" class="topTip-others">

        </el-col>
    </el-col>
</template>

<script>
export default {
    name: 'topTip'
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base.scss";

.topTip {
    height: 6 * $fontSize10;
    line-height: 6 * $fontSize10;
    border-bottom:1px solid $themeddd; 
    .topTip-pageName {
        padding: 0 $fontSize16 0 3 * $fontSize10;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .topTip-tipText {
        height: 6 * $fontSize10;
        padding: 0 $fontSize16 0 2 * $fontSize14;
        border-left: 1px dashed $themeccc;
        border-right: 1px dashed $themeccc;
        font-size: $fontSize14;
        font-weight: normal;
        letter-spacing: 1px;
        color: $color1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .fa-info-circle {
            display: inline-block;
            vertical-align: middle;
            font-size: $fontSize18;
            color: $color2;
        }
    }
}
</style>

