<template>
  <div class="container">
    <div v-for="item in tvList.results" :key="item.id">{{item.name}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {ROUTE_NAME} from '../router/index';
import {ITv} from '../interfaces/tv.interfaces'
 @Component({
  components: {},
})

export default class TvPage extends Vue  {

  async mounted() {
   await this.$store.dispatch('tv/getTv', 1);
  }

  get tvList(): ITv.ItvList[] {
    return this.$store.state.tv.tvList;
  }

}
</script>

<style>

</style>