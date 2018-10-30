<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card class="title-card">
        <div slot="header">
          <span>切换页面，进行未保存提示</span>
        </div>
        <el-form ref="form" inline :model="formModel" label-width="80px">
          <el-form-item label="活动名称">
            <el-input v-model="formModel.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formModel.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="formModel.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="title-card">
        <template slot="header">切换选项卡，进行未保存提示</template>
        <el-tabs v-model="activeName" :before-leave="beforeToggleTabs">
          <el-tab-pane label="用户管理" name="first">
            <el-form ref="form" inline :model="formModel" label-width="80px">
              <el-form-item label="活动名称">
                <el-input v-model="formModel.name"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select v-model="formModel.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动性质">
                <el-checkbox-group v-model="formModel.type">
                  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                  <el-checkbox label="地推活动" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button>取消</el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TabSwitchHint',
  data() {
    return {
      formModel: {
        name: '',
        region: '',
        type: [],
      },
      activeName: 'first',
      once: true,
    };
  },
  watch: {
    formModel: {
      handler() {
        if (this.once) {
          this.once = false;
          // 当表单绑定对象发送改变时添加离开页面的提示
          this.$store.commit('AddIsSaveTags', this.$route.name);
        }
      },
      deep: true,
    },
  },
  methods: {
    onSubmit() {
      this.once = true;
      this.$message.success('保存成功');
      // 保存后移除提示
      this.$store.commit('RemoveIsSaveTags', this.$route.name);
    },
    beforeToggleTabs(val, oldVal) {
      return oldVal === 'first' ? this.$confirm('未保存数据, 离开当前选项卡会丢失未保存数据, 是否离开?', '提示')
        .then(() => true)
        .catch(() => false) : true;
    },
  },
};
</script>
