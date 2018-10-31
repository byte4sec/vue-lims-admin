<!-- 人员管理 -->

<template>
  <div>
    <el-button type="primary" @click="onSaveItem()">
      <i class="fas fa-save" aria-hidden="true"></i> 保 存
    </el-button>
    <el-row :gutter="10" class="mar-t-sm">
      <el-col :span="12">
        <el-card class="title-card">
          <template slot="header">所有人员</template>
          <draggable
            class="list-group"
            element="ul"
            v-model="itemList"
            :options="dragOptions"
            :move="onMove"
            @start="isDragging = true"
            @end="isDragging = false">
            <transition-group type="transition" :name="'flip-list'">
              <li class="list-group-item" v-for="item in itemList" :key="item.id">
                {{item.cName}}
              </li>
            </transition-group>
          </draggable>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="title-card">
          <template slot="header">主项/兼项</template>
          <draggable element="span" v-model="selectedList" :options="dragOptions" :move="onMove">
            <transition-group name="no" class="list-group" tag="ul">
              <li class="list-group-item" v-for="item in selectedList" :key="item.id">
                {{item.cName}}
              </li>
            </transition-group>
          </draggable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  props: ['rowId'],
  data() {
    return {
      itemList: [],
      selectedList: [],
      isDragging: false,
      delayedDragging: false,
      dragOptions: {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
      pager: {
        page: 1,
        rows: 13,
        total: 0,
      },
    };
  },
  computed: {
    selected() {
      const arr = [];
      this.selectedList.forEach((item) => {
        arr.push({ personId: item.id, orderNum: item.orderNum });
      });
      return arr;
    },
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
  },
  created() {
    this.getItemList();
  },
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    // 获取人员信息
    getItemList() {
      this.loading = true;
      const { page, rows } = this.pager;
      this.$http.get('api/person', {
        params: { page, rows, ...this.queryForm },
      }).then((response) => {
        if (response.status === 200) {
          this.itemList = response.data.rows;
          this.pager.total = response.data.total;
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
      this.$http.put(`api/testPerson/${this.rowId}`, this.selected).then((response) => {
        if (response.status === 200) {
          this.$message.success({
            message: '操作成功',
            duration: 1500,
            showClose: true,
          });
        } else {
          this.$message.warning({
            message: response.data.message,
            duration: 1500,
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      });
    },
  },
};
</script>
