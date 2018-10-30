<!-- 页面的展开和收缩 -->
<template>
  <el-card>
    <el-button type="primary" @click="openDialog">显示弹框</el-button>
    <el-dialog :visible.sync="dialogVisible" :fullscreen="isFullscreen">
      <template slot="title">
        <span class="el-dialog__title">提示</span>
        <button type="button" class="el-dialog__headerbtn" @click="isFullscreen = !isFullscreen">
          <i :class="`fas fa-${isFullscreen ? 'compress' : 'expand'}`"></i>
        </button>
      </template>
      <div :slot="isFullscreen ? null : 'footer'" :class="{ 'dialog-footer': !isFullscreen, 'mar-b-sm': isFullscreen }">
        <el-button type="primary" size="small">
          <i class="fas fa-save" aria-hidden="true"></i> 保 存
        </el-button>
        <el-button size="small" @click="dialogVisible = false">
          <i class="fas fa-times" aria-hidden="true"></i> 关 闭
        </el-button>
      </div>
      <el-table :data="tableData3" height="250" border style="width: 100%">
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'DialogExtend',
  data() {
    return {
      dialogVisible: false,
      isFullscreen: false,
      tableData3: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
      this.isFullscreen = false;
    },
  },
};
</script>
