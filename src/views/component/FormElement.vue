<!-- 表单元素 -->

<template>
  <el-card class="title-card">
    <template slot="header">表单元素</template>
    <fieldset>
      <legend>基础</legend>
      <el-button type="primary">
        <i class="fas fa-search" aria-hidden="true"></i> 查 询
      </el-button>
      <el-button type="primary">
        <i class="fas fa-plus-square" aria-hidden="true"></i> 新 增
      </el-button>
      <el-button type="primary">
        <i class="fas fa-edit" aria-hidden="true"></i> 编 辑
      </el-button>
      <el-button type="primary">
        <i class="fas fa-save" aria-hidden="true"></i> 保 存
      </el-button>
      <el-button type="primary">
        <i class="fas fa-cloud-upload-alt" aria-hidden="true"></i> 上 传
      </el-button>
      <el-button type="primary">
        <i class="fas fa-download" aria-hidden="true"></i> 下 载
      </el-button>
      <el-button type="primary">
        <i class="fas fa-cog" aria-hidden="true"></i> 配置
      </el-button>
      <el-button type="primary">
        <i class="fas fa-redo" aria-hidden="true"></i> 刷 新
      </el-button>
      <el-button type="warning">
        <i class="fas fa-copy" aria-hidden="true"></i> 复 制
      </el-button>
      <el-button type="danger">
        <i class="far fa-trash-alt" aria-hidden="true"></i> 删 除
      </el-button>
      <el-button type="success">
        <i class="fas fa-check" aria-hidden="true"></i> 确 认
      </el-button>
      <el-button>
        <i class="fas fa-times" aria-hidden="true"></i> 关 闭
      </el-button>
    </fieldset>
    <fieldset class="mar-t-sm">
      <legend>表格 - 单元格内</legend>
      <el-button type="primary" title="编辑">
        <i class="fas fa-edit" aria-hidden="true"></i>
      </el-button>
      <el-button type="primary" title="配置">
        <i class="fas fa-cog" aria-hidden="true"></i>
      </el-button>
      <el-button type="primary" title="附件">
        <i class="fas fa-paperclip" aria-hidden="true"></i>
      </el-button>
      <el-button type="primary" title="评价标准">
        <i class="fas fa-file-powerpoint" aria-hidden="true"></i>
      </el-button>
    </fieldset>
    <fieldset class="mar-t-sm">
      <legend>功能图标</legend>
      <i class="fas fa-minus" aria-hidden="true"></i>&nbsp;
      <i class="fas fa-plus" aria-hidden="true"></i>&nbsp;
      <i class="fas fa-expand" aria-hidden="true"></i>&nbsp;
      <i class="fas fa-compress" aria-hidden="true"></i>&nbsp;
      <i class="fas fa-file" aria-hidden="true"></i>&nbsp;
      <i class="fas fa-folder" aria-hidden="true"></i>&nbsp;
      <i class="fas fa-folder-open" aria-hidden="true"></i>&nbsp;
    </fieldset>
  </el-card>
</template>

<script>

export default {
  name: 'FormElement',
};
</script>
