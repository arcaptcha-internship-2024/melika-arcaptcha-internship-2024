<template>
  <h1>{{title}}</h1>
  <button @click.shift="toggleModal">Show Modal</button>
  <button @click="toggleModalTwo">Show Modal Two</button>
  <teleport to=".modals" v-if="showModal">
    <Modal theme="salew" @close="toggleModal">
      <h1>{{header}}</h1>
      <p>{{text}}</p>

      <template v-slot:links>
        <a href="#">Sign up</a>
        <a href="#">More Info</a>
      </template>
    </Modal>
  </teleport>
  <teleport to=".modals" v-if="showModalTwo">
    <Modal theme="sale" @close="toggleModalTwo">
      <h1>This is a new Modal!!</h1>
      <p>This is a new Text! Can you Believe it?!</p>
    </Modal>
  </teleport>
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
      showModal: false,
      showModalTwo: false
    }
  },
  components:{
    Modal
  },
  methods:{
    toggleModal(){
      this.showModal = !this.showModal
    },
    toggleModalTwo(){
      this.showModalTwo = !this.showModalTwo
    }
  }
}
</script>

<style>
#app, .modals {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
