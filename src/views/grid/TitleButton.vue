<template>
  <el-row :gutter="10">
    <el-col :span="8">
      <el-card class="title-card">
        <template slot="header">
          <span class="el-card__title">点位信息</span>
          <el-dropdown
            size="small"
            class="el-card__headerbtn"
            trigger="click">
            <span class="el-dropdown-link">操作方案
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>简易方案</el-dropdown-item>
              <el-dropdown-item>复制方案</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <button
            type="button"
            class="el-card__headerbtn"
            :title="`${isCollapse ? '收起' : '展开'}`"
            @click="isCollapse = !isCollapse">
            <i :class="`fas fa-${isCollapse ? 'minus': 'plus'}`"></i>
          </button>
          <button type="button" class="el-card__headerbtn" title="刷新">
            <i class="fas fa-redo"></i>
          </button>
        </template>
        <el-tree
          ref="tree"
          show-checkbox
          :default-expand-all="true"
          :data="data"
          :render-content="renderContent"
          @node-click="onClickNode">
        </el-tree>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card class="title-card">
        <template slot="header">
          <span class="el-card__title">相关测试项目</span>
        </template>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TitleButton',
  data() {
    return {
      // 是否收起节点
      isCollapse: true,
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
      ],
    };
  },
  watch: {
    // 收缩节点
    isCollapse(val) {
      const { tree } = this.$refs;
      tree.$children.forEach((v) => {
        v.expanded = val;
      });
    },
  },
  methods: {
    // 单击节点事件
    onClickNode() {
      // console.log(data);
    },
    // 渲染节点
    renderContent(h, { node }) {
      return (
        <span class="el-tree__icon">
          <i class={`fas fa-${node.isLeaf ? 'file' : 'folder'}`} />
          <span>{node.label}</span>
        </span>
      );
    },
  },
};
</script>
