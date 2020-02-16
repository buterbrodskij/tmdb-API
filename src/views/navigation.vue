<template>
  <div class="nav-wrap">
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
      <el-menu-item index="main"><router-link to="/">Главная</router-link></el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class TopNavigation extends Vue {
  activeIndex: string = 'main';

  handleSelect(key: number, keyPath: string[]) {
    console.log(key, keyPath);
  }
}
</script>


<style lang="less">
</style>