<template>
  <el-row class="login-wrap">
    <el-col :xs="12" :sm="14" :md="16" :lg="18" class="col-left">
      <h1 class="title">
        <span>LIMS 管理系统模板</span>
        <p>基于 Element UI 的 LIMS 管理系统模板</p>
      </h1>
    </el-col>
    <el-col :xs="12" :sm="10" :md="8" :lg="6" class="col-right">
      <el-form class="login-form" ref="form" :model="itemModel" size="medium">
        <h2 class="title">登录账号</h2>
        <el-form-item prop="username">
          <el-input v-model="itemModel.username" clearable :autofocus="!itemModel.username">
            <i slot="prefix" class="fas fa-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" class="mar-t-md">
          <el-input v-model="itemModel.password" :type="isSee ? 'text' : 'password'">
            <i slot="prefix" class="fas fa-key"></i>
            <i slot="suffix" :class="`el-input__icon fas fa-${isSee ? 'eye' : 'eye-slash'}`"
              @click="isSee = !isSee"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="itemModel.remember">下次自动登录</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            :loading="loading"
            :disabled="isLoginValid"
            @click="onClickLogin()">{{ `登录${loading ? '中' : ''}` }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      isSee: false,
      loading: false,
      itemModel: {
        password: '11111',
        username: 'sinoyd',
        // remember: false,
      },
    };
  },
  computed: {
    isLoginValid() {
      return !this.itemModel.username || !this.itemModel.password;
    },
  },
  methods: {
    onClickLogin() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        this.$store.dispatch('auth/Login', this.itemModel)
          .then(() => {
            this.$router.push('/');
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
  },
};
</script>
