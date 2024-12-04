<script>
export default {
}
</script>

<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app {
  width: 100%;        /* 占满屏幕宽度 */
  height: 100%;      /* 占满屏幕高度 */
  margin: 0;          /* 去除默认的 margin */
  display: flex;      /* 使用 Flexbox */
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}
</style>
