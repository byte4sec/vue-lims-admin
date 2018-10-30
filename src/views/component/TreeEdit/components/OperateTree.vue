<template>
  <el-card class="title-card">
    <template slot="header">
      <span class="el-card__title">{{ title }}</span>
      <button class="el-card__headerbtn" style="right: 70px">确认方案</button>
      <button
        class="el-card__headerbtn"
        :title="`${isCollapse ? '收起' : '展开'}`"
        @click="isCollapse = !isCollapse">
        <i :class="`fas fa-${isCollapse ? 'minus': 'plus'}`"></i>
      </button>
      <button type="button" class="el-card__headerbtn" title="刷新" @click="getItemList">
        <i class="fas fa-redo"></i>
      </button>
    </template>
    <el-input v-model="queryString" placeholder="输入关键字进行过滤" class="mar-b-sm"></el-input>
    <el-tree
      ref="tree"
      v-loading="loading"
      show-checkbox
      :default-expand-all="true"
      :expand-on-click-node="false"
      :data="itemList"
      :render-content="renderContent"
      :filter-node-method="filterNode"
      node-key="rowGuid"
      @node-click="onClickNode"
      @node-contextmenu="onContextmenuNode">
    </el-tree>
    <el-dialog
      title="编辑节点"
      :visible.sync="dialogVisibleForm"
      :close-on-click-modal="false">
      <el-form :model="itemModel" label-width="75px">
        <el-form-item label="标签名：">
          <el-input v-model="itemModel.label"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleForm = false">取 消</el-button>
        <el-button type="primary" @click="onSaveItem">确 定</el-button>
      </div>
    </el-dialog>
    <context-menu ref="contextMenu">
      <li @click="onAddNode"><i class="fas fa-plus"></i><span>新增节点</span></li>
      <li @click="onEditNode"><i class="fas fa-pencil-alt"></i><span>修改节点</span></li>
      <li @click="onCopyNode"><i class="fas fa-copy"></i><span>复制节点</span></li>
      <li @click="onRemoveNode"><i class="fas fa-trash-alt"></i><span>删除节点</span></li>
    </context-menu>
  </el-card>
</template>

<script>
import ContextMenu from '@/components/ContextMenu';

export default {
  components: {
    ContextMenu,
  },
  props: {
    // 标题
    title: {
      type: String,
      required: false,
      default: '',
    },
    // 选项数据
    action: {
      type: String,
      required: true,
    },
    // 树节点配置选项
    props: {
      type: Object,
      required: false,
      default: () => ({
        parent: 'parentId',
        value: 'rowGuid',
        label: 'areaName',
        children: 'children',
      }),
    },
  },
  data() {
    return {
      loading: false,
      top: 0,
      left: 0,
      // 是否收起节点
      isCollapse: true,
      // 查询字符
      queryString: '',
      // 树形层级数据
      itemList: [],
      // 右击选中节点
      itemNode: {},
      // 表单编辑对象
      itemModel: {},
      // 编辑表单显示状态
      dialogVisibleForm: false,
    };
  },
  watch: {
    // 收缩节点
    isCollapse(val) {
      const { tree } = this.$refs;
      tree.$children.forEach((v) => {
        v.expanded = !!val;
      });
    },
    queryString(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getItemList();
  },
  methods: {
    // 渲染节点
    renderContent(h, { node }) {
      return (
        <span class="el-tree__icon">
          <i class={`fas fa-${node.isLeaf ? 'file' : 'folder'}`} />
          <span>{node.label}</span>
        </span>
      );
    },
    // 过滤节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 单击节点事件
    onClickNode(data, node, tree) {
      const nodeTree = tree;
      nodeTree.expanded = !nodeTree.expanded;
    },
    // 右击节点事件
    onContextmenuNode(e, data, node, tree) {
      this.itemNode = {
        e, data, node, tree,
      };
      this.$refs.contextMenu.openMenu(e);
    },
    // 节点新增
    onAddNode() {
      this.itemModel = {
        rowGuid: '',
        label: '',
      };
      this.dialogVisibleForm = true;
    },
    // 节点修改
    onEditNode() {
      this.itemModel = this.itemNode.data;
      this.dialogVisibleForm = true;
    },
    // 节点复制
    onCopyNode() {
      this.$refs.tree.insertBefore(this.itemNode.data, this.itemNode.data);
    },
    // 节点删除
    onRemoveNode() {
      this.$refs.tree.remove(this.itemNode.data);
    },
    // 获取数据列表
    getItemList() {
      this.loading = true;
      this.$http.get(this.action, {
        params: { page: 1, rows: 1000000 },
      }).then((response) => {
        if (response.status === 200) {
          this.itemList = response.data.rows;
        } else {
          this.$message.warning({
            message: response.body.message,
            duration: 1500,
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      })
        .finally(() => {
          this.loading = false;
        });
    },
    onSaveItem() {
      const id = this.itemModel.rowGuid;
      if (!id) {
        this.$refs.tree.append(this.itemModel, this.itemNode.node);
      } else {
        this.$refs.tree.insertAfter(this.itemModel, this.itemNode.node);
        this.$refs.tree.remove(this.itemNode.data);
      }
      this.dialogVisibleForm = false;
    },
  },
};
</script>
