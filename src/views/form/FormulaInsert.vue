<template>
  <el-card class="title-card">
    <div slot="header">
      <span>参数的插入，在form上进行公式的拼装</span>
    </div>
    <el-form label-width="60px">
      <el-form-item label="备注：" prop="remark">
        <el-input type="textarea" :autosize="{ minRows: 2 }" @blur="getBlur" v-model.trim="remark"></el-input>
      </el-form-item>
    </el-form>
    <el-button-group class="mar-t-sm">
      <el-button
        type="primary"
        v-for="(item, index) in markData"
        :key="index"
        @click="getData(item)">{{item}}
      </el-button>
    </el-button-group>
    <div class="mar-t-md">
      <el-select v-model="monitorModel" style="width:300px">
        <el-option v-for="(item, i) in list" :label="item.portName" :value="item.portId"
          :key="i"></el-option>
      </el-select>
      <el-button @click="onClick">
        <i class="fa fa-plus-circle" aria-hidden="true"></i> 插入函数
      </el-button>
    </div>
    <el-table :data="tableData" border stripe id="out-table" style="margin-top: 10px;">
      <el-table-column align="center" type="index" width="50" label='序号'></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <i class="far fa-arrow-alt-circle-down"></i>
          <span @click="insertData(scope)" style="cursor: pointer;color: #409EFF;"> 插入参数</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="parameterName" label="参数名称"></el-table-column>
      <el-table-column align="center" prop="ParametersAlias" label="参数别名"></el-table-column>
      <el-table-column align="center" prop="defaultValue" label="默认值"></el-table-column>
      <el-table-column align="center" prop="orderValue" label="排序值"></el-table-column>
      <el-table-column align="center" prop="measuringUnit" label="计量单位"></el-table-column>
      <el-table-column align="center" prop="type" label="类型"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'FormulaInsert',
  data() {
    return {
      value: '',
      monitorModel: '',
      remark: '123456789',
      endIndex: 0,
      startIndex: 0,
      markData: ['+', '-', '*', '/', '%', '<', '>', '<=', '>=', '=', '==', '!=', '<>',
        '(', ')', '>>', '<<', '!', 'not', '&', '|', '^', '~', '&&', 'and', '||', 'or', 'if()'],
      list: [
        {
          portName: 'Abs',
          portId: 'Abs',
        },
        {
          portName: 'Acos',
          portId: 'Acos',
        },
        {
          portName: 'Asin',
          portId: 'Asin',
        },
        {
          portName: 'Atan',
          portId: 'Atan',
        },
        {
          portName: 'Ceiling',
          portId: 'Ceiling',
        },
        {
          portName: 'Floor',
          portId: 'Floor',
        },
        {
          portName: 'Pow',
          portId: 'Pow',
        },
        {
          portName: 'Exp',
          portId: 'Exp',
        },
        {
          portName: 'IEEERemainder',
          portId: 'IEEERemainder',
        },
      ],
      tableData: [
        {
          parameterName: '响应值',
          ParametersAlias: '响应值',
          defaultValue: '0',
          orderValue: '2560',
          measuringUnit: '未知',
          type: '测试',
        },
        {
          parameterName: '测得结果',
          ParametersAlias: '测得结果',
          defaultValue: '0',
          orderValue: '2242',
          measuringUnit: '未知',
          type: '测试',
        },
        {
          parameterName: '稀释倍数',
          ParametersAlias: '稀释倍数',
          defaultValue: '0',
          orderValue: '1444',
          measuringUnit: '未知',
          type: '测试',
        },
      ],
    };
  },
  methods: {
    getBlur(e) {
      this.startIndex = e.target.selectionStart;
      this.endIndex = e.target.selectionEnd;
    },
    getData(item) {
      this.value = item;
      this.insert();
    },
    insert() {
      // debugger;
      if (this.endIndex) {
        const val1 = this.remark.slice(0, this.startIndex);
        const val2 = this.remark.slice(this.endIndex);
        this.remark = `${val1}${this.value}${val2}`;
        this.startIndex = this.startIndex + this.value.length;
      } else {
        const val1 = this.remark.slice(0, this.startIndex);
        const val2 = this.remark.slice(this.startIndex);
        this.remark = `${val1}${this.value}${val2}`;
        this.startIndex = this.startIndex + this.value.length;
      }
      this.endIndex = false;
    },
    onClick() {
      this.value = `${this.monitorModel}()`;
      this.insert();
    },
    insertData(scope) {
      this.value = `[${scope.row.parameterName}]`;
      this.insert();
    },
  },
};
</script>
