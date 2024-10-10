<template>
  <div class="home">
    <h1>Home</h1>
    <p ref="p">My name is {{name}} and I'm {{age}} years old!</p>
    <button @click="handleClick">Click me</button>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name: 'HomeView',
  setup(){
    let age = 23
    let name = 'Melika'
    let p = ref(null)

    const handleClick = () => {
      console.log('You clicked me!')
      console.log(p.value)
      p.value.classList.add('test')
      p.value.textContent = 'Hello Melika!!'
    }
    return{age, name, handleClick, p}
  }
}
</script>
