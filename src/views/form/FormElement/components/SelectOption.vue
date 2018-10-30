<template>
  <div>
    <el-button type="primary" @click="handleCheckAll">全 选</el-button>
    <el-button type="primary" @click="handleCheckInvert">反 选</el-button>
    <el-button @click="handleCheckCancel">取消选择</el-button>
    <el-checkbox-group v-model="checkedList" class="mar-t-sm">
      <el-checkbox v-for="v in dataList" :label="v" :key="v">{{ v }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: ['上海', '北京', '广州', '深圳', '武汉'],
      checkedList: [],
    };
  },
  methods: {
    handleCheckAll() {
      this.checkedList = [...this.dataList];
    },
    handleCheckInvert() {
      if (this.checkedList.length !== 0) {
        this.checkedList = [...this.dataList.filter(val => !this.checkedList.includes(val))];
      }
    },
    handleCheckCancel() {
      this.checkedList = [];
    },
  },
};
</script>
