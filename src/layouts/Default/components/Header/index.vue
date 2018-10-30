<!-- 顶部导航 -->
<template>
  <header :class="{ 'is-extend': isCollapse }">
    <div class="g-headc clearfix">
      <div class="float-l">
        <h4 class="u-title">LIMS 实验室管理系统</h4>
      </div>
      <div class="float-r">
        <!-- 消息 -->
        <message />
        <!-- 全屏显示按钮 -->
        <el-tooltip effect="dark" placement="bottom-end" content="全屏" >
          <button @click="onFullScreen()" class="mar-r-sm">
            <i class="fas fa-expand"></i>
          </button>
        </el-tooltip>
        <!-- 用户设置 -->
        <user-setting />
      </div>
    </div>
    <!-- 标签栏 -->
    <tags-view class="g-tags" />
  </header>
</template>

<script>
import screenfull from 'screenfull';
import Message from './components/Message';
import UserSetting from './components/UserSetting';
import TagsView from './components/TagsView';

export default {
  components: {
    Message,
    UserSetting,
    TagsView,
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapseSide;
    },
  },
  methods: {
    onFullScreen() {
      if (!screenfull.enabled) { this.$message.warning('you browser can not work'); }
      screenfull.toggle();
    },
  },
};
</script>
