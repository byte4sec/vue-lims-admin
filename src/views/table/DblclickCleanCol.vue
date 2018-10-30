<template>
  <el-card class="title-card">
    <div slot="header">
      <span>二.12 Grid双击选择，清除grid某一列的数据</span>
    </div>
    <div class="dbclick_left_table">
      <el-table script border :data="tableDataOne" @cell-dblclick="dblclickTableCell">
        <el-table-column type="selection" width="50" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="样品编号" prop="sampleCode" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="点位" prop="portId" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="样品类型" prop="sampleType" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="检测项目" prop="surveyProject" min-width="120" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <div class="dbclick_right_table">
      <el-table script border :data="tableDataTwo">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="{ rows, $index }">
            <el-button size="mini" type="primary"><i class="fas fa-pen"></i></el-button>
          </template>
        </el-table-column>
        <el-table-column label="样品编号" prop="sampleCode" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="点位" prop="portId" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="样品类型" prop="sampleType" min-width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="检测项目" prop="surveyProject" min-width="120" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'DblclickCleanCol',
  data() {
    return {
      tableDataOne: [
        {
          rowGuid: 1,
          sampleCode: '样品编号1', // 样品编号
          portId: '点位431242', // 点位
          sampleType: '样品类型112234', // 样品类型
          surveyProject: '检测项目12332144', // 检测项目
        },
        {
          rowGuid: 2,
          sampleCode: '样品编号2', // 样品编号
          portId: '点位412342', // 点位
          sampleType: '样品类型121234', // 样品类型
          surveyProject: '检测项目1212332144', // 检测项目
        },
        {
          rowGuid: 3,
          sampleCode: '样品编号e', // 样品编号
          portId: '点位43123wqe2', // 点位
          sampleType: '样品类型1rewq1', // 样品类型
          surveyProject: '检测项目11234e', // 检测项目
        },
        {
          rowGuid: 4,
          sampleCode: '样品编号f', // 样品编号
          portId: '点位4wqer', // 点位
          sampleType: '样品类型2134q4', // 样品类型
          surveyProject: '检测项目qwet134', // 检测项目
        },
      ],
      tableDataTwo: [],
    };
  },
  methods: {
    deleteTableData(row, column) {
      if (column.type === 'selection') {
        return;
      }
      this.tableDataOne = this.tableDataOne.filter(item => item.rowGuid !== row.rowGuid);
      this.tableDataTwo.unshift(row);
      // 请求
      // const oneData = this.tableDataOne;
      // const twoData = this.tableDataTwo;
      // oneData.splice();
    },
    dblclickTableCell(row, column) { // 双击表格某一行
      this.deleteTableData(row, column);
    },
  },
};
</script>

<style scoped>
.dbclick_left_table{
  float: left;
  width: 48%;
}
.dbclick_right_table{
  width: 48%;
  float: left;
  margin-left: 4%;
}
</style>
