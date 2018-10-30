<!-- 收缩控件组 -->

<template>
  <fieldset class="fieldset-flex">
    <legend @click="isCollapse = !isCollapse">
      <i :class="{ 'fas': 1, 'fa-caret-right': 1, 'fa-rotate-90': isCollapse }"></i> {{ title }}
    </legend>
    <transition name="fade-move">
      <div v-show="isCollapse" style="">
        <slot></slot>
      </div>
    </transition>
  </fieldset>
</template>

<script>
export default {
  props: {
    // 接收绑定参数
    title: String,
  },
  data() {
    return {
      isCollapse: true,
    };
  },
};
</script>
