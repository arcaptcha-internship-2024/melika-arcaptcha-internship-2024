<template>
  <div class="home">
    <h1>Home</h1>
    <input type="text" v-model="search">
    <p>search term: {{search}}</p>
    <div v-for="name in matchedNames" :key="name">
      {{name}}
    </div>
  </div>
</template>

<script>
import {computed, reactive, ref} from 'vue'
export default {
  name: 'HomeView',
  setup(){
    const search = ref('')
    const names = ref(['melika','nima','rojin','maryam','ali','fatemeh','mojan','sara'])
    const matchedNames = computed(() => {
      return names.value.filter((name) => name.includes(search.value))
    })
    return{search,names,matchedNames}
  }
}
</script>
