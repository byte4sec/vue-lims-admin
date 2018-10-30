<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card class="title-card">
        <div slot="header">
          <span>样品信息</span>
        </div>
        <el-button type="primary">
          <i class="fab fa-accusoft"></i> 样品留样
        </el-button>
        <el-button  type="primary">
          <i class="fab fa-angellist"></i> 样品处置
        </el-button>
        <el-table class="mar-t-sm" border stripe :data="tableData" @cell-click="onTableClick">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="date" label="日期" min-width="100"></el-table-column>
          <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
          <el-table-column prop="address" label="地址" min-width="100"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="12">
      <drop-down-card v-model="dropForm" ref="dropCard" style="max-height: 35%">
        <el-tabs style="height: auto;overflow: auto;" slot="card-body">
          <el-tab-pane label="用户管理">
            <el-col :span="12"><span>姓名：</span><span>{{rowData.name}}</span></el-col>
            <el-col :span="12"><span>地址：</span><span>{{rowData.address}}</span></el-col>
            <el-col :span="12"><span>日期：</span><span>{{rowData.date}}</span></el-col>
          </el-tab-pane>
          <el-tab-pane label="配置管理">
            <el-col :span="8" v-for="(item, index) in formData" :key="index">
              <span>{{item.label}} </span>
              <span v-if="item.type === 1" style="font-weight: bold;">{{item.value}}</span>
              <a v-if="item.type === 2" href="https://www.baidu.com" style="color: #0000bb">{{item.value}}</a>
              <i v-if="item.type === 3" @click="onOpenDialog">{{item.value}}</i>
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </drop-down-card>
      <el-card class="title-card mar-t-sm" style="height: calc(65% - 10px)">
        <template  slot="header">检测数据</template>
        <el-table border stripe :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column prop="date" label="日期" min-width="100"></el-table-column>
          <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
          <el-table-column prop="address" label="地址" min-width="100"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import * as _cloneDeep from 'lodash/cloneDeep';
import PagingQuery from '@/components/PagingQuery';
import dropDownCard from './components/dropDownCard';

export default {
  name: 'FormExtend',
  components: {
    dropDownCard,
    PagingQuery,
  },
  data() {
    return {
      tableData: [],
      formData: {},
      rowData: {},
      dropForm: false,
      pager: {
        size: 15,
        page: 1,
        total: 0,
      },
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    onTableClick(row) {
      this.rowData = _cloneDeep(row);
      this.formData = _cloneDeep(row.formData);
      this.$refs.dropCard.toggleForm(true);
    },
    onOpenDialog() {
      this.$message('123123');
    },
    getTableData() {
      this.$http.get('getTableData').then((res) => {
        this.tableData = res.data;
      });
    },
  },
};
</script>

<style scoped>
  .margin{
    line-height: 35px;
  }
</style>
