<template>
  <div class="home">
    <h1>Home</h1>
    <p>My name is {{name}} and I'm {{age}} years old!</p>
    <button @click="handleClick">Click me</button>
    <input type="text" v-model="name">
    <button @click="age++">Increase Age</button>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name: 'HomeView',
  setup(){
    const age = ref(23)
    const name = ref('Melika')

    const handleClick = () => {
      name.value = 'Nima'
      age.value = 21
    }
    return{age, name, handleClick}
  }
}
</script>
