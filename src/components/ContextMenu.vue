<!-- 右键菜单 -->

<template>
  <ul v-show="visible" :style="{ left: `${left}px`, top: `${top}px`}" class="context-menu">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu);
      } else {
        document.body.removeEventListener('click', this.closeMenu);
      }
    },
  },
  data() {
    return {
      visible: false,  // 显示右键菜单
      top: 20,
      left: 20,
    };
  },
  methods: {
    openMenu(e) {
      this.top = e.clientY;
      this.left = e.clientX;
      this.visible = true;
    },
    closeMenu() {
      this.visible = false;
    },
  },
};
</script>
