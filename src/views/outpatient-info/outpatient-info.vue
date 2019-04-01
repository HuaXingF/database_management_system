<template>
    <el-col :span="24" class="outpatientInfo">
        <MTopNav>
            <template slot="pageName">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>
                        <i class="fa fa-home"></i>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
            <template slot="operation">
                
            </template>
        </MTopNav>
    </el-col>
</template>

<script>
import MTopNav from '@/components/m-topNav/m-topNav'

export default {
    name: 'outpatientInfo',
    components: {
        MTopNav
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base.scss";
@import "~@/assets/css/mixin.scss";

.fa-home {
    font-size: $fontSize16;
    color: $color4;
    display: inline-block;
    vertical-align: middle;
    margin-top: - $fontSize8 / 4;
}
</style>
