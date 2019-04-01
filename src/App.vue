<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="scss">
@import "./assets/css/mixin";
@import "./assets//css/base.scss";

#app {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  @include bg-url("./assets/image/bgi.png");
  @include bg-full($args1:initial);
}
.fade-enter-active,.fade-leave-active {
  @include transition(all .2s ease);
}
.fade-enter,.fade-leave-active {
  opacity: 0;
}
</style>
