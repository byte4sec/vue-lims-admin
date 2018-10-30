<template>
  <el-card>
    <!--
      <b>二.2 动态grid</b>
      <p>根据后台数据生成动态的grid，单元格编辑（使用不同的form输入组件），方向键移动单元格编辑，回车键移动单元格编辑（可能是向下也可能是向上）</p>
      <p>1) 点单元格获取整行数据，包括隐藏id等</p>
      <p>2) 方向键移动单元格编辑</p>
      <p>3) 回车键移动单元格编辑（可能是向下也可能是向上）</p>
      <p>4) 单元格编辑（常用控件，如单选、多选、文本、时间、日期等）</p>
      <p>5) 根据后台数据生成动态的grid，grid列根据不同数据进行排版</p>
    -->
    <el-table :data="tableData"  style="width: 100%;" @cell-click="clickTableCell"
      :row-class-name="tableRowClassName" border stripe>
      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="操作" align="center" width="60">
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="samll"><i class="fas fa-pencil-alt"></i></el-button>
        </template>
      </el-table-column>
      <el-table-column label="样品编号" prop="sampleNumber" align="center" width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="点位" prop="portName" align="center" width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="周期" prop="cycle" align="center" width="60"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="次数" prop="degree" align="center" width="60"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="样品类型" prop="sampleType" align="center" width="120"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="日期控件" prop="dateControl" align="center" width="160"
        show-overflow-tooltip>
        <template slot-scope="{ row, $index }">
          <el-date-picker
            @focus="focusTableInput" @blur="blurTableInput"
            v-show="!showTableData.dateControl[$index]"
            style="width: 100%;"
            v-model.trim="row.dateControl"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
          <span v-show="showTableData.dateControl[$index]">{{row.dateControl}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数字控件" prop="digitalControl" align="center" width="140"
        show-overflow-tooltip>
        <template slot-scope="{ row, $index }">
          <el-input-number v-model.trim="row.digitalControl" style="width: 100%;"
            controls-position="right" v-show="!showTableData.digitalControl[$index]" :min="0"
            @focus="focusTableInput" @blur="blurTableInput">
          </el-input-number>
          <span v-show="showTableData.digitalControl[$index]">{{row.digitalControl}}</span>
        </template>
      </el-table-column>
      <el-table-column label="* 文本必填" prop="fileMust" align="center" width="250"
        show-overflow-tooltip>
        <template slot-scope="{ row, $index }">
          <el-input v-model.trim="row.fileMust" placeholder="请输入内容" style="width: 100%;"
            v-show="!showTableData.fileMust[$index]" @focus="focusTableInput" @blur="blurTableInput">
          </el-input>
          <span v-show="showTableData.fileMust[$index]">{{row.fileMust}}</span>
        </template>
      </el-table-column>
      <el-table-column label="下拉控件" prop="dropdownControl" align="center" width="180"
        show-overflow-tooltip>
        <template slot-scope="{ row, $index }">
          <el-select v-model.trim="row.dropdownControl" @focus="focusTableInput" @blur="blurTableInput"
            v-show="!showTableData.dropdownControl[$index]" style="width: 100%;">
            <el-option v-for="(item,index) in options" :key="index"
              :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <span v-show="showTableData.dropdownControl[$index]">{{row.dropdownControl}}</span>
        </template>
      </el-table-column>
      <el-table-column label="单选默认是" prop="radio" align="center" width="100"
        show-overflow-tooltip>
        <template slot-scope="{ row, $index}">
          <div>{{row.radio ? '是' : '否'}}</div>
        </template>
      </el-table-column>
      <el-table-column label="多选默认" prop="checkbox" align="center" width="140"
        show-overflow-tooltip>
        <template slot-scope="{ row, $index }">
          <div >{{row.checkbox}}</div>
        </template>
      </el-table-column>
      <el-table-column label="日期时间控件" prop="dataTimeControl" align="center" width="225"
        show-overflow-tooltip>
        <template slot-scope="{ row, $index }">
          <el-date-picker
            @focus="focusTableInput" @blur="blurTableInput"
            v-show="!showTableData.dataTimeControl[$index]"
            style="width: 100%;"
            v-model="row.dataTimeControl"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
          <span v-show="showTableData.dataTimeControl[$index]">{{row.dataTimeControl}}</span>
        </template>
      </el-table-column>
      <el-table-column label="文本区域控件" prop="textAreaControl" align="center" width="250"
        show-overflow-tooltip>
        <template slot-scope="{ row, $index }">
          <el-input type="textarea" :rows="1" v-model="row.textAreaControl" autosize
            placeholder="请输入内容" v-show="!showTableData.textAreaControl[$index]"
            @focus="focusTableInput" @blur="blurTableInput">
          </el-input>
          <span v-show="showTableData.textAreaControl[$index]">{{row.textAreaControl}}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间控件" prop="timeControl" align="center" width="140"
        show-overflow-tooltip>
        <template slot-scope="{ row, $index }">
          <el-time-picker
            @focus="focusTableInput" @blur="blurTableInput"
            v-show="!showTableData.timeControl[$index]"
            style="width: 100%;"
            v-model="row.timeControl"
            placeholder="选择时间"
            format="HH:mm"
            value-format="HH:mm">
          </el-time-picker>
          <span v-show="showTableData.timeControl[$index]">{{row.timeControl}}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'DynamicEdit', // 表格编辑
  data() {
    return {
      options: [
        {
          value: 1,
          label: 1,
        },
        {
          value: 2,
          label: 2,
        },
      ],
      tableData: [
        {
          rowGuid: 'rx',
          sampleNumber: '样品编号',
          portName: '点位',
          cycle: '周期',
          degree: '次数',
          sampleType: '样品类型',
          dateControl: '2017-01-01',
          digitalControl: 0,
          fileMust: '文本必填',
          dropdownControl: 1,
          radio: true,
          checkbox: '混合采样',
          dataTimeControl: '2018-11-10 00:00:00',
          textAreaControl: '文本区域控件',
          timeControl: '07:05',
        },
        {
          rowGuid: 'rq',
          sampleNumber: '样品编号',
          portName: '点位',
          cycle: '周期1',
          degree: '次数',
          sampleType: '样品类型',
          dateControl: '2017-01-01',
          digitalControl: 0,
          fileMust: '文本必填',
          dropdownControl: 1,
          radio: true,
          checkbox: '混合采样',
          dataTimeControl: '2018-11-10 00:00:00',
          textAreaControl: '文本区域控件1',
          timeControl: '07:05',
        },
        {
          rowGuid: 'rqq',
          sampleNumber: '样品编号',
          portName: '点位',
          cycle: '周期2',
          degree: '次数',
          sampleType: '样品类型',
          dateControl: '2017-01-01',
          digitalControl: 0,
          fileMust: '文本必填',
          dropdownControl: 1,
          radio: true,
          checkbox: '混合采样',
          dataTimeControl: '2018-11-10 00:00:00',
          textAreaControl: '文本区域控件2',
          timeControl: '07:05',
        },
      ],
      showTableData: {        // 记录表格 特殊列 每行的显示状态
        dateControl: [],      // 日期控件
        digitalControl: [],   // 数字控件
        fileMust: [],         // 文本控件
        dropdownControl: [],  // 下拉框控件
        dataTimeControl: [],  // 日期时间控件
        textAreaControl: [],  // 文本区域控件
        timeControl: [],      // 时间控件
      },
      reviseElement: {        // 记录上一次input框显示的单元格
        oldProperty: '',
        oldIndex: 0,
      },
      invalid: false,
    };
  },
  methods: {
    setShowStatus() {
      // 1. 特殊列具有多少行,那么就赋值给每列数组多少元素
      const show = this.showTableData;
      const len = this.tableData.length;
      Object.keys(show).forEach((item) => {
        const arr = show[item];
        for (let i = 0; i < len; i++) {
          arr.push(true);
        }
      });
    },
    tableRowClassName({ row, rowIndex }) { // 通过该方法向 row 添加索引属性
      // row.index = rowIndex;
      this.$set(row, 'index', rowIndex);
    },
    clickTableCell({ index }, { property }, cell, event) { // 单击某个单元格
      // 阻止冒泡
      if (event) {
        event.stopPropagation();
      }
      // 使用变量存储上一次点击的单元格“坐标”
      const { oldIndex, oldProperty } = this.reviseElement;
      const show = this.showTableData;
      // 判断上一个次点击的单元格是否符合显示隐藏的要求
      const findIndex = Object.keys(this.showTableData).findIndex(item => item === oldProperty);
      if (findIndex !== -1) {
        // 隐藏上一个单元格的Input框
        if (oldProperty) show[oldProperty].splice(oldIndex, 1, true);
      }
      // 记录当期点击的单元格“坐标”
      this.reviseElement.oldProperty = property;
      this.reviseElement.oldIndex = index;
      // 开始设置某个单元格
      if (!show[property]) { return; }
      // 不能直接根据数组索引赋值,如果直接赋值, 那么该索引对应的值是无法被动态监控的。
      // this.showTableData[column.property][row.index] = false;
      show[property].splice(index, 1, false);
    },
    focusTableInput() { // 获取焦点时触发
      this.invalid = true;
    },
    blurTableInput() {
      this.invalid = false;
    },
    // blurTableInput(index, property) { // Input框失去焦点
    //   console.log(1);
    //   this.showTableData[property].splice(index, 1, true);
    // },
    // 删除请求
    deleteTableData({ rowGuid }) {
      this.tableData = this.tableData.filter(item => item.rowGuid !== rowGuid);
    },
  },
  created() {
    this.setShowStatus();
    // 使用新变量存储this,防止后续操作的this值改变
    const self = this;
    document.onclick = () => {
      self.clickTableCell({ index: 0 }, { property: '' });
    };
    document.onkeydown = () => {
      // if (self.invalid) {
      //   return;
      // }
      const selfInvalid = self.invalid; // 是否有文本域Input框获得焦点
      const key = window.event.keyCode;
      const len = this.tableData.length;
      let index = this.reviseElement.oldIndex;
      let property = this.reviseElement.oldProperty;
      // const element = this.reviseElement;
      // 当按键为回车键时
      if (key === 13 && !selfInvalid) {
        // 第一种情况 表格数据0或1条,不做任何操作
        // 第二情况 表格数据为2~n条
        // 如果index 等于 tableData.length - 1
        if ((len > 1) && (index === (len - 1))) {
          index = 0;
        } else if ((len > 1) && (index < (len - 1))) {
          index++;
        }
        // if (this.reviseElement.oldIndex === this.tableData.length) {
        //   index = element
        // }
        // self.clickTableCell({ index }, { property });
      }
      // 当按键为上方向键时
      if (key === 38 && !selfInvalid) {
        // 第一种情况 表格数据0或1条,不做任何操作
        // 第二情况 表格数据为2~n条
        // 如果index 等于 tableData.length - 1
        if ((len > 1) && (index === 0)) {
          index = len - 1;
        } else if ((len > 1) && (index > 0)) {
          index--;
        }
      }
      // 当按键为下方向键时
      if (key === 40 && !selfInvalid) {
        // 第一种情况 表格数据0或1条,不做任何操作
        // 第二情况 表格数据为2~n条
        // 如果index 等于 tableData.length - 1
        if ((len > 1) && (index === (len - 1))) {
          index = 0;
        } else if ((len > 1) && (index < (len - 1))) {
          index++;
        }
      }
      // 当按键为左方向键时
      if (key === 37 && !selfInvalid) {
        // 第一种情况 ,showTableData的可遍历属性个数为0或1,不做任何操作
        // 第二情况 2~n个
        const keys = Object.keys(this.showTableData);
        const findIndex = keys.findIndex(item => item === property);
        if ((keys.length > 1) && (findIndex === 0)) {
          property = keys[keys.length - 1];
        } else if ((keys.length > 1) && (findIndex > 0)) {
          property = keys[findIndex - 1];
        }
      }
      // 当按键我右方向键时
      if (key === 39 && !selfInvalid) {
        // 第一种情况 ,showTableData的可遍历属性个数为0或1,不做任何操作
        // 第二情况 2~n个
        const keys = Object.keys(this.showTableData);
        const findIndex = keys.findIndex(item => item === property);
        if ((keys.length > 1) && (findIndex === (keys.length - 1))) {
          // eslint-disable-next-line
          property = keys[0];
        } else if ((keys.length > 1) && (findIndex < (keys.length - 1) && (findIndex >= 0))) {
          property = keys[findIndex + 1];
        }
      }
      self.clickTableCell({ index }, { property });
    };
  },
};
</script>
