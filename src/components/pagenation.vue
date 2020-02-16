<template>
  <div class="pogination">
    <el-pagination
      layout="prev, pager, next"
      background
      :current-page.sync="filmsPagention.page"
      @current-change="poginationClick"
      @click="poginationClick"
      :total="filmsPagention.total_pages">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {bus} from '../plugins/bus';
import {IFilters} from '../interfaces/filters.interfaces'
 @Component({
  components: {},
})
export default class Pagination extends Vue {
searchQuery: string;
  mounted() {
    bus.$on('filters:search', (queru: string) => this.setSearchQuery(queru))
  }

  setSearchQuery(queru) {
    this.searchQuery = queru;
  }

  async poginationClick(val: number) {
    if (this.searchQuery !== '') {
      await this.$store.dispatch('movie/getFilmsOnSearch', {query: this.searchQuery, page: val});
      return
    }
    await this.$store.dispatch('movie/getFilms', val);
  }

  get filmsPagention (): number {
    return this.$store.state.movie.filmsList;
  }

  get activeType(): IFilters.FiltersType {
    return this.$store.state.movie.activeType;
  }
}
</script>

<style lang="less">
  .pogination {
    display: flex;
    margin-top: 40px;
    justify-content: center;
  }
</style>