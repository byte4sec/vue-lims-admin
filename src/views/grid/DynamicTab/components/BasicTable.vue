<template>
  <el-card>
  <!-- 查询表单 -->
    <div slot="header">
      <el-form inline :model="queryForm">
        <el-form-item label="名称：">
          <el-input v-model="queryForm.movieName"></el-input>
        </el-form-item>
        <el-form-item label="类别：">
          <el-select v-model="queryForm.movieType">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item, key) in $enum.movieType" :key="key" :label="item" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQueryList()">
            <i class="fas fa-search" aria-hidden="true"></i> 查 询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
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
      <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column align="center" label="操作" width="55">
        <template slot-scope="scope">
          <el-button type="primary" size="small" title="编辑" @click="onClickEdit(scope.row)">
            <i class="fas fa-pencil-alt" aria-hidden="true"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          <el-button @click="setDync(scope.row)" type="text">{{ scope.row.movieName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="规格">
        <template slot-scope="scope">
          {{ $enum.movieType[scope.row.movieType] }}
        </template>
      </el-table-column>
      <el-table-column property="movieDate" label="等级"></el-table-column>
      <el-table-column property="durationTime" label="库存"></el-table-column>
      <el-table-column property="durationTime" label="类别"></el-table-column>
    </el-table>
  <!-- 分页 -->
    <paging-query :pager="pager" @query="getItemList"/>
  <!-- 弹框表单 -->
    <el-dialog
      width="60%"
      :title="`${isEdit ? '编辑' : '新增'}电影信息`"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      @close="onCloseDialog">
      <el-form
        ref="form"
        label-position="right"
        label-width="93px"
        :model="itemModel">
        <el-form-item label="电影名称：">
          <el-input v-model="itemModel.movieName" size="small" :disabled="formStatus"></el-input>
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="itemModel.movieType" size="small" :disabled="formStatus" style="width: 100%">
            <el-option v-for="(item, key) in $enum.movieType" :key="key" :label="item" :value="key - 0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上映日期：">
          <el-input v-model="itemModel.movieDate" size="small" :disabled="formStatus"></el-input>
        </el-form-item>
        <el-form-item label="时长：">
          <el-input v-model="itemModel.durationTime" size="small" :disabled="formStatus"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" :loading="formStatus" @click="onSaveItem()">
          <i class="fas fa-save" aria-hidden="true"></i>{{ ` 保 存${formStatus ? '中' : ''}` }}
        </el-button>
        <el-button size="small" @click="dialogVisible = false">
          <i class="fas fa-times" aria-hidden="true"></i> 关 闭
        </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import PagingQuery from '@/components/PagingQuery';

export default {
  components: {
    PagingQuery,
  },
  data() {
    return {
      loading: false,          // 表格数据加载状态
      dialogVisible: false,    // 表单弹框显示状态
      formStatus: false,       // 表单是否禁用
      itemModel: {},           // 编辑表单绑定变量
      itemList: [],            // 数据项列表
      selectedIds: [],         // 已选择的数据 id 数组
      queryForm: {             // 查询表单绑定变量
        movieName: '',           // 电影名称
        movieType: '',           // 类型
      },
      pager: {
        page: 1,
        rows: 5,
        total: 0,
      },
    };
  },
  computed: {
    // 含有id, 视为编辑状态，否则为新增状态，
    isEdit() {
      return this.itemModel && this.itemModel.id;
    },
  },
  created() {
    this.getItemList();
  },
  methods: {
    // 保存选中项 id
    onSaveSelected(selection) {
      this.selectedIds = selection.map(val => val.id);
    },
    // 单击查询数据项
    onQueryList() {
      this.pager.page = 1;
      this.getItemList();
    },
    // 获取表单数据(空值)
    getEmptyItem() {
      return {
        id: '',
        movieName: '',
        movieType: '',
        movieDate: '',
        durationTime: '',
      };
    },
    // 单击新增回调
    onClickAdd() {
      this.dialogVisible = true;
    },
    // 单击编辑回调
    onClickEdit(row) {
      this.itemModel = { ...row };
      this.dialogVisible = true;
    },
    onClickSetting() {
      this.$refs.selectPane.openDialog();
    },
    // 编辑表单弹框关闭回调
    onCloseDialog() {
      this.formStatus = false;
      this.itemModel = this.getEmptyItem();
      this.$refs.form.resetFields();
    },
    setDync(row) {
      this.$emit('setField', row);
    },
    // 获取数据列表
    getItemList() {
      this.loading = true;
      const { page, rows } = this.pager;
      this.$http.get('queryMovie', {
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
    // 保存数据项
    onSaveItem() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.formStatus = true;
        const { id } = this.itemModel;
        this.$http[id ? 'put' : 'post'](id ? 'updateMovie' : 'addMovie', this.itemModel)
          .then((response) => {
            if (response.status === 200) {
              this.$message.success({
                message: `${id ? '修改' : '新增'}成功`,
                duration: 1500,
                showClose: true,
              });
              this.dialogVisible = false;
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
        this.$http.delete('deleteMovie', { data: this.selectedIds })
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
