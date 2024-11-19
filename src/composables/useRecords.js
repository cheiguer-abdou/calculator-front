import { ref } from 'vue'
import debounce from 'lodash/debounce'
import { getCurrentUser } from 'aws-amplify/auth'
import api from '../utils/axios'

export function useRecords() {
  const username = ref("")
  const records = ref([])
  const searchTerm = ref('')
  const currentPage = ref(1)
  const totalPages = ref(0)
  const totalRecords = ref(0)
  const perPage = ref(10)
  const loading = ref(false)
  const sortField = ref('date')
  const sortOrder = ref('desc')

  const operationTypes = [
    'addition',
    'subtraction',
    'multiplication',
    'division',
    'square_root',
    'random_string'
  ]

  const parseSearchTerm = (term) => {
    if (!term) return {}
    
    const lowercaseTerm = term.toLowerCase().trim()
    const filters = {}

    if (operationTypes.some(type => type.includes(lowercaseTerm))) {
      filters.operation_type = lowercaseTerm
    }
    
    if (term.match(/\d/)) {
      filters.amount = term
    }

    return filters
  }

  const fetchRecords = async () => {
    loading.value = true
    try {
      const filters = parseSearchTerm(searchTerm.value)
      const user = await getCurrentUser()
      username.value = user.username

      const params = new URLSearchParams({
        user_id: username.value,
        page: currentPage.value.toString(),
        per_page: perPage.value.toString(),
        'sort[field]': sortField.value,
        'sort[order]': sortOrder.value
      })

      if (filters.amount) {
        params.append('filter_amount', filters.amount)
      }
      if (filters.operation_type) {
        params.append('filter_operation_type', filters.operation_type)
      }

      const response = await api.get('/records', { params })
      
      if (response.data.data) {
        records.value = response.data.data
        totalPages.value = response.data.pagination.total_pages
        totalRecords.value = response.data.pagination.total
      }
    } catch (error) {
      console.error('Failed to fetch records:', error)
    } finally {
      loading.value = false
    }
  }

  const debouncedFetch = debounce(fetchRecords, 300)

  const updateSearch = (value) => {
    searchTerm.value = value
    currentPage.value = 1 // Reset to first page on new search
    debouncedFetch()
  }

  const changePage = (page) => {
    currentPage.value = page
    fetchRecords()
  }

  const changePerPage = (newPerPage) => {
    perPage.value = newPerPage
    currentPage.value = 1 // Reset to first page when changing per page
    fetchRecords()
  }

  const toggleSort = (field) => {
    if (sortField.value === field) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortField.value = field
      sortOrder.value = 'desc'
    }
    fetchRecords()
  }

  const softDeleteRecord = async (id) => {
    try {
      await api.put(`/soft-delete/${id}`, {user_id: username.value})
      fetchRecords()
    } catch (error) {
      console.error('Failed to delete record:', error.response.data.message)
    }
  }

  return {
    // State
    records,
    searchTerm,
    currentPage,
    totalPages,
    totalRecords,
    perPage,
    loading,
    sortField,
    sortOrder,
    
    // Methods
    updateSearch,
    changePage,
    changePerPage,
    toggleSort,
    softDeleteRecord,
    fetchRecords
  }
}