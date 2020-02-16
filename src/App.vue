<template>
  <div id="app" class="main-wrap">
    <div class="main-header">
      <TopNavigation/>
    </div>
    <div class="main-content">
      <el-container>
         <router-view></router-view>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TopNavigation from  '@/views/navigation.vue'

@Component({
  components: {
    TopNavigation,
  },
})
export default class App extends Vue {

}
</script>

<style lang="less">
.main-wrap {
  width: 100%;
  height: 100%;
}
</style>
