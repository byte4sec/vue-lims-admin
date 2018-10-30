<template>
  <el-tabs type="border-card">
    <el-tab-pane label="用户管理">
      <el-tabs v-model="activeName1">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">
          <demo-one />
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-tab-pane>
    <el-tab-pane label="配置管理">
      <demo-two />
    </el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script>
import DemoOne from './TitleButton';
import DemoTwo from './DragSearchData';

export default {
  name: 'MoreTabs',
  components: {
    DemoOne,
    DemoTwo,
  },
  data() {
    return {
      activeName1: 'third',
    };
  },
};
</script>
