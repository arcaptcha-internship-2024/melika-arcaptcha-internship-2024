<template>
  <nav>
    <router-link :to="{name: 'registerUser'}" class="registerUser-link">
      <button class="registerUser-button">Register User</button>
    </router-link>
    <button class="toggle-button">Users</button>
    <button class="toggle-button" @click="toggleShowSalesManager">Sales Managers</button>
  </nav>
  <div v-if="showSalesManagers">
    <UserCardList />
  </div>
</template>

<script>
import {ref, watch} from 'vue'
import UserCardList from '../components/UserCardList.vue'
import UserCard from '../components/UserCard.vue'
export default {
  components: {UserCardList, UserCard},
  setup(){
    const showSalesManagers = ref(false)
    const toggleShowSalesManager = () => {
      showSalesManagers.value = !showSalesManagers.value
    }
    
    return{showSalesManagers,toggleShowSalesManager}
  }
}
</script>

<style>
nav{
  display: flex;

}
.registerUser-link, .toggle-button{
  display: inline-block;
  width: 10%;
}
.registerUser-button{
  width: 100%;
}
.toggle-button{
  width: 40%;
  margin: 0 10px 0 10px
}
</style>