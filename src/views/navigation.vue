<template>
  <div class="nav-wrap">
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
      <el-menu-item index="main"><router-link to="/">Фильмы</router-link></el-menu-item>
      <el-menu-item index="TV"><router-link :to="routerNane.TV">TV</router-link></el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {ROUTE_NAME} from '../router/index';

@Component({
  components: {},
})
export default class TopNavigation extends Vue {
  routerNane = ROUTE_NAME;
}
</script>


<style lang="less">
.el-menu-item {
  a{ 
    display: block;
    height: 100%;
    width: 100%;
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
}
</style>