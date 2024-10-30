<template>
  <div class="search-bar">
      <input
        type="text" 
        v-model="filters.name"
        @input="emitFilters"
        placeholder="Search by name" 
      />
      
      <input
        type="text"
        v-model="filters.phoneNumber"
        @input="emitFilters"
        placeholder="Search by phone number" 
      />

      <select @change="emitFilters" v-model="filters.status">
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    setup(_,{emit}){
        const filters = ref({
            name: "",
            phoneNumber: "",
            status: ""
        })
        const emitFilters = () => {
            emit("updateFilters", filters.value)
        }
        return {filters, emitFilters}
    }
}
</script>

<style>
.search-bar {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}
</style>