<template>
  <el-dialog
    fullscreen
    title="人员信息"
    class="pad-t-0"
    :visible.sync="dialogVisible"
    :close="closeDialog">
    <el-tabs v-if="isEdit" v-model="activeName" @tab-click="onClickTab">
      <el-tab-pane label="基本信息" name="BasicInfo">
        <basic-info ref="basicInfo" @close="closeDialog"/>
      </el-tab-pane>
      <el-tab-pane label="工作经历" name="WorkExperience">
        <work-experience ref="workExperience" />
      </el-tab-pane>
    </el-tabs>
    <el-card v-else>
      <basic-info @close="closeDialog"/>
    </el-card>
  </el-dialog>
</template>

<script>
import BasicInfo from './BasicInfo';
import WorkExperience from './WorkExperience';

export default {
  components: {
    BasicInfo,
    WorkExperience,
  },
  data() {
    return {
      dialogVisible: false,
      activeName: 'BasicInfo',
      isEdit: '',
    };
  },
  methods: {
    openDialog(row) {
      this.isEdit = row && row.id;
      this.activeName = 'BasicInfo';
      this.$nextTick(() => {
        if (this.isEdit) {
          Object.assign(this.$refs.basicInfo.itemModel, row);
          this.$refs.workExperience.personId = row.id;
        }
      });
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
      this.$refs.workExperience.personId = '';
      this.$emit('change');
    },
    onClickTab(val) {
      if (val.name === 'WorkExperience') {
        this.$refs.workExperience.getItemList();
      }
    },
  },
};
</script>
