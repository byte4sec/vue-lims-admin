<!-- 测试扩展 -->

<template>
  <div>
    <el-button type="primary" @click="onClickAdd()">
      <i class="fas fa-plus" aria-hidden="true"></i> 新 增
    </el-button>
    <el-button type="danger" @click="onDeleteItem()" :disabled="!selectedIds.length">
      <i class="fas fa-trash-alt" aria-hidden="true"></i> 删 除
    </el-button>
    <!-- <hr class="dashed"> -->
    <el-table
      border
      stripe
      full
      class="mar-t-sm"
      :data="itemList"
      :loading="loading"
      @selection-change="changeSelected">
      <el-table-column align="center" type="selection" width="35"></el-table-column>
      <el-table-column align="center" label="序号" min-width="45" type="index"></el-table-column>
      <el-table-column align="center" label="操作" width="55">
        <template slot-scope="scope">
          <el-button type="primary" size="small" title="编辑" @click="onClickEdit(scope.row)">
            <i class="fas fa-pencil-alt" aria-hidden="true"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column property="testId" label="测试项目" show-overflow-tooltip></el-table-column>
      <el-table-column property="examLimitValue" label="检出限" show-overflow-tooltip></el-table-column>
      <el-table-column property="mostDecimal" label="小数位数" show-overflow-tooltip></el-table-column>
      <el-table-column property="mostSignificance" label="有效位数" show-overflow-tooltip></el-table-column>
      <el-table-column property="samplingCharge" label="采样费金额" show-overflow-tooltip></el-table-column>
      <el-table-column property="testingCharge" label="检测费金额" show-overflow-tooltip></el-table-column>
      <el-table-column property="sampleTypeId" label="样品类型" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      loading: false,          // 表格数据加载状态
      dialogVisible: false,    // 表单弹框显示状态
      itemModel: {},           // 编辑表单绑定变量
      itemList: [],            // 数据项列表
      selectedIds: [],         // 已选择的数据 id 数组
      queryForm: {             // 查询表单绑定变量
        sampleType: '',           // 样品类型
        key: '',                  // 关键字
      },
      pager: {
        page: 1,
        rows: 5,
        total: 0,
      },
    };
  },
  methods: {
    // 改变选择项
    changeSelected(selection) {
      this.selectedIds = selection.map(val => val.id);
    },
    getEmptyItem() {
      return {
        testId: '',             // 测试id
        sampleTypeId: '',       // 样品类型
        mostSignificance: '',   // 有效位数
        mostDecimal: '',        // 小数位数
        samplingCharge: '',     // 采样费金额
        testingCharge: '',      // 检测费金额
        examLimitValue: '',     // 检出限
        dimensionId: '',        // 计量单位
        examLimitValueLess: '', // 小于检出限
      };
    },
  },
};
</script>
