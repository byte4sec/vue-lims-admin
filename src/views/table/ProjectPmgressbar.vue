<template>
    <!-- <b>二.15 Grid统计</b> -->
  <el-card class="title-card">
    <div slot="header">
      <span>进度条列表列表</span>
    </div>
    <!-- 表格内容 -->
    <el-table ref="multipleTable" :data="tableData" :show-overflow-tooltip="true">
      <el-table-column type="index" align="center" width="60px"></el-table-column>
      <el-table-column type="selection" align="center" width="60px"></el-table-column>
      <el-table-column label="操作" align="center" width="95px">
        <template slot-scope="scope">
          <el-button type="primary" title="编辑">
            <i class="fas fa-pen"></i>
          </el-button>
          <el-button type="danger" title="删除">
            <i class="fas fa-trash-alt"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="企业名称" align="center" prop="name" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="企业类型" align="center" prop="companyType" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="项目所属类别" align="center" prop="projectType" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="完成进度" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span :class="scope.row.job">{{ scope.row.entrust }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务终止" align="center" width="45px" :show-overflow-tooltip="true" >
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number4]">{{ scope.row.number4 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="项目登记中" align="center" width="45px" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number5]">{{ scope.row.number5 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="任务下达中" align="center" width="45px" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number6]">{{ scope.row.number6 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="任务办理中" align="center" prop="number7" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number7]">{{ scope.row.number7 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="测试中" align="center" prop="number8" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number8]">{{ scope.row.number8 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="数据确认中" align="center" prop="number9" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number9]">{{ scope.row.number9 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="数据审核中" align="center" prop="number10" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number10]">{{ scope.row.number10 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="分析数据已办结" align="center" prop="number11" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number11]">{{ scope.row.number11 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="编制报告中" align="center" prop="number12" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number12]">{{ scope.row.number12 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="报告未通过" align="center" prop="number13" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number13]">{{ scope.row.number13 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="报告初审中" align="center" prop="number14" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number14]">{{ scope.row.number14 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="报告复审中" align="center" prop="number15" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number15]">{{ scope.row.number15 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="报告审核中" align="center" prop="number16" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number16]">{{ scope.row.number16 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="办结归档中" align="center" prop="number17" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number17]">{{ scope.row.number17 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="已办结" align="center" prop="number18" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number18]">{{ scope.row.number18 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="报告传送中" align="center" prop="number19" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number19]">{{ scope.row.number19 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="报告已传送" align="center" prop="number20" :show-overflow-tooltip="true" width="45px">
        <template slot-scope="scope">
          <div :class="$enum.planStatus[scope.row.number20]">{{ scope.row.number20 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="计划投入资源(人)" align="center" prop="number" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="实际投入资源(人)" align="center" prop="person" :show-overflow-tooltip="true"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'ProjectPmgressbar',
  data() {
    return {
      tableData: [
        {
          name: '天堂映画',
          companyType: '影视文化传播',
          projectType: 'A1',
          job: 'text-danger',
          entrust: '未完成(2)',
          number: '12',
          person: '16',
          number4: 'sure',
          number5: 'sure',
          number6: 'unsure',
          number7: 'boom',
          number8: 'boom',
          number9: 'boom',
          number10: 'boom',
          number11: 'boom',
          number12: 'boom',
          number13: 'boom',
          number14: 'boom',
          number15: 'boom',
          number16: 'boom',
          number17: 'boom',
          number18: 'boom',
          number19: 'boom',
          number20: 'boom',
        },
        {
          name: '三一重工',
          companyType: '机械制造',
          projectType: 'S1',
          job: 'text-success',
          entrust: '以完成',
          number: '30',
          person: '40',
          number4: 'sure',
          number5: 'sure',
          number6: 'sure',
          number7: 'sure',
          number8: 'sure',
          number9: 'sure',
          number10: 'sure',
          number11: 'sure',
          number12: 'sure',
          number13: 'sure',
          number14: 'sure',
          number15: 'sure',
          number16: 'sure',
          number17: 'sure',
          number18: 'sure',
          number19: 'sure',
          number20: 'sure',
        },
        {
          name: '中粮集团',
          companyType: '农产品食品加工',
          projectType: 'B1',
          job: 'text-warning',
          entrust: '未开始',
          number: '10',
          person: '16',
          number4: 'sure',
          number5: 'sure',
          number6: 'sure',
          number7: 'sure',
          number8: 'sure',
          number9: 'unsure',
          number10: 'boom',
          number11: 'boom',
          number12: 'boom',
          number13: 'boom',
          number14: 'boom',
          number15: 'boom',
          number16: 'boom',
          number17: 'boom',
          number18: 'boom',
          number19: 'boom',
          number20: 'boom',
        },
        {
          name: '华谊兄弟',
          companyType: '影视文化传播',
          projectType: 'S2',
          job: 'text-success',
          entrust: '已完成',
          number: '20',
          person: '26',
          number4: 'sure',
          number5: 'sure',
          number6: 'sure',
          number7: 'sure',
          number8: 'sure',
          number9: 'sure',
          number10: 'sure',
          number11: 'sure',
          number12: 'sure',
          number13: 'sure',
          number14: 'sure',
          number15: 'sure',
          number16: 'sure',
          number17: 'sure',
          number18: 'sure',
          number19: 'sure',
          number20: 'sure',
        },
        {
          name: '阿里影业',
          companyType: '影视文化传播',
          projectType: 'SS1',
          job: 'text-danger',
          entrust: '未完成(11)',
          number: '60',
          person: '100',
          number4: 'sure',
          number5: 'unsure',
          number6: 'boom',
          number7: 'boom',
          number8: 'boom',
          number9: 'boom',
          number10: 'boom',
          number11: 'boom',
          number12: 'boom',
          number13: 'boom',
          number14: 'boom',
          number15: 'boom',
          number16: 'boom',
          number17: 'boom',
          number18: 'boom',
          number19: 'boom',
          number20: 'boom',
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="scss">
.headers{
  margin-bottom: 10px;
}
</style>
