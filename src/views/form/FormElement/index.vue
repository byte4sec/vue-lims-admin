<!-- 表单元素 -->

<template>
  <el-card>
    <fieldset>
      <legend>图标</legend>
      <i class="fas fa-minus" aria-hidden="true"></i>&nbsp;
      <i class="fas fa-plus" aria-hidden="true"></i>&nbsp;
      <i class="fas fa-expand" aria-hidden="true"></i>&nbsp;
      <i class="fas fa-compress" aria-hidden="true"></i>&nbsp;
      <i class="fas fa-file" aria-hidden="true"></i>&nbsp;
      <i class="fas fa-folder" aria-hidden="true"></i>&nbsp;
      <i class="fas fa-folder-open" aria-hidden="true"></i>&nbsp;
    </fieldset>
    <fieldset class="mar-t-sm">
      <legend>按钮</legend>
      <icon-button />
    </fieldset>
    <fieldset class="mar-t-sm">
      <legend>全选与反选</legend>
      <select-option />
    </fieldset>
    <fieldset class="mar-t-sm">
      <legend>自定义选择器</legend>
      <select-custom />
    </fieldset>
  </el-card>
</template>

<script>
import IconButton from './components/IconButton';
import SelectOption from './components/SelectOption';
import SelectCustom from './components/SelectCustom';
// SelectCustom

export default {
  name: 'FormElement',
  components: {
    IconButton,
    SelectOption,
    SelectCustom,
  },
};
</script>
