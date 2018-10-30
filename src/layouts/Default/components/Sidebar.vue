<!-- 侧栏导航 -->
<template>
  <aside :class="{ 'is-extend': isCollapse }">
    <button class="u-collapse" @click="onToggleSide()">
      <i :class="`fas fa-${ isCollapse ? 'outdent' : 'indent' }`"></i>
    </button>
    <el-menu
      unique-opened
      :collapse="!isCollapse"
      :default-active="$route.name || 'index'">
      <template v-for="item in sideMenu">
        <el-submenu
          v-if="item.children && item.children.length > 1"
          :key="item.name"
          :index="item.name"
          :class="{ 'is-active': $route.path.includes(item.name) }">
          <template slot="title">
            <i :class="`fa${item.meta.icon}`"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </template>
          <template v-for="subItem in item.children">
            <el-submenu
              v-if="subItem.children && subItem.children.length"
              :key="subItem.name"
              :index="subItem.name">
              <span slot="title">{{ subItem.meta.title }}</span>
              <el-menu-item
                v-for="subChildItem in subItem.children"
                :key="subChildItem.name"
                :index="subChildItem.name"
                @click="$router.push({ name: subChildItem.name })">{{ subChildItem.meta.title }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="subItem.name" :index="subItem.name">
              <div @click="$router.push({ name: subItem.name })">{{ subItem.meta.title }}</div>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item
          v-else :index="item.name"
          :key="item.name"
          :class="{ 'is-active': $route.path.includes(item.name) }">
          <div @click="$router.push({ name: item.name })">
            <i :class="`fa${item.meta.icon}`"></i>
            <span>{{ item.meta.title }}</span>
          </div>
        </el-menu-item>
      </template>
    </el-menu>
  </aside>
</template>

<script>

export default {
  computed: {
    isCollapse() {
      return this.$store.state.isCollapseSide;
    },
    // 侧栏菜单
    sideMenu() {
      return this.$store.getters['auth/sideMenu'];
    },
  },
  methods: {
    onToggleSide() {
      this.$store.commit('SetIsCollapseSide', !this.isCollapse);
    },
  },
};
</script>
