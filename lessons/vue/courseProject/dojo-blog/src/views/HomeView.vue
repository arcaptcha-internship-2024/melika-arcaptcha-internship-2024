<template>
  <div class="home">
    <h1>Home</h1>
    <input type="text" v-model="search">
    <p>search term: {{search}}</p>
    <div v-for="name in matchedNames" :key="name">
      {{name}}
    </div>
    <button @click="handleClick">Stop</button>
  </div>
</template>

<script>
import {computed, reactive, ref, watch, watchEffect} from 'vue'
export default {
  name: 'HomeView',
  setup(){
    const search = ref('')
    const names = ref(['melika','nima','rojin','maryam','ali','fatemeh','mojan','sara'])

    const stopWatch = watch(search, () => {
      console.log('watch function ran')
    })
    const stopEffect = watchEffect(() => {
      console.log('watchEffect function ran!',search.value)
    })

    const handleClick = () => {
      stopWatch()
      stopEffect()
    }
    const matchedNames = computed(() => {
      return names.value.filter((name) => name.includes(search.value))
    })
    return{search,names,matchedNames,handleClick}
  }
}
</script>
