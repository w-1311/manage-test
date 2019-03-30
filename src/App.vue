<template>
  <div class="app">
    <!-- 设置出口-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
/* 设置高度 */
.app {
  height: 100%;
}
</style>
