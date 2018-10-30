<template>
  <el-row :gutter="10">
    <el-col :span="6">
      <el-card>
        <table-demo />
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-row>
        <el-col :span="24">
          <el-card style="height: auto">
            <fieldset-flex title="项目详情">
              <el-row :gutter="10">
                <el-col :span="12"><table-demo /></el-col>
                <el-col :span="12">
                  <p>图表1</p>
                </el-col>
              </el-row>
            </fieldset-flex>
          </el-card>
        </el-col>
        <el-col :span="24" class="mar-t-sm">
          <el-card style="height: auto">
            <fieldset-flex title="人员信息">
              <el-col :span="24"><table-demo /></el-col>
              <el-col :span="24">
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
      item1: true,
      item2: true,
    };
  },
};
</script>
