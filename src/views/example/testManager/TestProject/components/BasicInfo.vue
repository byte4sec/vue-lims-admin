<!-- 基础信息 -->

<template>
  <div>
    <el-button type="primary" @click="onSaveItem()">
      <i class="fas fa-save" aria-hidden="true"></i> 保 存
    </el-button>
    <el-button @click="$emit('close')">
      <i class="fas fa-times" aria-hidden="true"></i> 关 闭
    </el-button>
    <hr class="dashed">
    <el-form
      ref="form"
      label-position="right"
      label-width="131px"
      v-loading="loading"
      :model="itemModel"
      :rules="rules">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="分析项目名称：" prop="redAnalyzeItemName">
            <el-select v-model="itemModel.redAnalyzeItemName">
              <el-option v-for="(item, key) in $enum.analysisItem" :key="key" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分析方法名称：" prop="redAnalyzeMethodName">
            <el-select v-model="redAnalyzeMethodName">
              <el-option v-for="(item, key) in $enum.analysisMethod" :key="key" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否启用公式：">
            <el-radio v-model="itemModel.isUseFormula" :label="true">是</el-radio>
            <el-radio v-model="itemModel.isUseFormula" :label="false">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="测试项目编码：">
            <el-input v-model="itemModel.testCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="国家标准：">
            <el-input v-model="itemModel.redCountryStandard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年度：">
            <el-input v-model="itemModel.redYearSn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="样品类型：" prop="sampleType">
            <el-select v-model="itemModel.sampleType">
              <el-option v-for="(item, key) in $enum.sampleType" :key="key" :label="item" :value="key - 0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="测试资质：" prop="cert">
            <el-select v-model="itemModel.cert">
              <el-option v-for="(item, key) in $enum.cert" :key="key" :label="item" :value="key - 0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="计量单位：" prop="dimensionId">
            <el-select v-model="itemModel.dimensionId" clearable filterable>
              <el-option
                v-for="(item, key) in $enum.dimensionUnit"
                :key="key"
                :label="item"
                :value="key - 0">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分配时长：">
            <el-input type="number" v-model.number="itemModel.testTimelen"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现场数据：">
            <el-radio v-model="itemModel.isCompleteField" :label="true">是</el-radio>
            <el-radio v-model="itemModel.isCompleteField" :label="false">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分包：">
            <el-radio v-model="itemModel.isOutsourcing" :label="true">是</el-radio>
            <el-radio v-model="itemModel.isOutsourcing" :label="false">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="质控空白：">
            <el-radio v-model="itemModel.isQCB" :label="true">是</el-radio>
            <el-radio v-model="itemModel.isQCB" :label="false">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="质控平行：">
            <el-radio v-model="itemModel.isQCP" :label="true">是</el-radio>
            <el-radio v-model="itemModel.isQCP" :label="false">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="样品有效期：">
            <el-input type="number" v-model.number="itemModel.validTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="检出限：">
            <el-input type="number" v-model.number="itemModel.examLimitValue"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="基础工作量：">
            <el-input type="number" v-model.number="itemModel.basicWorkload"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位工作量：">
            <el-input type="number" v-model.number="itemModel.unitWorkload"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="检测费金额：">
            <el-input type="number" v-model.number="itemModel.testingCharge"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采样费金额：">
            <el-input type="number" v-model.number="itemModel.samplingCharge"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效位数：">
            <el-input type="number" v-model.number="itemModel.mostSignificance"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="小数位数：">
            <el-input type="number" v-model.number="itemModel.mostDecimal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="斜率有效位数：">
            <el-input type="number" v-model.number="itemModel.kValueFormart"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="截距小数位数：">
            <el-input type="number" v-model.number="itemModel.bValueFormart"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="实验室编号：">
            <el-input v-model="itemModel.domainCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序值：">
            <el-input type="number" v-model.number="itemModel.orderNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="录入方式：">
            <el-radio v-model="itemModel.inputMode" :label="0">默认</el-radio>
            <el-radio v-model="itemModel.inputMode" :label="1">生物多样性</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="拼音简写：">
            <el-input v-model="itemModel.phonetic"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="启用嵌套公式：">
            <el-radio v-model="itemModel.isUseQTFormula" :label="true">是</el-radio>
            <el-radio v-model="itemModel.isUseQTFormula" :label="false">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="小于检出限结果：">
            <el-input v-model="itemModel.examLimitValueLess"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="itemModel.remark" :rows="2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { BasicInfoRules } from '../rules.js';

