<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <operate-tree
        title="点位信息"
        action="api/operateTree">
      </operate-tree>
    </el-col>
    <el-col :span="16">
      <el-card class="title-card">
        <template slot="header">
          <span class="el-card__title">相关测试项目</span>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import OperateTree from './components/OperateTree';

export default {
  name: 'TreeEdit',
  components: {
    OperateTree,
  },
};
</script>
