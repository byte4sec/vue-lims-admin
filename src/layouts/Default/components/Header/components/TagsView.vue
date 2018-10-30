<!-- 标签栏导航 -->
<template>
  <div>
    <i class="fas fa-angle-double-left" @click="scollOffset = 0"></i>
    <i class="fas fa-angle-double-right" @click="scollOffset = scollOffsetRight"></i>
    <i class="fas fa-home" :class="{ 'is-active': isActive({path: '/index' }) }"  @click="$router.push('/')"></i>
    <div class="g-tagsc" ref="tagsc">
      <ul class="m-scoll" :style="{ left: `-${scollOffset}px` }">
        <router-link
          ref="tag"
          tag="li"
          v-for="tag in visitedViews"
          :key="tag.path"
          :to="tag.fullPath"
          :class="isActive(tag)?'is-active':''"
          @click.middle.native="closeSelectedTag(tag)"
          @contextmenu.prevent.native="openMenu(tag, $event)">{{ tag.title }}
          <i class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></i>
        </router-link>
      </ul>
    </div>
    <context-menu ref="contextMenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li @click="closeSelectedTag(selectedTag)">关闭当前</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭全部</li>
    </context-menu>
  </div>
</template>

<script>
import ContextMenu from '@/components/ContextMenu';

export default {
  components: {
    ContextMenu,
  },
  data() {
    return {
      selectedTag: {},
      scollOffset: 0,
      scollOffsetRight: 0,
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
  },
  watch: {
    $route() {
      this.addViewTags();
      this.moveToCurrentTag();
    },
    visitedViews() {
      // 监测实时偏移量
      this.$nextTick(() => {
        this.onChangeScoll();
      });
    },
  },
  mounted() {
    this.addViewTags();
  },
  methods: {
    // 初始化偏移量
    onInitOffset() {
      this.scollOffset = 0;
      this.scollOffsetRight = 0;
    },
    // 最大偏移量
    onChangeScoll() {
      const scollWidth = this.$refs.tagsc.getBoundingClientRect().width;
      const scollNodes = [];
      const childNodes = Array.prototype.slice.call(this.$refs.tagsc.childNodes);
      childNodes.forEach((el) => {
        scollNodes.push(el.getBoundingClientRect().width);
      });
      if (!scollNodes.length) {
        this.onInitOffset();
        return;
      }
      const scollNodesWidth = Math.floor(scollNodes.reduce((oldVal, val) => oldVal + val));
      if (scollNodesWidth > scollWidth) {
        this.scollOffset = scollNodesWidth - scollWidth + 5;
        this.scollOffsetRight = this.scollOffset + scollWidth * 0.4;
      } else {
        this.scollOffsetRight = 0;
      }
    },
    isActive(route) {
      return route.path === this.$route.path;
    },
    addViewTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route);
      }
      return false;
    },
    moveToCurrentTag() {
      this.$nextTick(() => {
        const me = this.$refs.tag.find(v => v.to.path === this.$route.path);
        if (me) {
          if (me.to.fullPath !== this.$route.fullPath) {
            this.$store.dispatch('tagsView/updateVisitedView', this.$route);
          }
        }
      });
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/removeCachedView', view).then(() => {
        this.$nextTick(() => {
          this.$router.replace({ name: view.name });
        });
      });
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/removeView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          const latestView = visitedViews.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView);
          } else {
            this.$router.push('/');
          }
        }
      });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store.dispatch('tagsView/removeOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag();
        this.onInitOffset();
      });
    },
    closeAllTags() {
      this.$store.dispatch('tagsView/removeAllViews');
      this.onInitOffset();
      this.$router.push('/');
    },
    openMenu(tag, e) {
      this.$refs.contextMenu.openMenu(e);
      this.selectedTag = tag;
    },
  },
};
</script>
