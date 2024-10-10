<template>
  <div class="home">
    <h1>Home</h1>
    <h2>Refs</h2>
    <p>My name is {{ninjaOne.name}} and I'm {{ninjaOne.age}} years old!</p>
    <button @click="updateNinjaOne">Update Ninja one</button>
    
    <h2>Reactive</h2>
    <p>{{ninjaTwo.name}} - {{ninjaTwo.age}}</p>
    <button @click="updateNinjaTwo">Update Ninja two</button>
  </div>
</template>

<script>
import {reactive, ref} from 'vue'
export default {
  name: 'HomeView',
  setup(){
    const ninjaOne = ref({name: 'Melika', age: 23})
    const ninjaTwo = reactive({name: 'Nima', age: 21})

    //this is a primitive value and you can't change it  it's better to use refs all the time
    const name = reactive('Rojin')

    const updateNinjaOne = () => {
      ninjaOne.value.age += 10
    }
    const updateNinjaTwo = () => {
      ninjaTwo.age += 10
    }
    return{ninjaOne, updateNinjaOne, updateNinjaTwo, ninjaTwo}
  }
}
</script>
