<template>
  <el-card class="BatchUpload">
    <el-button type="primary" size="small" @click="onClickAdd()">
      <i class="fa fa-cloud-upload" aria-hidden="true"></i> 上传附件
    </el-button>
    <!-- <el-button type="danger" size="small" @click="onDeleteItem()">
      <i class="fa fa-trash-o" aria-hidden="true"></i> 删除文档
    </el-button> -->
    <el-dialog
      title="文件上传"
      append-to-body
      :visible.sync="addDialogVisible"
      :close-on-click-modal="false">
      <el-upload
        class="one"
        ref="addFile"
        multiple
        action=""
        :before-upload="beforeUpload"
        :file-list="tempList"
        :auto-upload="false"
        :http-request="onCreateItem"
        :on-change="onFileChange"
        :on-remove="handleRemove">
        <el-button size="small">添加文件</el-button>
        <el-button slot="tip" size="small" style="margin-left: 10px;" @click="uploadAll">上传全部未开始上传文件</el-button>
        <el-button slot="tip" size="small" style="margin-left: 10px;" @click="EmptyList">清空列表</el-button>
        <span slot="tip" style="margin-left: 10px;">队列中文件个数：{{nums}}</span>
        <div slot="tip" style="margin: 10px;">只能上传不超过 10MB 大小的文件, 且每次上传不超过 100MB 大小</div>
      </el-upload>
        <el-table
        height="300"
        border
        stripe
        class="mar-t-sm"
        :data="tempList"
        @selection-change="onSaveSelected">
        <el-table-column label="序号" type="index" align="center" width="52"></el-table-column>
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column property="name" label="文件名"></el-table-column>
        <el-table-column property="fileType" label="类型"></el-table-column>
        <el-table-column property="size" label="大小"></el-table-column>
        <el-table-column property="status" label="状态"></el-table-column>
      </el-table>
      <!-- <div class="clearfix mar-t-sm">
        <div class="fr">
          <el-button :disabled="disabled" type="primary" size="small" @click="onClickUpload()">
            <i class="fa fa-cloud-upload" aria-hidden="true"></i> 上 传
          </el-button>
          <el-button size="small" @click="addDialogVisible = false">
            <i class="fa fa-times" aria-hidden="true"></i> 关 闭
          </el-button>
        </div>
      </div> -->
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'FileUpload',
  data() {
    return {
      disabled: false,
      count: 0,
      addDialogVisible: false,  // 添加附件弹框显示
      fileList: [],             // 附件列表
      tempList: [],             // 待上传附件列表
      formatData: {},           // 上传数据转化对象
      selectedIds: [],          // 已选择的附件ID
      id: '123435sfsf34edsfs',
      pager: {                  // 分页
        total: 0,
        page: 1,
        rows: 15,
      },
    };
  },
  computed: {
    nums() {
      return this.tempList.length;
    },
    // 文件大小数组
    filesSize() {
      return this.tempList.map(val => val.size / 1024 / 1024);
    },
    // 单个上传文件 true: 小于10MB, false: 文件大小超出
    isFileSize() {
      return this.filesSize.every(size => size < 10);
    },
    // 多个上传文件 true: 小于100MB, false: 总大小超出
    isFilesSize() {
      return this.filesSize.reduce((val, newVal) => val + newVal, 0) < 100;
    },
  },
  created() {
    // this.getItemList();
  },
  watch: {
    tempList() {
      this.tempList.forEach((element) => {
        this.$set(element, 'size', element.size);
        this.$set(element, 'fileType', element.raw.type);
      });
    },
    id() {
      this.getItemList();
    },
    count() {
      if (this.count === this.filesSize.length) {
        this.disabled = false;
        this.tempList = [];
        this.getItemList();
      }
    },
  },
  methods: {
    uploadAll() {   // 上传所有
      // console.log(this.tempList);
    },
    EmptyList() {
      if (this.tempList.length === 0) {
        this.$message('当前列表数据为空');
        return;
      }
      this.tempList = [];
    },
    // 保存选中项 id
    onSaveSelected(selection) {
      this.selectedIds = selection.map(val => val.rowGuid);
    },
    // 单击添加上传附件
    onClickAdd() {
      this.tempList = [];
      this.addDialogVisible = true;
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.tempList = fileList;
    },
    // 文件改变时
    onFileChange(file, fileList) {
      this.tempList = fileList;
    },
    // 单击触发上传请求
    onClickUpload() {
      // console.log(this.tempList);
      if (!this.tempList.length) {
        this.$message.info('请选择需要上传的附件');
      } else if (!this.isFileSize) {
        this.$message.info('单个文件大小不能超过10MB');
      } else if (!this.isFilesSize) {
        this.$message.info('上传文件总大小不能超过100MB');
      } else {
        this.count = 0;
        this.disabled = true;
        this.$refs.addFile.submit();
      }
    },
    // 获取附件列表
    getItemList() {
      const { page, rows } = this.pager;
      this.$http.get('res/document', {
        params: { page, rows, objectId: this.id },
      }).then((response) => {
        if (response.data.statusCode === 200) {
          this.fileList = response.data.rows;
        } else {
          this.$message.warning({
            message: response.data.msg,
            duration: 1500,
          });
        }
      }, ({ response }) => {
        this.$sys.resp(response);
      });
    },
    // 上传前的钩子 格式化
    beforeUpload(file) {
      this.formatData.param = new FormData();  // 创建form对象
      this.formatData.param.append('file', file, file.name);  // file对象是 beforeUpload参数
      this.formatData.config = {
        // headers: { 'Content-Type': 'multipart/form-data' },
        params: { objectId: this.id },
      };
    },
    // 上传附件
    onCreateItem() {
      this.$http.post('res/document/upload', this.formatData.param, this.formatData.config)
        .then((response) => {
          if (response.status === 200) {
            this.$message.success('上传成功');
          } else {
            this.$message.warning({
              message: response.data.message,
              duration: 1500,
            });
          }
          this.count++;
          this.addDialogVisible = false;
        }, ({ response }) => {
          this.count++;
          this.$sys.resp(response);
        });
    },
    // 删除附件
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
        this.$http.delete('res/document', { data: this.selectedIds })
      )).then((response) => {
        if (response.data >= 1) {
          this.$message.success({
            message: '删除成功',
            duration: 1500,
            showClose: true,
          });
          this.getItemList();
        } else {
          this.$message.warning({
            message: response.data.msg,
            duration: 1500,
          });
        }
      }, ({ response }) => {
        this.$sys.resp(response);
      });
    },
  },
};
</script>

<style>
  .one .el-upload-list{
    display: none;
  }
</style>


<style scoped>
  .clearfix{
    overflow: auto;
  }
  .fr{
    float: right;
    margin-top: 15px;
  }
  .BatchUpload{
  }
</style>
