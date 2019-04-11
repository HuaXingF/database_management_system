<template>
  <aside class="main-aside" :class="collapsed ? 'menu-collapsed' : 'menu-expanded'">
    <!-- 导航菜单 -->
    <el-menu
      class="el-menu-vertical"
      :default-active="$route.path"
      unique-opened
      router
      v-show="!collapsed"
    >
      <template v-for="(item, index) in $router.options.routes">
        <template v-if="!item.hidden && !item.flagHidden">
          <el-submenu :key="index" :index="index + ''" v-if="!item.leaf">
            <template slot="title">
              <i :class="item.iconCls"></i>
              {{item.name}}
            </template>
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path">
              <i :class="item.iconCls"></i>
              {{child.name}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item
            v-if="item.leaf && item.children.length > 0"
            :index="item.children[0].path"
            :key="item.children[0].path"
          >
            <i :class="item.iconCls"></i>
            {{item.children[0].name}}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
    <!-- 导航菜单--折叠后 -->
    <ul class="el-menu el-menu-vertical collapsed" v-show="collapsed" ref="menuCollapsed">
      <li v-for="(item, index) in $router.options.routes" :key="index" class="el-submenu item">
        <template v-if="!item.hidden && !item.flagHidden">
          <template v-if="!item.leaf">
            <div
              class="el-submenu__title"
              @mouseover="showMenu(index,true)"
              @mouseout="showMenu(index,false)"
            >
              <i :class="item.iconCls"></i>
            </div>
            <ul
              class="el-menu submenu"
              :class="'submenu-hook-' + index"
              @mouseover="showMenu(index,true)"
              @mouseout="showMenu(index,false)"
            >
              <li
                v-for="child in item.children"
                :key="child.path"
                class="el-menu-item"
                :class="$route.path == child.path ? 'is-active' : ''"
                @click="$router.push(child.path)"
              >{{child.name}}</li>
            </ul>
          </template>
          <template v-else>
            <li class="el-submenu">
              <div
                class="el-submenu__title"
                :class="$route.path == item.children[0].path ? 'is-active' : ''"
                @click="$router.push(item.children[0].path)"
              >
                <i :class="item.iconCls"></i>
              </div>
            </li>
          </template>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "m-aside",
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base.scss";
@import "~@/assets/css/mixin.scss";

.el-menu-item.is-active {
  background-color: #43586f;
}

.main-aside .collapsed .el-submenu .el-menu {
  width: 200px;
}
.main-aside {
  position: relative;
  /deep/ .el-menu .el-menu--inline {
    > li {
      font-size: 12px;
      padding-left: 45px !important;
    }
  }
  &.menu-expanded {
    flex: 0 0 250px;
    width: 250px;
    height: 100%;
    .el-menu {
      margin: 0 10px;
      height: 100%;
      overflow-y: auto;
    }
  }
  &.menu-collapsed {
    flex: 0 0 60px;
    width: 60px;
    & > .el-menu {
      margin: 0;
    }
  }
  & > .el-menu {
    position: absolute;
    top: 0;
    width: 230px;
    border: none;
    background: none repeat scroll 0 0 rgba(0, 0, 0, 0.1);
    @include borderRadius(3px);
    .el-menu-item {
      color: #fff !important;
      border-left: 2px solid rgba(255, 255, 255, 0);
      &:hover,
      &:focus {
        background: rgba(0, 0, 0, 0.2);
        position: relative;
        border-color: rgba(255, 255, 255, 1);
        &:after {
          width: 0px;
          height: 0px;
          position: absolute;
          top: 25px;
          left: -6px;
          content: "";
          display: block;
          transform: rotate(90deg);
          border-bottom: 6px solid rgb(255, 255, 255);
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
        }
      }
    }
  }
  .collapsed {
    width: 60px;
    .item {
      position: relative;
    }
    .submenu {
      display: none;
      width: 135px;
      height: auto;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 60px;
      z-index: 99999;
    }
    .el-submenu .el-menu {
      background: #3d5371;
    }
  }
}
.systemSetting {
  display: inline-block;
  vertical-align: middle;
  margin-top: -2px;
  margin-right: 12px;
  width: 16px;
  height: 16px;
  @include bg-full($args2: 100%);
  @include bg-url("./icon_settings.png");
}
.medicalTheme {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 12px;
  @include bg-full($args2: contain);
  @include bg-url("./icon_ztc.png");
}
.messageSearch {
  display: inline-block;
  vertical-align: middle;
  width: 14px;
  height: 15px;
  margin-top: -2px;
  margin-left: 2px;
  margin-right: 12px;
  @include bg-full();
  @include bg-url("./icon_retrieval.png");
}
.expertLink {
  display: inline-block;
  vertical-align: middle;
  width: 15px;
  height: 15px;
  margin-right: 12px;
  margin-left: 2px;
  margin-top: -1px;
  @include bg-full($args2: contain);
  @include bg-url("./icon_-relevance.png");
}
.handleIndexing {
  display: inline-block;
  vertical-align: middle;
  width: 17px;
  height: 13px;
  margin-right: 12px;
  margin-left: 2px;
  margin-top: -1px;
  @include bg-full($args2: 100%);
  @include bg-url("./icon_index.png");
}
.indexingCheck {
  display: inline-block;
  vertical-align: middle;
  width: 13px;
  height: 15px;
  margin-right: 12px;
  margin-left: 4px;
  margin-top: -1px;
  @include bg-full();
  @include bg-url("./icon_check.png");
}
</style>
<style>
.el-submenu__title {
  color: #fff !important;
  border-left: 2px solid rgba(255, 255, 255, 0);
}
.el-submenu__title:hover {
  border-color: rgba(255, 255, 255, 1);
  background: rgba(0, 0, 0, 0.2) !important;
}
.el-submenu__title:hover:after {
  width: 0px;
  height: 0px;
  position: absolute;
  top: 25px;
  left: -6px;
  content: "";
  display: block;
  transform: rotate(90deg);
  border-bottom: 6px solid rgb(255, 255, 255);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
}
.el-menu.el-menu--inline {
  background: none 0px 0px repeat scroll rgba(0, 0, 0, 0) !important;
}
.el-submenu .el-menu-item {
}
.el-submenu__title.el-menu-item {
  width: 60px !important;
  height: 56px !important;
  line-height: 56px !important;
}
.el-submenu__title i {
  color: #fff !important;
}
</style>