export default {
  model: {
    prop: 'rowId',
    event: 'setRowId',
  },
  props: ['rowId'],
  data() {
    return {
      loading: false,
      url: 'api/test',
      itemModel: {},        // 表单绑定对象
      // 表单验证规则
      rules: BasicInfoRules,
    };
  },
  computed: {
    // 分析项目名称关联国家标准
    redAnalyzeMethodName: {
      get() {
        return this.itemModel.redAnalyzeMethodName;
      },
      set(val) {
        this.itemModel.redAnalyzeMethodName = val;
        Object.keys(this.$enum.analysisMethod).forEach((key) => {
          if (this.$enum.analysisMethod[key] === val) {
            this.itemModel.redCountryStandard = key;
          }
        });
      },
    },
  },
  created() {
    if (this.rowId) {
      this.getItemOne();
    } else {
      this.itemModel = this.getEmptyItem();
    }
  },
  methods: {
    getEmptyItem() {
      return {
        analyzeMethodId: 1,       // 分析方法id
        redAnalyzeMethodName: '', // 分析方法名称
        redCountryStandard: '',   // 国家标准
        redYearSn: '',            // 年份
        analyzeItemId: 1,         // 分析项目Id
        redAnalyzeItemName: '',   // 分析项目名称
        sampleType: '',           // 样品类型
        testCode: '',             // 测试编码
        dimensionId: '',          // 计量单位
        examLimitValue: '',       // 检出限
        examLimitValueLess: '',   // 小于检出限
        validTime: 0,             // 样品有效期（h）
        orderNum: 0,              // 排序值
        mostSignificance: -1,     // 有效位数
        mostDecimal: -1,          // 小数位数
        testTimelen: 0,           // 分配时长
        basicWorkload: 0,         // 基础工作量
        unitWorkload: 0,          // 单位工作量
        cert: '',                 // 测试资质（0、1、2、3）
        domainCode: '',           // 实验室编号
        testName: '',             // 测试名称
        remark: '',               // 备注
        isOutsourcing: false,     // 是否分包
        isCompleteField: false,   // 是否现场数据
        sampleTypeGroupId: 1,     // 样品类型分组
        groupName: '',            // 样品类型组名
        samplingCharge: 0,        // 采样费金额
        testingCharge: 0,         // 检测费金额
        isQCP: false,             // 是否做质控平行
        isQCB: false,             // 是否做质控空白
        kValueFormart: 3,         // 斜率有效位数
        bValueFormart: 3,         // 截距小数位数
        inputMode: 0,             // 录入方式（0：默认，1：生物多样性）
        phonetic: '',             // 分析项目拼音缩写
        isUseFormula: false,      // 是否启用公式
        originalRecordId: 1,      // 原始记录 id
        isUseQTFormula: false,    // 是否启用嵌套公式(检测结果计算出证结果)
      };
    },
    getItemOne() {
      this.loading = true;
      this.$http.get(`api/test/${this.rowId}`).then((response) => {
        if (response.status === 200) {
          this.itemModel = Object.assign(this.getEmptyItem(), response.data);
        } else {
          this.$message.warning({
            message: response.body.message,
            duration: 1500,
          });
        }
      }, ({ response }) => {
        this.$hp.resp(response);
      }).finally(() => {
        this.loading = false;
      });
    },
    // 保存数据项
    onSaveItem() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.$http[this.rowId ? 'put' : 'post']('api/test', this.itemModel)
          .then((response) => {
            if (response.status === 200) {
              this.$message.success({
                message: `${this.rowId ? '修改' : '新增'}成功`,
                duration: 1500,
                showClose: true,
              });
              this.itemModel = response.data;
              this.$emit('setRowId', this.itemModel.id);
              this.$emit('query');
            } else {
              this.$message.warning({
                message: response.data.message,
                duration: 1500,
              });
            }
          }, ({ response }) => {
            this.$hp.resp(response);
          });
      });
    },
  },
};
</script>
