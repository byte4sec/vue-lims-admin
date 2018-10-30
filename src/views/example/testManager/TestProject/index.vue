<template>
  <el-card full>
  <!-- 查询表单 -->
    <div slot="header">
      <el-form inline :model="queryForm">
        <el-form-item label="样品类型：">
          <el-select v-model="queryForm.sampleType" clearable filterable style="width: 175px" >
            <el-option v-for="(item, key) in $enum.sampleType" :key="key" :label="item" :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键字：">
          <el-input v-model="queryForm.key" style="width: 290px" placeholder="分析项目名称、分析方法名称、国家标准、年份"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQueryList()">
            <i class="fas fa-search" aria-hidden="true"></i> 查 询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-button type="primary" @click="onClickAdd()">
      <i class="fas fa-plus" aria-hidden="true"></i> 新 增
    </el-button>
    <el-button type="danger" @click="onDeleteItem()" :disabled="!selectedIds.length">
      <i class="fas fa-trash-alt" aria-hidden="true"></i> 删 除
    </el-button>

  <!-- 记录列表 -->
    <el-table
      class="mar-t-sm"
      border
      stripe
      full
      v-loading="loading"
      :data="itemList"
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
      <el-table-column property="redAnalyzeItemName" label="分析项目" show-overflow-tooltip></el-table-column>
      <el-table-column property="redAnalyzeMethodName" label="分析方法" show-overflow-tooltip></el-table-column>
      <el-table-column property="redCountryStandard" label="国家标准" show-overflow-tooltip></el-table-column>
      <el-table-column property="redYearSn" label="年度" show-overflow-tooltip></el-table-column>
      <el-table-column property="sampleType" label="样品类型" show-overflow-tooltip></el-table-column>
      <el-table-column property="dimensionId" label="单位" show-overflow-tooltip></el-table-column>
      <el-table-column label="是否分包">
        <template slot-scope="scope">{{ scope.row.isOutsourcing ? '是' : '否' }}</template>
      </el-table-column>
      <el-table-column label="是否现场">
        <template slot-scope="scope">{{ scope.row.isCompleteField ? '是' : '否' }}</template>
      </el-table-column>
    </el-table>

  <!-- 分页 -->
    <paging-query :pager="pager" @query="getItemList()"/>

  <!-- 弹框表单 -->
    <el-dialog
      title="测试项目信息"
      width="80%"
      full
      custom-class="dialog-min-width"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="closeDialog">
      <template>
        <el-tabs v-if="dialogVisible" v-model="activeTab">
          <el-tab-pane label="基本信息" name="BasicInfo">
            <basic-info v-model="id" @close="closeDialog" @query="getItemList" />
          </el-tab-pane>
          <el-tab-pane label="人员管理" lazy name="PeopleManages" :disabled="!id">
            <people-manages :rowId="id" />
          </el-tab-pane>
          <el-tab-pane label="标准曲线" lazy name="StandardCurve" :disabled="!id">
            <standard-curve :rowId="id" />
          </el-tab-pane>
          <el-tab-pane label="参数配置" lazy name="ParamConfig" :disabled="!id">
            <param-config :rowId="id" />
          </el-tab-pane>
          <el-tab-pane label="使用仪器" lazy name="UseInstrument" :disabled="!id">
            <use-instrument :rowId="id" />
          </el-tab-pane>
          <el-tab-pane label="测试扩展" lazy name="TextExtend" :disabled="!id">
            <text-extend :rowId="id" />
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
import PagingQuery from '@/components/PagingQuery';

import BasicInfo from './components/BasicInfo';
import PeopleManages from './components/PeopleManages';
import StandardCurve from './components/StandardCurve';
import ParamConfig from './components/ParamConfig';
import UseInstrument from './components/UseInstrument';
import TextExtend from './components/TextExtend';

export default {
  name: 'TestProject',
  components: {
    PagingQuery,
    BasicInfo,
    PeopleManages,
    StandardCurve,
    ParamConfig,
    UseInstrument,
    TextExtend,
  },
  data() {
    return {
      activeTab: 'BasicInfo',
      loading: false,          // 表格数据加载状态
      dialogVisible: false,    // 表单弹框显示状态
      id: '',                  // 操作记录的 RowGuid
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
  created() {
    this.getItemList();
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
      this.activeTab = 'BasicInfo';
      this.id = '';
    },
    onQueryList() {
      this.pager.page = 1;
      this.getItemList();
    },
    // 单击新增记录
    onClickAdd() {
      this.dialogVisible = true;
    },
    // 单击编辑记录
    onClickEdit(row) {
      this.id = row.id;
      this.dialogVisible = true;
    },
    // 改变选择项
    changeSelected(selection) {
      this.selectedIds = selection.map(val => val.id);
    },
    // 获取记录列表
    getItemList() {
      this.loading = true;
      const { page, rows } = this.pager;
      this.$http.get('api/test', {
        params: { page, rows, ...this.queryForm },
      }).then((response) => {
        if (response.status === 200) {
          this.itemList = response.data.rows;
          this.pager.total = response.data.total;
        } else {
          this.$message.warning({
            message: response.body.message,
            duration: 1500,
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      }).finally(() => {
        this.loading = false;
      });
    },
    // 删除记录
    onDeleteItem() {
      if (this.selectedIds.length === 0) {
        this.$message('请选择需要删除的数据');
        return;
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => (
        this.$http.delete('api/test', { data: this.selectedIds })
      )).then((response) => {
        if (response.status === 200) {
          this.$message.success({
            message: '删除成功',
            duration: 1500,
            showClose: true,
          });
          this.getItemList();
        } else {
          this.$message.warning({
            message: response.data.message,
            duration: 1500,
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      });
    },
  },
};
</script>

<style lang="scss">
  .dialog-min-width {
    min-width: 645px;
  }
</style>

