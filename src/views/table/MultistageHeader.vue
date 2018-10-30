<template>
  <el-card>
    <el-table border style="width:100%">
      <el-table-column fixed label="序号" type="index" align="center" width="50"></el-table-column>
      <el-table-column fixed label="分析项目" align="center" width="200"></el-table-column>
      <el-table-column fixed label="分析样品数" align="center" width="100"></el-table-column>
      <el-table-column label="现场平行" align="center">
        <el-table-column label="检查数" align="center"></el-table-column>
        <el-table-column label="检查率" align="center"></el-table-column>
        <el-table-column label="合格数" align="center"></el-table-column>
        <el-table-column label="合格率" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="室内平行" align="center">
        <el-table-column label="检查数" align="center"></el-table-column>
        <el-table-column label="检查率" align="center"></el-table-column>
        <el-table-column label="合格数" align="center"></el-table-column>
        <el-table-column label="合格率" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="加标回收" align="center">
        <el-table-column label="检查数" align="center"></el-table-column>
        <el-table-column label="检查率" align="center"></el-table-column>
        <el-table-column label="合格数" align="center"></el-table-column>
        <el-table-column label="合格率" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="全程序空白" align="center">
        <el-table-column label="检查数" align="center"></el-table-column>
        <el-table-column label="检查率" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="密码样库" align="center">
        <el-table-column label="检查数" align="center"></el-table-column>
        <el-table-column label="检查率" align="center"></el-table-column>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'MultistageHeader',
};
</script>
