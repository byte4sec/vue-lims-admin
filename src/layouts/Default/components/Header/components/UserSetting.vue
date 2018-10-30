<!-- 用户信息 -->
<template>
  <div class="g-user">
    <el-dropdown>
      <span class="el-dropdown-link">{{ name }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <i class="fas fa-sign-out-alt"></i>
          <span @click="onClickLogout()">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

export default {
  computed: {
    name() {
      return this.$store.state.auth.name || '';
    },
  },
  methods: {
    onClickLogout() {
      this.$store.commit('auth/Logout');
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style lang="scss">
  .user-setting {
    > span {
      display: inline-block;
      margin-left: 10px;
      color: #fff;
    }
    span.logout {
      cursor: pointer;
    }
  }
</style>

