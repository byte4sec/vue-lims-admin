<template>
  <el-card class="title-card">
    <template slot="header">Home</template>
    <form-element />
  </el-card>
</template>

<script>
import FormElement from './form/FormElement';

export default {
  name: 'Home',
  components: {
    FormElement,
  },
};
</script>
