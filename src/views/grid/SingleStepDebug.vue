<template>
  <div>
    <el-card class="title-card">
      <div slot="header">
        <span>采样单参数</span>
      </div>
      <el-row>
        <el-button icon="fas fa-save" type="primary" class="mar-b-sm"> 保 存</el-button>
        <el-button icon="fas fa-times" type="danger"> 关 闭</el-button>
      </el-row>
      <el-form :model="formData" label-width="100px">
        <el-col :span="12">
          <el-form-item label="名称" style="width: 100%;" prop="name">
            <el-input v-model="formData.name" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="编码" style="width: 100%;" prop="code">
            <el-input v-model="formData.code" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="对象属性" style="width: 100%;" prop="type">
            <el-input v-model="formData.type" size="mini"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-card>
    <el-tabs type="border-card" style="height: auto;overflow: auto;">
      <el-tab-pane label="迁移">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-button type="primary" @click="onDebug">调试</el-button>
            <el-table :data="tableData1" style="width: 100%" ref="debugTable">
              <el-table-column
                width="50">
                <template slot-scope="scope">
                  <el-radio :label="scope.$index"
                  v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
                </template>
              </el-table-column>
              <el-table-column
                type="index"
                :label="tableColumn.hasIndex.label"
                v-if="tableColumn.hasIndex.value"
                width="50">
              </el-table-column>
              <el-table-column v-if="tableColumn.operation"
                :label="tableColumn.operation.label">
                <template slot-scope="scope">
                  <el-button :size="tableColumn.operation.size" :type="tableColumn.operation.type"
                    :icon="tableColumn.operation.icon"></el-button>
                </template>
              </el-table-column>
              <el-table-column v-for="(item, index) in tableColumn.columnItem" :key="index"
                :prop="item.prop" :label="item.label"></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <el-table :data="tableData2" style="width: 100%">
              <el-table-column
                type="selection"
                v-if="tableColumn.hasSelection"
                width="50">
              </el-table-column>
              <el-table-column
                type="index"
                :label="tableColumn.hasIndex.label"
                v-if="tableColumn.hasIndex.value"
                width="50">
              </el-table-column>
              <el-table-column v-if="tableColumn.operation"
                :label="tableColumn.operation.label">
                <template slot-scope="scope">
                  <el-button :size="tableColumn.operation.size" :type="tableColumn.operation.type"
                    :icon="tableColumn.operation.icon"></el-button>
                </template>
              </el-table-column>
              <el-table-column v-for="(item, index) in tableColumn.columnItem" :key="index"
                :prop="item.prop" :label="item.label"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'SingleStepDebug',
  data() {
    return {
      formData: {
        name: '',
        code: '',
        type: '',
      },
      tableColumn: {
        hasSelection: false,
        hasIndex: {
          label: '序号',
          value: true,
        },
        operation: {
          label: '操作',
          content: '编 辑',
          size: 'mini',
          icon: 'fas fa-edit',
          type: 'primary',
        },
        columnItem: [
          {
            label: '样品编号',
            prop: 'itemCode',
          }, {
            label: '分析项目',
            prop: 'analyzeObj',
          }, {
            label: '文本值',
            prop: 'textValue',
          }, {
            label: '名称',
            prop: 'name',
          }, {
            label: '数据值',
            prop: 'dataValue',
          },
        ],
      },
      templateRadio: 0,
      index: 0, // 当前选中行
      tableData1: [],
      tableData2: [],
    };
  },
  created() {
    this.getTableData1();
  },
  methods: {
    getTableData1() {
      this.$http.get('getDebugData').then((res) => {
        this.tableData1 = res.data.tableData1;
      });
    },
    onDebug() {
      this.index += 1;
      if (this.index < this.tableData1.length) {
        this.templateRadio = this.index;
      } else {
        this.$message('调试结束!');
      }
    },
    getTemplateRow(index) {
      this.index = index;
    },
  },
};
</script>
