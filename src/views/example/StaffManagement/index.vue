<template>
  <el-card>
  <!-- 查询表单 -->
    <template slot="header">
      <el-form inline :model="queryForm">
        <el-form-item label="姓名：">
          <el-input v-model="queryForm.cName"></el-input>
        </el-form-item>
        <el-form-item label="编号：">
          <el-input v-model="queryForm.userNo"></el-input>
        </el-form-item>
        <el-form-item label="办公室：">
          <select-tree v-model="queryForm.domainId" :options="domainIdList" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQueryList()">
            <i class="fas fa-search" aria-hidden="true"></i> 查 询
          </el-button>
        </el-form-item>
      </el-form>
    </template>
  <!-- 因子列表 -->
    <el-button type="primary" @click="onClickAdd()">
      <i class="fas fa-plus" aria-hidden="true"></i> 新 增
    </el-button>
    <el-button type="danger" @click="onDeleteItem()">
      <i class="fas fa-trash-alt" aria-hidden="true"></i> 删 除
    </el-button>
    <el-table
      class="mar-t-sm"
      border
      stripe
      full
      :data="itemList"
      :loading="loading"
      @selection-change="onSaveSelected">
      <el-table-column align="center" type="index" width="50"></el-table-column>
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column align="center" label="操作" width="55">
        <template slot-scope="scope">
          <el-button type="primary" size="small" title="编辑" @click="onClickEdit(scope.row)">
            <i class="fas fa-pencil-alt" aria-hidden="true"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column property="cName" label="姓名"></el-table-column>
      <el-table-column property="userNO" label="编号" show-overflow-tooltip></el-table-column>
      <el-table-column property="domainId" label="办公室" show-overflow-tooltip></el-table-column>
      <el-table-column property="quarters" label="职务" show-overflow-tooltip></el-table-column>
      <el-table-column property="sex" label="性别"></el-table-column>
      <el-table-column property="mobile" label="手机" show-overflow-tooltip></el-table-column>
    </el-table>
  <!-- 分页 -->
    <paging-query :pager="pager" @query="getItemList"/>
    <el-dialog
      fullscreen
      title="人员信息"
      class="pad-t-0"
      :visible.sync="dialogVisible"
      @close="closeDialog">
      <template>
        <el-tabs v-if="dialogVisible" v-model="activeTab">
          <el-tab-pane label="基本信息" name="BasicInfo">
            <basic-info v-model="id" @close="closeDialog" @query="getItemList" />
          </el-tab-pane>
          <el-tab-pane label="工作经历" lazy name="WorkExperience" :disabled="!id">
            <work-experience :rowId="id" />
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
import SelectTree from '@/components/SelectTree';
import PagingQuery from '@/components/PagingQuery';

import BasicInfo from './components/BasicInfo';
import WorkExperience from './components/WorkExperience';

export default {
  name: 'StaffManagement',
  components: {
    SelectTree,
    PagingQuery,
    BasicInfo,
    WorkExperience,
  },
  data() {
    return {
      activeTab: 'BasicInfo',
      loading: false,          // 表格数据加载状态
      dialogVisible: false,    // 表单弹框显示状态
      id: '',                  // 操作记录的 RowGuid
      itemList: [],            // 数据项列表
      domainIdList: [],
      selectedIds: [],         // 已选择的数据 id 数组
      queryForm: {             // 查询表单绑定变量
        cName: '',               // 姓名
        userNo: '',              // 编号
        domainId: '',            // 办公室
      },
      pager: {
        page: 1,
        rows: 13,
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
    // 保存选中项 id
    onSaveSelected(selection) {
      this.selectedIds = selection.map(val => val.id);
    },
    // 单击查询数据项
    onQueryList() {
      this.pager.page = 1;
      this.getItemList();
    },
    // 单击新增回调
    onClickAdd() {
      this.dialogVisible = true;
    },
    // 单击编辑回调
    onClickEdit(row) {
      this.id = row.id;
      this.dialogVisible = true;
    },
    // 获取数据列表
    getItemList() {
      this.loading = true;
      const { page, rows } = this.pager;
      this.$http.get('api/person', {
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
      })
        .finally(() => {
          this.loading = false;
        });
    },
    // 删除数据项
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
        this.$http.delete('api/person/0', { data: this.selectedIds })
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
