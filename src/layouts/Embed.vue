<!-- 子路由嵌套布局模板 -->
<template>
  <keep-alive :include="cachedViews" :max="3">
    <router-view />
  </keep-alive>
</template>

<script>
export default {
  name: 'Embed',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews || [];
    },
  },
};
</script>
