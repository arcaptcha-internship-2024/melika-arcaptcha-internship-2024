<template>
  <div>
    <nav class="nav-container">
      <router-link :to="{name: 'Logs'}">
        <button class="register-button">View Logs</button>
      </router-link>
        <button class="my-logout" @click="logout">Log Out</button>
    </nav>
    <div class="create">
      <router-link class="no-style" :to="{name: 'create'}">
        <button class="create-button">Create</button> 
      </router-link>
    </div>
    <div>
      <UserCardList :path="usersPath" :isSalesManager="false" :role="role"/>
    </div>

  </div>
</template>

<script> 
import {ref, watch} from 'vue'
import UserCardList from '../components/UserCardList.vue'
import UserCard from '../components/UserCard.vue'
export default {
  components: {UserCardList, UserCard},
  setup(){
    const role = ref('sales_manager')
    const showUsers = ref(false)
    const usersPath = ref('customers')
    const toggle = () => {
      showUsers.value = !showUsers.value
    }
    
    const logout = () => {
      localStorage.removeItem('jwtToken')
      router.push('/login')
    }
    return{toggle,showUsers, usersPath, role,logout}
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
.registerUser-button, .logout-button{
  width: 100%;
}
.toggle-button{
  width: 35%;
  margin: 0 10px 0 10px
}
.logout-button{
  margin-left: 10px;
}
.create{
  margin-top: 10px;
  display: flex;
}
.create-button{
  display: inline-block;
  width: 10%;
}
</style>