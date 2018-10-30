<template>
  <div>
    <el-button @click="dialogVisible = true">
      <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i> 上传图片
    </el-button>
    <el-dialog title="图片上传" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-upload
        class=".editor-image-upload"
        action="https://httpbin.org/post"
        list-type="picture-card"
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload">
        <el-button type="text">选择图片</el-button>
      </el-upload>
      <div slot="footer" class="text-right">
        <el-button type="primary" @click="handleSubmit">
          <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i> 上传
        </el-button>
        <el-button @click="dialogVisible = false">
          <i class="fas fa-times" aria-hidden="true"></i> 关 闭
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  props: {
    color: {
      type: String,
      default: '#1890ff',
    },
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
    };
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess);
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v]);
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！');
        return;
      }
      this.$emit('successCBK', arr);
      this.listObj = {};
      this.fileList = [];
      this.dialogVisible = false;
    },
    handleSuccess(response, file) {
      const { uid } = file;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file;
          this.listObj[objKeyArr[i]].hasSuccess = true;
          return;
        }
      }
    },
    handleRemove(file) {
      const { uid } = file;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]];
          return;
        }
      }
    },
    beforeUpload(file) {
      const me = this;
      const URL = window.URL || window.webkitURL;
      const fileName = file.uid;
      this.listObj[fileName] = {};
      return new Promise((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          me.listObj[fileName] = {
            hasSuccess: false, uid: file.uid, width: this.width, height: this.height,
          };
        };
        resolve(true);
      });
    },
  },
};
</script>
