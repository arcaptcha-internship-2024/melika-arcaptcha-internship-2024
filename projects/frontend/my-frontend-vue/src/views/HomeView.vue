<template>
  <div class="home">
    <MyForm />
  </div>
</template>

<script>
import InputGroup from '../components/InputGroup.vue'
import MyForm from '../components/MyForm.vue'
export default {
  name: 'HomeView',
  components: {
    InputGroup,
    MyForm
  }
  
}
</script>

<style >
.home{
  width: 100%;
  display: flex;
  justify-content: center;
}

</style>