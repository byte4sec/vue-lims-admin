<template>
  <el-form inline :model="queryForm">
    <el-form-item label="树状选择器：">
      <select-tree v-model="queryForm.tree" :options="options" />
    </el-form-item>
    <el-form-item label="窗格选择器：">
      <select-pane
        v-model="queryForm.pane"
        url="enumCode/selectPane"
        label="原值"
        title="收纳水体"
        :col-width="200"
        :col-titles="['流域', '干流', '一级支流', '二级支流', '其他河流']" />
    </el-form-item>
  </el-form>
</template>

<script>
import SelectPane from '@/components/SelectPane';
import SelectTree from '@/components/SelectTree';

export default {
  name: 'Select',
  components: {
    SelectPane,
    SelectTree,
  },
  data() {
    return {
      queryForm: {            // 查询表单绑定变量
        pane: '',        // 因子类型
        tree: '',           // 所属类型
      },
      options: [],
    };
  },
};
</script>

<style lang="scss">

</style>
