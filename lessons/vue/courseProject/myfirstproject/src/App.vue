<template>
  <h1>{{title}}</h1>
  <button @click.shift="toggleModal">Show Modal</button>
  <div v-if="showModal">
    <Modal theme="salew" @close="toggleModal">
      <!-- <h1>{{header}}</h1>
      <p>{{text}}</p> -->

      <template v-slot:links>
        <a href="#">Sign up</a>
        <a href="#">More Info</a>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from './components/Modal.vue'
export default {
  name: 'App',
  data(){
    return{
      title: 'My First Vue App :)',
      header: 'Header From Parent Component!',
      text: 'this is a text from parent component!!',
      showModal: false
    }
  },
  components:{
    Modal
  },
  methods:{
    toggleModal(){
      this.showModal = !this.showModal
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
