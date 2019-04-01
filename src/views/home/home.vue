<template>
    <el-row class="container">
        <MHeader :collapsed="collapsed" @collapse="collapse"></MHeader>
        <el-col :span="24" class="main">
            <MAside :collapsed="collapsed"></MAside>
            <section class="content-container">
                <MTopTip>
                    <template slot="pageName">
                        <i class="topTip-pageIcon" :class="itemClass"></i>
                        <span class="topTip-pageName">{{$route.name}}</span>
                    </template>
                </MTopTip>
                <el-col :span="24" class="content-wrapper">
                    <router-view></router-view>
                </el-col>
            </section>
        </el-col>
    </el-row>
</template>

<script>
import MHeader from '@/components/m-header/m-header'
import MAside from '@/components/m-aside/m-aside'
import MTopTip from '@/components/m-topTip/m-topTip'

export default {
    data() {
        return {
            collapsed: false
        }
    },
    methods: {
        //折叠导航栏
        collapse() {
            this.collapsed = !this.collapsed
        }
    },
    computed: {
        //动态获取当前页面路由name,并设置动态className
        itemClass() {
            let className = ''
            let name = this.$route.name
            switch (name) {
                case '系统设置':
                    className = 'systemSetting'
                    break
                case '主题词典列表':
                    className = 'medicalTheme'
                    break
                case '主题词典管理':
                    className = 'medicalTheme'
                    break
                case '信息检索':
                    className = 'messageSearch'
                    break
                case '专家关联':
                    className = 'expertLink'
                    break
                case '住院信息标引':
                    className = 'handleIndexing'
                    break
                case '门诊信息标引':
                    className = 'handleIndexing'
                    break
                case '标引审核':
                    className = 'indexingCheck'
                    break
            }
            return className
        }
    },
    components: {
        MHeader,
        MAside,
        MTopTip
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base.scss";
@import "~@/assets/css/mixin.scss";

.container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .main {
        display: flex;
        position: absolute;
        top: 6 * $fontSize12;
        bottom: 0;
        overflow: hidden;
        .content-container {
            flex: 1;
            overflow-y: auto;
            background: #fff;
            box-sizing: border-box;
            .topTip-pageName {
                font-size: $fontSize16;
                font-weight: normal;
                letter-spacing: 1px;
                color: $color4;
            }
            .topTip-pageIcon {
                display: inline-block;
                vertical-align: middle;
                margin-right: $fontSize8;
                @include bg-full();
            }
            .systemSetting {
                margin-top: - $fontSize12 / 2;
                width:$fontSize16;
                height: $fontSize16;
                @include bg-url('./icon_settings1.png');
            }
            .medicalTheme {
                width:$fontSize16;
                height: $fontSize16;
                margin-top: - $fontSize12 / 4;
                @include bg-full($args2:contain);
                @include bg-url('./icon_ztc1.png');
            }
            .messageSearch {
                width: $fontSize14;
                height: $fontSize14 + 1;
                margin-top: - $fontSize8 / 2;
                margin-left: $fontSize8 / 4;
                @include bg-url('./icon_retrieval1.png');
            }
            .expertLink {
                width: $fontSize14 + 1;
                height: $fontSize14 + 1;
                margin-left: $fontSize8 / 4;
                margin-top: - $fontSize8 / 4;
                @include bg-url('./icon_relevance1.png');
            }
            .handleIndexing {
                width: $fontSize16 + 1;
                height: $fontSize14 - 1;
                margin-left: $fontSize8 / 4;
                margin-top: - $fontSize8 / 2;
                @include bg-url('./icon_index1.png');
            }
            .indexingCheck {
                width: $fontSize12 + 1;
                height: $fontSize14 + 1;
                margin-left: $fontSize8 / 2;
                margin-top: - $fontSize12 / 4;
                @include bg-url('./icon_check1.png');
            }
        }
    }
}
</style>
