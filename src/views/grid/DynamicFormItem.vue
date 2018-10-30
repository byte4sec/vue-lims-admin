<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="地表水">
        <el-card class="title-card">
          <div slot="header">
            <span>采样单参数, 请刷新页面以显示不同数量的参数</span>
          </div>
          <el-form :model="{}" label-width="100px">
            <el-col :span="8" v-for="(item, index) in formData" :key="index">
              <el-form-item :label="item.label" style="width: 100%;">
                <el-input v-model="item.value" :placeholder="item.label"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-card>
        <el-card class="title-card">
          <div slot="header">
            <el-button type="danger" icon="fas fa-ban"> 删 除 </el-button>
          </div>
          <el-table :data="tableData" style="width: 100%">
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
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'DynamicFormItem',
  data() {
    return {
      tableColumn: {
        hasSelection: true,
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
            label: '点位',
            prop: 'portId',
          }, {
            label: '周期',
            prop: 'cycle',
          }, {
            label: '次数',
            prop: 'times',
          }, {
            label: '样品类型',
            prop: 'itemType',
          }, {
            label: '水平代码',
            prop: 'horizontalCode',
          }, {
            label: '垂直代码',
            prop: 'verticalCode',
          }, {
            label: '水深/水位',
            prop: 'verticalCode',
          }, {
            label: '相对湿度(%)',
            prop: 'verticalCode',
          }, {
            label: '颜色',
            prop: 'verticalCode',
          }, {
            label: '气味',
            prop: 'verticalCode',
          }, {
            label: '油膜',
            prop: 'verticalCode',
          }, {
            label: '藻类',
            prop: 'verticalCode',
          }, {
            label: '采样状态',
            prop: 'verticalCode',
          }, {
            label: '项目名称',
            prop: 'verticalCode',
          }, {
            label: '项目类型',
            prop: 'verticalCode',
          }, {
            label: '监测项目',
            prop: 'verticalCode',
          },
        ],
      },
      tableData: [
        {
          itemCode: 123456,
        },
      ],
      formData: [],
    };
  },
  created() {
    this.getFormData();
  },
  methods: {
    getFormData() {
      this.$http.get('getTableData').then((res) => {
        this.formData = res.data[0].formData;
      });
    },
  },
};
</script>
