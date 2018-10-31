<!-- 标准曲线 -->

<template>
  <div>
    <el-button type="primary" @click="onClickAdd()">
      <i class="fas fa-plus" aria-hidden="true"></i> 新 增
    </el-button>
    <el-button type="danger">
      <i class="fas fa-trash-alt" aria-hidden="true"></i> 删 除
    </el-button>
    <el-button type="primary">
      <i class="fas fa-cog" aria-hidden="true"></i> 配置有效位数
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
    <paging-query :pager="pager" @query="getItemList()"/>
    <el-dialog
      title="标准曲线详情"
      append-to-body
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="closeDialog">
      <el-form
        ref="form"
        label-position="right"
        label-width="111px"
        v-loading="formLoading">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="斜率范围：">
              <el-input v-model="itemModel.kRange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截距范围：">
              <el-input v-model="itemModel.bRange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="相关系数范围：">
              <el-input v-model="itemModel.cRange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="相关系数：">
              <el-input v-model="itemModel.coefficient"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="配置日期：">
              <el-date-picker
                v-model="itemModel.testDate"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="曲线零点：">
              <el-input v-model="itemModel.curveZero"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="斜率：">
              <el-input v-model="itemModel.kValue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="截距：">
              <el-input v-model="itemModel.bValue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="曲线类型：">
              <el-radio v-model="itemModel.curveType" label="1">直线</el-radio>
              <el-radio v-model="itemModel.curveType" label="2">Log</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型：">
              <el-select v-model="itemModel.type">
                <el-option v-for="(item, key) in $enum.curveType" :key="key" :label="item" :value="key - 0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <hr class="dashed">
      <el-tabs>
        <el-tab-pane label="数据列表">
          <el-table border stripe :data="curveList" @selection-change="changeSelectedCurve">
            <el-table-column align="center" type="selection" width="35"></el-table-column>
            <el-table-column property="xValue" label="X值"></el-table-column>
            <el-table-column property="yValue" label="Y值"></el-table-column>
            <el-table-column v-if="itemModel.type === 2" property="aValueTTZ" label="220吸光度"></el-table-column>
            <el-table-column v-if="itemModel.type === 2" property="aValueTSF" label="275吸光度"></el-table-column>
            <el-table-column v-if="itemModel.type === 3" property="lessBlank" label="减空白吸光度"></el-table-column>
            <el-table-column v-if="itemModel.type === 4" property="aValueBG" label="背景吸光度"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="数据曲线">数据曲线</el-tab-pane>
      </el-tabs>
      <div slot="footer">
        <el-button type="primary">
          <i class="fas fa-calculator" aria-hidden="true"></i> 计 算
        </el-button>
        <el-button type="primary">
          <i class="fas fa-save" aria-hidden="true"></i> 保 存
        </el-button>
        <el-button @click="closeDialog()">
          <i class="fas fa-times" aria-hidden="true"></i> 关 闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PagingQuery from '@/components/PagingQuery';

export default {
  components: {
    PagingQuery,
  },
  props: ['rowId'],
  data() {
    return {
      loading: false,          // 表格数据加载状态
      formLoading: false,      // 编辑表单加载状态
      dialogVisible: false,    // 表单弹框显示状态
      itemModel: {},           // 编辑表单绑定变量
      curveModel: {},          // 编辑表格曲线
      itemList: [],            // 数据项列表
      curveList: [],           // 数据项列表(曲线)
      selectedIds: [],         // 已选择的数据 id
      selectedCurveIds: [],    // 以选择的曲线项 id
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
    },
    // 改变选择项
    changeSelected(selection) {
      this.selectedIds = selection.map(val => val.id);
    },
    changeSelectedCurve(selection) {
      this.selectedCurveIds = selection.map(val => val.id);
    },
    onClickAdd() {
      this.itemModel = this.getEmpeyItem();
      this.dialogVisible = true;
    },
    onClickEdit() {
      this.getItemOne();
      this.dialogVisible = true;
    },
    // 获取空项记录
    getEmpeyItem() {
      return {
        testId: '',          // 测试标识
        testName: '',        // 测试名称
        testPersonName: '',  // 配置人员姓名
        testDate: '',        // 配置日期
        kValue: '',          // 斜率
        bValue: '',          // 截距
        coefficient: '',     // 相关系数
        remark: '',          // 备注
        orderNum: '',        // 排序值
        curveType: '1',      // 曲线类型
        kRange: '',          // 斜率范围
        bRange: '',          // 截距范围
        cRange: '',          // 相关系数范围
        curveZero: 0,        // 曲线零点
        type: 1,             // 类型
      };
    },
    // 获取空项曲线记录
    getEmpeyCurve() {
      return {
        standardCurveId: '',  // 标准曲线ID
        hValue: '',           // H值
        xValue: '',           // X值
        yValue: '',           // Y值
        aValueTTZ: '',        // 220吸光度
        aValueTSF: '',        // 275吸光度
        lessBlank: '',        // 减空白吸光度
        aValueBG: '',         // 背景吸光度
        orderNum: 0,          // 排序值
        remark: '',           // 备注
      };
    },
    getItemOne() {
      this.formLoading = true;
      this.$http.get(`api/test/${this.rowId}`).then((response) => {
        if (response.status === 200) {
          this.itemModel = Object.assign(this.getEmptyItem(), response.data);
        } else {
          this.$message.warning({
            message: response.body.message,
            duration: 1500,
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      }).finally(() => {
        this.formLoading = false;
      });
    },
    // rowId
    getItemList() {
      this.loading = true;
      const { page, rows } = this.pager;
      this.$http.get('api/standardCurve', {
        params: { page, rows, testId: this.rowId },
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
  },
};
</script>
