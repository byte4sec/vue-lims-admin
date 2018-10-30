<!-- 使用仪器 -->

<template>
  <div>
    <el-form inline>
      <el-form-item label="样品类型：">
        <el-select v-model="queryForm.sampleType" clearable filterable style="width: 175px" >
          <el-option v-for="(item, key) in $enum.sampleTypeList" :key="key" :label="item" :value="key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQueryList()">
          <i class="fas fa-search" aria-hidden="true"></i> 查 询
        </el-button>
      </el-form-item>
    </el-form>
    <hr>
    <el-button type="primary" @click="onClickAdd()">
      <i class="fas fa-plus" aria-hidden="true"></i> 新 增
    </el-button>
    <el-button type="danger" @click="onDeleteItem()" :disabled="!selectedIds.length">
      <i class="fas fa-trash-alt" aria-hidden="true"></i> 删 除
    </el-button>
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
      <el-table-column property="kValue" label="斜率" show-overflow-tooltip></el-table-column>
      <el-table-column property="coefficient" label="相关系数" show-overflow-tooltip></el-table-column>
      <el-table-column property="testDate" label="配置日期" show-overflow-tooltip></el-table-column>
      <el-table-column property="testPersonName" label="配置人员姓名" show-overflow-tooltip></el-table-column>
      <el-table-column property="remark" label="备注" show-overflow-tooltip></el-table-column>
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
        testId: '',         // 测试标识
        testName: '',       // 测试名称
        testPersonName: '', // 配置人员姓名
        testDate: '',       // 配置日期
        kValue: '',         // 斜率
        bValue: '',         // 截距
        coefficient: '',    // 相关系数
        remark: '',         // 备注
        orderNum: '',       // 排序值
        curveType: '',      // 曲线类型
        kRange: '',         // 斜率范围
        bRange: '',         // 截距范围
        cRange: '',         // 相关系数范围
      };
    },
  },
};
</script>
