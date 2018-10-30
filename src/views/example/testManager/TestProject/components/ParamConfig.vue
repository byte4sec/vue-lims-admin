<!-- 参数设置 -->

<template>
  <div>
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
      <el-table-column property="redAnalyzeItemName" label="参数名称" show-overflow-tooltip></el-table-column>
      <el-table-column property="redAnalyzeMethodName" label="别名" show-overflow-tooltip></el-table-column>
      <el-table-column property="redCountryStandard" label="默认值" show-overflow-tooltip></el-table-column>
      <el-table-column property="redYearSn" label="计量单位" show-overflow-tooltip></el-table-column>
      <el-table-column property="sampleType" label="是否必填" show-overflow-tooltip></el-table-column>
      <el-table-column property="sampleType" label="排序值" show-overflow-tooltip></el-table-column>
    </el-table>
    <el-card class="title-card mar-t-sm">
      <template slot="header">分析方法参数配置</template>
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
        <el-table-column property="paramsId" label="参数名称" show-overflow-tooltip></el-table-column>
        <el-table-column property="alias" label="别名" show-overflow-tooltip></el-table-column>
        <el-table-column property="defaultValue" label="默认值" show-overflow-tooltip></el-table-column>
        <el-table-column property="dimension" label="计量单位" show-overflow-tooltip></el-table-column>
        <el-table-column property="isRequired" label="是否必填" show-overflow-tooltip></el-table-column>
        <el-table-column property="orderNum" label="排序值" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-card>
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
  },
};
</script>
