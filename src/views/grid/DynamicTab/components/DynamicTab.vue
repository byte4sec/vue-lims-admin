<template>
  <el-card>
    <div slot="header">
      <el-select v-model="inventoryInfo">
        <el-option label="现有库存信息" value="existing"></el-option>
        <el-option label="所有信息" value="all"></el-option>
      </el-select>
    </div>
    <el-button type="primary">
      <i class="fas fa-plus" aria-hidden="true"></i> 新 增
    </el-button>
    <el-button type="danger">
      <i class="fas fa-trash-alt" aria-hidden="true"></i> 删 除
    </el-button>
    <el-table :data="tableData" style="width: 100%" class="mar-t-sm" border stripe full="1">
      <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column align="center" label="操作" width="55">
        <template slot-scope="scope">
          <el-button type="primary" size="small" title="编辑" @click="onClickEdit(scope.row)">
            <i class="fas fa-pencil-alt" aria-hidden="true"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="库存"></el-table-column>
      <el-table-column prop="name" label="单位"></el-table-column>
      <el-table-column prop="address" label="生产厂商" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="生产批号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="有效日期" show-overflow-tooltip></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: ['field'],
  data() {
    return {
      inventoryInfo: 'existing',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      }],
    };
  },
};
</script>

<style scoped>

</style>
