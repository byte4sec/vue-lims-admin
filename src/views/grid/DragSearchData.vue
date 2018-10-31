<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card class="title-card">
        <template slot="header">待选</template>
        <el-input
          placeholder="请输入内容"
          clearable
          v-model="leftQuery"
          class="mar-b-sm"
          @keyup.enter.native="onQueryLeft">
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
        <el-input
          placeholder="请输入内容"
          clearable
          v-model="rightQuery"
          class="mar-b-sm"
          @keyup.enter.native="onQueryRight">
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
      recordLeft: [], // 拖拽之后记录左边列表数据
      recordRight: [], // 拖拽之后记录左边列表数据
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
      this.recordLeft = this.leftModel;
      this.recordRight = this.rightModel;
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
      if (this.leftQuery) {
        this.leftModel = this.leftModel.filter(v => v.cName.indexOf(this.leftQuery) > -1);
      } else {
        this.leftModel = this.recordLeft;
      }
    },
    onQueryRight() {
      if (this.rightQuery) {
        this.rightModel = this.rightModel.filter(v => v.cName.indexOf(this.rightQuery) > -1);
      } else {
        this.rightModel = this.recordRight;
      }
    },
    // 获取记录列表
    getItemList() {
      this.$http.get('api/dragSearchData').then((response) => {
        if (response.status === 200) {
          this.leftModel = response.data.rows;
          this.recordLeft = this.leftModel;
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
