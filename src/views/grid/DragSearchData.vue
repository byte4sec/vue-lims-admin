<template>
  <el-row :gutter="10" v-move>
    <el-col :span="12">
      <el-card class="title-card">
        <template slot="header">待选</template>
        <el-input placeholder="请输入内容" v-model="leftQuery" class="mar-b-sm" @keyup.enter.native="onQueryLeft">
          <el-button slot="append" @click="onQueryLeft">
            <i class="fas fa-search"></i>
          </el-button>
        </el-input>
        <draggable
          class="list-group"
          element="ul"
          v-model="leftModel"
          :options="dragOptions"
          :move="onMove"
          @start="isDragging=true"
          @end="isDragging=false">
          <transition-group type="transition" :name="'flip-list'">
            <li class="list-group-item" v-for="item in leftModel" :key="item.personId">
              {{item.cName}}
            </li>
          </transition-group>
        </draggable>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="title-card">
        <template slot="header">已选</template>
        <el-input placeholder="请输入内容" v-model="rightQuery" class="mar-b-sm" @keyup.enter="onQueryLeft">
          <el-button slot="append" @click="onQueryRight">
            <i class="fas fa-search"></i>
          </el-button>
        </el-input>
        <draggable element="span" v-model="rightModel" :options="dragOptions" :move="onMove">
          <transition-group name="no" class="list-group" tag="ul">
            <li class="list-group-item" v-for="item in rightModel" :key="item.personId">
              {{item.cName}}
            </li>
          </transition-group>
        </draggable>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'DragSearchData',
  components: {
    draggable,
  },
  data() {
    return {
      leftQuery: '',
      leftModel: [],
      rightQuery: '',
      rightModel: [],
      isDragging: false,
      delayedDragging: false,
      dragOptions: {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
    };
  },
  created() {
    this.getItemList();
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
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    onQueryLeft() {
      if (!this.leftQuery) {
        this.leftModel = this.leftModel.filter(v => v.cName.indexOf(this.leftQuery) > 0);
      }
    },
    onQueryRight() {
      if (!this.rightQuery) {
        this.rightModel = this.rightModel.filter(v => v.cName.indexOf(this.rightQuery) > 0);
      }
    },
    // 获取记录列表
    getItemList() {
      this.$http.get('api/dragSearchData').then((response) => {
        if (response.status === 200) {
          this.leftModel = response.data.rows;
        } else {
          this.$message.warning({
            message: response.body.message,
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

<style lang="scss">
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .list-group, .list-group > span {
    display: block;
    min-height: 30px;
  }
  .list-group-item {
    margin-bottom: 2px;
    padding: 0 10px;
    line-height: 30px;
    border: 1px solid #ccc;
    background-color: #f8f8f8;
    cursor: move;
  }
</style>
