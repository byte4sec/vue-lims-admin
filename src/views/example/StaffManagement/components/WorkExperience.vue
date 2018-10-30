<template>
  <div>
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
      v-loading="loading"
      :data="itemList"
      @selection-change="onSaveSelected">
      <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column align="center" label="操作" width="55">
        <template slot-scope="scope">
          <el-button type="primary" title="编辑" @click="onClickEdit(scope.row)">
            <i class="fas fa-pencil-alt" aria-hidden="true"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column property="beginDate" label="开始时间"></el-table-column>
      <el-table-column property="endDate" label="结束时间"></el-table-column>
      <el-table-column property="content" label="工作内容" show-overflow-tooltip></el-table-column>
      <el-table-column property="detail" label="详细经历" show-overflow-tooltip></el-table-column>
      <el-table-column property="technology" label="资格证书" show-overflow-tooltip></el-table-column>
    </el-table>
  <!-- 分页 -->
    <paging-query :pager="pager" @query="getItemList"/>
    <el-dialog
      width="60%"
      :title="`${isEdit ? '编辑' : '新增'}工作经历`"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
      @close="onCloseDialog">
      <el-form
        ref="form"
        class="mar-t-sm"
        label-position="right"
        label-width="85px"
        v-loading="formLoading"
        :model="itemModel">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="开始时间：">
              <el-date-picker
                v-model="itemModel.beginDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间：">
              <el-date-picker
                v-model="itemModel.endDate"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="工作内容：">
              <el-input v-model="itemModel.content" type="textarea" :rows="2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细经历：">
              <el-input v-model="itemModel.detail" type="textarea" :rows="2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="资格证书：">
              <el-input v-model="itemModel.technology" type="textarea" :rows="2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
      isEdit: false,
      loading: false,          // 表格数据加载状态
      formLoading: false,
      dialogVisible: false,    // 表单弹框显示状态
      formStatus: false,       // 表单是否禁用
      itemModel: {},           // 编辑表单绑定变量
      itemList: [],            // 数据项列表
      selectedIds: [],         // 已选择的数据 id 数组
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
      this.itemModel = this.getEmptyItem();
      this.dialogVisible = true;
    },
    // 单击编辑回调
    onClickEdit() {
      this.getItemOne();
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
    getItemOne() {
      this.formLoading = true;
      this.$http.get(`api/personWorkResume/${this.rowId}`).then((response) => {
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
    // 获取数据列表
    getItemList() {
      this.loading = true;
      const { page, rows } = this.pager;
      this.$http.get('api/personWorkResume', {
        params: { page, rows, personId: this.rowId },
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
        this.loading = false;
      }, ({ response }) => {
        this.loading = false;
        this.$hp.resp(response);
      });
    },
    // 保存数据项
    onSaveItem() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.formStatus = true;
        const { id } = this.itemModel;
        this.$http[id ? 'put' : 'post']('api/personWorkResume', this.itemModel)
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
        this.$http.delete('api/personWorkResume/0', { data: this.selectedIds })
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
    // 获取表单数据(空值)
    getEmptyItem() {
      return {
        personId: this.rowId,
        beginDate: '',
        endDate: '',
        content: '',
        detail: '',
        technology: '',
      };
    },
  },
};
</script>
