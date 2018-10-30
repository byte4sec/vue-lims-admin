<template>
  <div class="g-wrap">
    <layout-header class="g-head" />
    <layout-sidebar class="g-side" />
    <main :class="{ 'g-main': 1, 'is-extend': isExtend }">
      <transition name="fade-move" mode="out-in">
        <keep-alive :include="cachedViews" :max="10">
          <router-view />
        </keep-alive>
      </transition>
    </main>
  </div>
</template>

<script>
import LayoutHeader from './components/Header';
import LayoutSidebar from './components/Sidebar';

export default {
  components: {
    LayoutHeader,
    LayoutSidebar,
  },
  computed: {
    isExtend() {
      return this.$store.state.isCollapseSide || '';
    },
    cachedViews() {
      return ['Embed', ...this.$store.state.tagsView.cachedViews];
    },
  },
};
</script>
