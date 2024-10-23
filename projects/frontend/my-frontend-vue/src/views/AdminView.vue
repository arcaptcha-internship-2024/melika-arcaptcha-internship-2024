<template>
  <nav class="nav-container">
    <router-link :to="{name: 'registerUser'}" class="registerUser-link">
      <button class="registerUser-button">Register User</button>
    </router-link>
    <button class="toggle-button" @click="toggle('users')">Users</button>
    <button class="toggle-button" @click="toggle('showSalesManagers')">Sales Managers</button>
    <router-link>
      <button class="register-button">View Logs</button>
    </router-link>
    <router-link>
      <button class="logout-button">Log Out</button>
    </router-link>
  </nav>
  <div v-if="showSalesManagers">
    <UserCardList :path="salesManagersPath" :isSalesManager="true"/>
  </div>
  <div v-if="showUsers">
    <UserCardList :path="usersPath" :isSalesManager="false"/>
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
    const showUsers = ref(false)
    const salesManagersPath = ref('http://localhost:3000/getSalesManagers')
    const usersPath = ref('http://localhost:3000/getUsers')
    const toggle = (showList) => {
      if(showList === 'users'){
        showUsers.value = !showUsers.value
        if(showUsers.value){
          showSalesManagers.value = false
        }
      }
      else{
        showSalesManagers.value = !showSalesManagers.value
        if(showSalesManagers.value){
          showUsers.value = false
        }
      }

    }
    
    return{showSalesManagers,toggle, salesManagersPath,showUsers, usersPath}
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
</style>