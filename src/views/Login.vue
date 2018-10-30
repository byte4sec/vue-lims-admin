<template>
  <div class="login-wrap">
    <el-form class="login-form" ref="loginForm" :model="loginModel">
      <h3 class="title">System Login</h3>
      <el-form-item prop="username">
        <el-input v-model="loginModel.username" clearable :autofocus="!loginModel.username">
          <i slot="prefix" class="fas fa-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginModel.password" :type="isSee ? 'text' : 'password'">
          <i slot="prefix" class="fas fa-key"></i>
          <i slot="suffix" :class="`el-input__icon fas fa-${isSee ? 'eye' : 'eye-slash'}`" @click="isSee = !isSee"></i>
        </el-input>
      </el-form-item>
      <el-checkbox v-model="loginModel.remember" class="remember">Remember Me</el-checkbox>
      <el-button
        type="primary"
        style="width: 100%"
        :loading="loading"
        :disabled="isLoginValid"
        @click.native.prevent="onClickLogin()">Sign in
      </el-button>
      <div class="qr">第三方登陆：
        <i class="fab fa-qq"></i>
        <i class="fab fa-weixin"></i>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      isSee: false,
      loading: false,
      loginModel: {
        password: '11111',
        username: 'sinoyd',
        // remember: false,
      },
    };
  },
  computed: {
    isLoginValid() {
      return !this.loginModel.username || !this.loginModel.password;
    },
  },
  methods: {
    onClickLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (!valid) return;
        this.loading = true;
        this.$store.dispatch('auth/Login', this.loginModel)
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

<style scoped lang="scss">
  // login
  $login-bg: #2d3a4b;
  $login-drak: #889aa4;
  $login-light: #eee;

  .login-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: $login-bg;
  }
  .login-wrap .title {
    margin: 0 auto 40px;
    font-size: 26px;
    font-weight: 400;
    text-align: center;
    color: $login-light;
  }
  .login-wrap .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 350px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .login-wrap input {
    color: $login-light;
    background: transparent;
    border: none;
    border-radius: 0;
    -webkit-appearance: none;
    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px $login-bg inset !important;
      -webkit-text-fill-color: #fff !important;
    }
  }
  .login-wrap .remember {
    margin-bottom: 20px;
    color: #eee;
  }
  .login-wrap .qr {
    margin-top: 10px;
    line-height: 40px;
    color: #eee;
    .fab {
      font-size: 20px;
      margin-left: 20px;
      cursor: pointer;
    }
    .fa-qq {
      color: #66B1FF;
    }
    .fa-weixin {
      color: #91DE59;
    }
  }
</style>
