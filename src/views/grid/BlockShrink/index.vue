<template>
  <el-row :gutter="10" v-move>
    <el-col :span="12">
      <el-card full="1">
        <el-table :data="itemList" border stripe>
          <el-table-column prop="cName" label="姓名" min-width="30px"></el-table-column>
          <el-table-column prop="birthDay" label="出生日期" min-width="50px"></el-table-column>
          <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
          <el-table-column prop="birthPlace" label="地址" show-overflow-tooltip></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-row>
        <el-col :span="24" full="50%">
          <el-card full>
            <fieldset-flex title="项目详情" style="height: 100%">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-table :data="itemList" border stripe>
                    <el-table-column prop="cName" label="姓名" min-width="30px"></el-table-column>
                    <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="birthPlace" label="地址" show-overflow-tooltip></el-table-column>
                  </el-table>
                </el-col>
                <el-col :span="12">
                  <p>图表1</p>
                </el-col>
              </el-row>
            </fieldset-flex>
          </el-card>
        </el-col>
        <el-col :span="24" class="mar-t-sm" full="50%">
          <el-card full>
            <fieldset-flex title="人员信息" style="height: 100%"  >
              <el-col :span="24">
                <el-table :data="itemList" border stripe>
                  <el-table-column prop="cName" label="姓名" min-width="30px"></el-table-column>
                  <el-table-column prop="birthDay" label="出生日期" min-width="50px"></el-table-column>
                  <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
                  <el-table-column prop="birthPlace" label="地址" show-overflow-tooltip></el-table-column>
                </el-table>
              </el-col>
              <el-col :span="24" full="50%">
                <el-row :gutter="10">
                  <el-col :span="12"><p>图表2</p></el-col>
                  <el-col :span="12"><p>图表3</p></el-col>
                </el-row>
              </el-col>
            </fieldset-flex>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import FieldsetFlex from '@/components/FieldsetFlex';
import TableDemo from './components/TableDemo';

export default {
  name: 'BlockShrink',
  components: {
    FieldsetFlex,
    TableDemo,
  },
  data() {
    return {
      itemList: [],
      pager: {
        page: 1,
        rows: 5,
        total: 0,
      },
    };
  },
  created() {
    this.getItemList();
  },
  methods: {
    // 获取记录列表
    getItemList() {
      this.loading = true;
      this.$http.get('api/BlockShrink').then((response) => {
        if (response.status === 200) {
          this.itemList = response.data.rows;
          this.pager.total = response.data.total;
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
  },
};
</script>
