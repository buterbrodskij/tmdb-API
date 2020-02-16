<template>
  <div class="filters">
  <div class="filters__select">
    <el-select v-model="selectType" @change="selectFilters" placeholder="Select">
      <el-option
        v-for="item in typeArr"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>
  <div class="filters__search">
     <el-input
      placeholder="search"
      prefix-icon="el-icon-search"
      :clearable="true"
      @change="searchFilms"
      :debounce="500"
      v-model="searchText">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator';
import {Movie} from '../interfaces/movie.interfaces';
import {bus} from '../plugins/bus'
import {IFilters} from '../interfaces/filters.interfaces'
@Component({
  components: {},
})
export default class filters extends Vue {
filtersType = IFilters.FiltersType;
typeArr:  IFilters.FiltersType[] = 
[
  IFilters.FiltersType.POPULAR_FILMS, 
  IFilters.FiltersType.TOP_RATE, 
  IFilters.FiltersType.UPCOMING_FILMS
];
selectType: IFilters.FiltersType = IFilters.FiltersType.POPULAR_FILMS;
page: number = 1;
searchText: string = '';

 async mounted() {
    await this.$store.dispatch('movie/getFilms', this.page)
  }
 async selectFilters(type) {
   this.$store.commit('movie/setParameters', {name: 'activeType', value: type});
   await this.$store.dispatch('movie/getFilms', this.page);
   this.searchText = '';
   bus.$emit('filters:search', this.searchText);
  }

 async searchFilms() {
   if (this.searchText !== '') {
     await this.$store.dispatch('movie/getFilmsOnSearch', {query: this.searchText, page: 1})
     bus.$emit('filters:search', this.searchText);
   } else {
      bus.$emit('filters:search', this.searchText);
      await this.$store.dispatch('movie/getFilms', IFilters.FiltersType.POPULAR_FILMS);
   }
  }
}
</script>

<style lang="less">
.filters {
  padding-top: 20px;
  display: flex;
  
  &__search {
    width: 60%;
    margin-left: auto;
  }
}
</style>