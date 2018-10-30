<!-- 窗格选择器
<select-pane
  v-model="绑定值"
  url="接口地址"
  title="标题"
  :label="显示值 || ''"
  :col-width="200"
  :col-titles="['列标题1', '列标题2']" />
-->

<template>
  <div>
    <el-dialog
      custom-class="select-pane"
      :title="`选择${title}`"
      :width="`${colWidth * len}px`"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="onCloseDialog">
      <!-- 列标题 -->
      <div class="flex-box">
        <span v-for="(item, key) in colTitles" :key="key" class="col-item item-title">{{ item }}：</span>
      </div>
      <div class="flex-box item-body">
        <!-- 列容器 -->
        <div v-for="(item, depth) in colTitles" :key="depth" class="col-item">
          <ul v-loading="loadings[depth]" class="scrollbar">
            <li
              v-for="(row, k) in itemLists[depth]"
              :key="k"
              :class="{ 'is-active': row[props.label] === selecteds[depth] }"
              @click="onClickQuery(depth, row)"> {{ row[props.label] }}</li>
          </ul>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <span>{{`当前选择：${nowSelect}`}}</span>
        <el-button type="primary" size="small" @click="onSelected()">
          <i class="fa fa-save" aria-hidden="true"></i> 保 存
        </el-button>
        <el-button size="small" @click="dialogVisible = false">
          <i class="fa fa-times" aria-hidden="true"></i> 关 闭
        </el-button>
      </div>
    </el-dialog>
    <el-input v-model="labelModel" :size="size">
      <el-button slot="append" :size="size" @click="openDialog()">
        <i :class="'fa fa-th-list'"></i>
      </el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'SelectPane',
  // 设置绑定参数
  model: {
    prop: 'value',
    event: 'selected',
  },
  props: {
    // v-model 传参
    value: String,
    // label
    label: String,
    // API 接口
    url: {
      type: String,
      required: true,
    },
    // 组件大小, 可选 large、small、mini
    size: {
      type: String,
      required: false,
      default: 'mini',
    },
    // 子项列宽
    colWidth: {
      type: Number,
      required: false,
      default: 170,
    },
    // 标题
    title: {
      type: String,
      required: false,
      default: '',
    },
    // 子项列标题
    colTitles: {
      type: Array,
      required: true,
    },
    // 树节点配置选项
    props: {
      type: Object,
      required: false,
      default: () => ({
        parent: 'parentId',
        value: 'rowGuid',
        label: 'dictName',
        children: 'children',
      }),
    },
  },
  computed: {
    len() {
      return this.colTitles.length;
    },
    nowSelect() {
      return this.selecteds[this.selecteds.length - 1] || '';
    },
  },
  watch: {
    value() {
      this.labelModel = this.label;
    },
  },
  data() {
    return {
      dialogVisible: false,  // 弹框显示状态
      valueModel: '',        // 实际值
      labelModel: '',        // 显示值
      itemLists: [],         // 选项列表
      selecteds: [],         // 已选项
      loadings: [],          // 列加载状态
      row: {},
      selectLabel: '',       // label
    };
  },
  created() {
    this.labelModel = this.label;
  },
  methods: {
    // 打开弹框
    openDialog() {
      this.dialogVisible = true;
      this.labelModel = this.label;
      this.valueModel = this.value;
      this.getItemList(0);
    },
    // 关闭弹框
    onCloseDialog() {
      this.itemLists = [];
      this.selecteds = [];
      this.loadings = [];
      this.selectLabel = '';
    },
    // 提交选择
    onSelected() {
      this.$emit('selected', this.valueModel);
      this.$emit('change', this.selectLabel);
      this.dialogVisible = false;
    },
    // 单击查询子项
    onClickQuery(depth, row) {
      this.row = row;
      this.valueModel = this.row[this.props.value];
      this.selectLabel = this.row[this.props.label];
      if (depth > this.selecteds.length || !this.selecteds.length) {
        this.selecteds.push(row[this.props.label]);
      } else {
        this.$set(this.selecteds, depth, row[this.props.label]);
        this.selecteds = this.selecteds.slice(0, depth + 1);
      }
      this.itemLists = this.itemLists.slice(0, depth + 1);
      if (depth !== this.len - 1) {
        this.getItemList(depth + 1, row[this.props.value]);
      }
    },
    // 获取选项数据
    getItemList(depth, rowGuid) {
      this.$set(this.loadings, depth, true);
      this.$http.get(`${this.url}/${rowGuid || '0'}`)
        .then((response) => {
          if (response.status === 200) {
            this.$set(this.itemLists, depth, response.data);
          } else {
            this.$message.warning({
              message: response.data.msg,
              duration: 1500,
            });
          }
          this.$set(this.loadings, depth, false);
        }, ({ response }) => {
          this.$set(this.loadings, depth, false);
          this.$sys.resp(response);
        });
    },
  },
};
</script>
