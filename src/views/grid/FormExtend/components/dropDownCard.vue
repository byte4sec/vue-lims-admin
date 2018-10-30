<template>
  <el-card class="title-card" style="height: auto;">
    <div slot="header" class="header-right">
      <span>
        <i class="hand-pointer fas fa-angle-double-up"
          ref="dropIcon"
          style="transition: transform .3s linear;"
          @click="toggleForm(!dropForm)">
        </i>
      </span>
    </div>
    <slot name="card-body"></slot>
  </el-card>
</template>

<script>
export default {
  // 设置参数与事件
  model: {
    prop: 'dropForm',
    event: 'setModel',
  },
  props: [
    'dropForm',
  ],
  methods: {
    toggleForm(flag) {
      this.$emit('setModel', flag);
      if (flag) {
        this.$refs.dropIcon.classList.remove('turnAround');
        this.$el.lastChild.style.display = 'block';
      } else {
        this.$refs.dropIcon.classList.add('turnAround');
        this.$el.lastChild.style.display = 'none';
      }
    },
  },
};
</script>

<style scoped>
  .header-right {
    text-align: end;
    margin-right: 10px;
  }
  .hand-pointer {
    cursor: pointer;
    padding: 5px;
  }
  .turnAround {
    transform: rotateZ(180deg);
  }
</style>
