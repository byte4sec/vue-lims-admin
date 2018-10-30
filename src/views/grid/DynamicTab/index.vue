<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="10">
        <el-card class="title-card">
          <div slot="header">
            <span class="title">消耗品</span>
          </div>
          <!-- <basic-table @setField="row => rowfield = row" /> -->
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane :label="rowfield.movieName || '测试'" name="first">
            <!-- <dynamic-tab /> -->
          </el-tab-pane>
          <el-tab-pane label="领用记录" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="入库记录" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import BasicTable from './components/BasicTable';
// import DynamicTab from './components/DynamicTab';

export default {
  name: 'DynamicTab',
  components: {
    // BasicTable,
    // DynamicTab,
  },
  data() {
    return {
      activeName: 'first',
      rowfield: {},
    };
  },
};
</script>
