<!-- 富文本编辑器 -->

<template>
  <div class="editor-tinymce">
    <editor id="tinymce" v-model="tinymceModel" :init="initEditor"></editor>
    <div class="editor-image-box">
      <editor-image color="#1890ff" class="editor-image" @successCBK="uploadImage"/>
    </div>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/table';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/preview';
import Editor from '@tinymce/tinymce-vue';
import { plugins, toolbar } from './config';
import EditorImage from './components/editorImage';

export default {
  components: {
    Editor,
    EditorImage,
  },
  model: {
    prop: 'itemModel',
    event: 'setModel',
  },
  props: {
    itemModel: String,
  },
  watch: {
    tinymceModel() {
      // 触发事件改变父组件绑定的 v-model 值
      this.$emit('setModel', this.tinymceModel);
    },
  },
  data() {
    return {
      tinymceModel: '',
      // 初始化配置项
      initEditor: {
        language_url: '/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/lightgray',
        height: 300,
        branding: false,
        plugins,
        toolbar,
      },
    };
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    uploadImage(arr) {
      const me = this;
      arr.forEach((v) => {
        window.tinymce.get(me.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`);
      });
    },
  },
};
</script>
