<template>
  <div class="container">
    <filters/>
    <PopularFilms/>
    <pagination v-if="filmsPagention"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PopularFilms from '@/components/popular-films.vue';
import filters from '@/components/filtrs.vue';
import pagination from '@/components/pagenation.vue';

@Component({
  components: {
    PopularFilms,
    filters,
    pagination,
  },
})
export default class indexPage extends Vue {
  get filmsPagention (): number {
    return this.$store.state.movie.filmsList.total_pages;
  }
}
</script>

<style>

</style>