<!-- 富文本编辑器 -->

<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card class="title-card">
        <template slot="header">富文本编辑器</template>
        <editor-tinymce v-model="itemModel"/>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="title-card">
        <template slot="header">预览</template>
        <div v-html="randerContent"></div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import EditorTinymce from '@/components/EditorTinymce';

export default {
  name: 'Editor',
  components: {
    EditorTinymce,
  },
  computed: {
    randerContent() {
      return this.itemModel;
    },
  },
  data() {
    return {
      itemModel: '',
    };
  },
};
</script>
