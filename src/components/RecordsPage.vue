<template>
  <div class="records-page">
    <h1 class="page-title">Records</h1>
    <SearchBar
      :searchTerm="searchTerm"
      @search="updateSearch"
    />
    <RecordsTable
      :records="records"
      :loading="loading"
      :sortField="sortField"
      :sortOrder="sortOrder"
      @toggleSort="toggleSort"
      @deleteRecord="softDeleteRecord"
    />
    <PaginationControls
      v-if="totalPages > 0"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :totalRecords="totalRecords"
      :perPage="perPage"
      @changePage="changePage"
      @changePerPage="changePerPage"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRecords } from '../composables/useRecords'
import SearchBar from './records/SearchBar.vue'
import RecordsTable from './records/RecordsTable.vue'
import PaginationControls from './records/PaginationControls.vue'

const {
  records,
  searchTerm,
  currentPage,
  totalPages,
  totalRecords,
  perPage,
  loading,
  sortField,
  sortOrder,
  updateSearch,
  changePage,
  changePerPage,
  toggleSort,
  softDeleteRecord,
  fetchRecords
} = useRecords()

onMounted(fetchRecords)
</script>

<style scoped>
.records-page{
  max-height: 100vh;
  overflow-y: auto;
}
</style>