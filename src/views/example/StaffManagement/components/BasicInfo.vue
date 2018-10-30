<template>
  <el-card>
    <div slot="header" class="mar-b-sm">
      <el-button type="primary" @click="onSaveItem()">
        <i class="fas fa-save" aria-hidden="true"></i> 保 存
      </el-button>
      <el-button @click="$emit('close')">
        <i class="fas fa-times" aria-hidden="true"></i> 关 闭
      </el-button>
    </div>
    <el-form
      ref="form"
      label-position="right"
      label-width="110px"
      class="mar-t-sm"
      v-loading="loading"
      :model="itemModel"
      :rules="rules">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="性名：" prop="cName">
            <el-input v-model="itemModel.cName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编号：" prop="userNO">
            <el-input v-model="itemModel.userNO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="办公室：" prop="domainId">
            <el-select v-model="itemModel.domainId">
              <el-option label="现场分析室1" value="1"></el-option>
              <el-option label="现场分析室2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="职务：" prop="quarters">
            <el-select v-model="itemModel.quarters">
              <el-option label="监督监测室主任1" value="1"></el-option>
              <el-option label="监督监测室主任2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="英文名：">
            <el-input v-model="itemModel.eName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="出生：">
            <el-date-picker
              v-model="itemModel.birthDay"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss"
             >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="个人邮箱：">
            <el-input v-model="itemModel.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别：">
            <el-radio v-model="itemModel.sex" label="男">男</el-radio>
            <el-radio v-model="itemModel.sex" label="女">女</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="身份证号：">
            <el-input v-model="itemModel.idCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="国籍：">
            <el-input v-model="itemModel.nation"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="排序值：">
            <el-input type="number" v-model.number="itemModel.orderNum"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="学历：">
            <el-select v-model="itemModel.degree">
              <el-option label="硕士研究生" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="最高学历：">
            <el-select v-model="itemModel.highestDegree">
              <el-option label="硕士研究生" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="毕业院校：">
            <el-input v-model="itemModel.school"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专业：">
            <el-input v-model="itemModel.specialty"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="手机：">
            <el-input v-model="itemModel.mobile"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="固定电话：">
            <el-input v-model="itemModel.homeTel"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="出生地：">
            <el-input v-model="itemModel.birthPlace"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地址：">
            <el-input v-model="itemModel.homeAddress"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="技术职称：">
            <el-select v-model="itemModel.technicalTitle">
              <el-option label="XXXX" value=""></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="获得日期：">
            <el-date-picker
              v-model="itemModel.technicalTitleDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="技术资格：">
            <el-input v-model="itemModel.technologyNO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="准入证号：">
            <el-input v-model="itemModel.certificateNO"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="获得日期：">
            <el-date-picker
              v-model="itemModel.certificateDate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="在岗时间：">
            <el-input type="number" v-model.number="itemModel.yearsInThePosition"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="入职日期：">
            <el-date-picker
              v-model="itemModel.joinCompanyTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="开始工作日期：">
            <el-date-picker
              v-model="itemModel.workStartTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="离职日期：">
            <el-date-picker
              v-model="itemModel.leaveCompanyTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="关键岗位：">
            <el-checkbox-group v-model="itemModel.domainIdArr">
              <el-row>
                <el-col :span="6"><el-checkbox :label="2" /></el-col>
                <el-col :span="6"><el-checkbox :label="4" /></el-col>
                <el-col :span="6"><el-checkbox :label="6" /></el-col>
                <el-col :span="6"><el-checkbox :label="8" /></el-col>
                <el-col :span="6"><el-checkbox :label="10" /></el-col>
                <el-col :span="6"><el-checkbox :label="12" /></el-col>
                <el-col :span="6"><el-checkbox :label="14" /></el-col>
                <el-col :span="6"><el-checkbox :label="16" /></el-col>
                <el-col :span="6"><el-checkbox :label="18" /></el-col>
                <el-col :span="6"><el-checkbox :label="20" /></el-col>
                <el-col :span="6"><el-checkbox :label="22" /></el-col>
                <el-col :span="6"><el-checkbox :label="24" /></el-col>
              </el-row>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="技术能力：">
            <el-input v-model="itemModel.tecCompetence"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="itemModel.remark" :rows="2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
import { basicInfoRules } from '../rules';

export default {
  model: {
    prop: 'rowId',
    event: 'setRowId',
  },
  props: ['rowId'],
  data() {
    return {
      loading: false,
      itemModel: {},
      rules: basicInfoRules,
    };
  },
  created() {
    if (this.rowId) {
      this.getItemOne();
    } else {
      this.itemModel = this.getEmptyItem();
    }
  },
  methods: {
    getItemOne() {
      this.loading = true;
      this.$http.get(`api/person/${this.rowId}`).then((response) => {
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
    onSaveItem() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.$http[this.rowId ? 'put' : 'post']('api/person', this.itemModel)
          .then((response) => {
            if (response.status === 200) {
              this.$message.success({
                message: `${this.rowId ? '编辑' : '新增'}成功`,
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
    getEmptyItem() {
      return {
        cName: '',               // 性名
        userNO: '',              // 用户编号
        domainId: '',            // 办公室
        quarters: '',            // 职务
        eName: '',               // 英文名
        birthDay: '',            // 出生日期
        email: '',               // 个人邮箱
        sex: 1,                  // 性别
        idCard: '',              // 身份证号
        nation: '',              // 国籍
        orderNum: '',            // 排序值
        degree: '',              // 学历
        highestDegree: '',       // 最高学历
        school: '',              // 毕业院校
        specialty: '',           // 专业
        mobile: '',              // 手机
        homeTel: '',             // 固定电话
        birthPlace: '',          // 出生地
        homeAddress: '',         // 地址
        technicalTitle: '',      // 技术职称
        technicalTitleDate: '',  // 职称获得时间
        technologyNO: '',        // 技术资格
        certificateNO: '',       // 作业准入证书
        certificateDate: '',     // 获得作业准入证书日期
        yearsInThePosition: '',  // 在岗时间
        joinCompanyTime: '',     // 入职日期
        workStartTime: '',       // 开始工作时间
        leaveCompanyTime: '',    // 离职日期
        domainIdArr: [],         // 关键岗位
        tecCompetence: '',       // 技术能力
        remark: '',              // 备注
      };
    },
  },
};
</script>
