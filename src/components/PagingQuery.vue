<!-- 分页查询
<pager-query :pager=[分页对象] @query=[列表查询方法] />
-->

<template>
  <div class="clearfix mar-t-xs">
    <el-pagination
      class="float-r"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pager.total"
      :current-page.sync="pager.page"
      :page-size="pager.rows"
      :page-sizes="[5, 15, 30, 50]"
      @size-change="onChangeSize"
      @current-change="onChangePage">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'PagingQuery',
  props: ['pager'],
  computed: {
    total() {
      return this.pager.total;
    },
    // 检测获取到的数据是否为空
    isEmptyList() {
      return this.pager.total / this.pager.rows < this.pager.page;
    },
  },
  watch: {
    total() {
      // 存在记录但未获取到数据时, 重新请求
      if (this.pager.page > 1 && this.isEmptyList) {
        this.pager.page -= 1;
        this.$emit('query');
      }
    },
  },
  methods: {
    // 每页条数
    onChangeSize(rows) {
      this.pager.rows = rows;
      // 触发父组件查询请求
      this.$emit('query');
    },
    // 翻页
    onChangePage(page) {
      this.pager.page = page;
      this.$emit('query');
    },
  },
};
</script>
