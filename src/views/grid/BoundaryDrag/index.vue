<template>
  <el-row :gutter="10" v-move>
    <el-col :span="6">
      <el-card class="title-card">
        <template slot="header">Left</template>
        <div style="height: 500px"></div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="title-card">
        <template slot="header">Center</template>
        <div style="height: 500px"></div>
      </el-card>
    </el-col>
    <el-col :span="10">
      <el-card class="title-card">
        <template slot="header">Right</template>
        <div style="height: 500px"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: 'BoundaryDrag',
};
</script>
