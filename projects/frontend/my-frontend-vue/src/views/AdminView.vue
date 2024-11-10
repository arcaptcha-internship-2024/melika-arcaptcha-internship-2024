<template>
  <div>
    <nav class="nav-container">
      <router-link :to="{name: 'registerUser'}" class="registerUser-link">
        <button class="registerUser-button">Register User</button>
      </router-link>
      <button class="toggle-button" @click="toggle('users')">Users</button>
      <button class="toggle-button" @click="toggle('showSalesManagers')">Sales Managers</button>
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
    <div v-if="showSalesManagers">
      <UserCardList :path="salesManagersPath" :isSalesManager="true" :role="role"/>
    </div>
    <div v-if="showUsers">
      <UserCardList :path="usersPath" :isSalesManager="false" :role="role"/>
    </div>
  </div>
</template>

<script>
import {ref, watch} from 'vue'
import UserCardList from '../components/UserCardList.vue'
import UserCard from '../components/UserCard.vue'
import { useRouter } from 'vue-router';
export default {
  components: {UserCardList, UserCard},
  setup(){
    const role = ref('admin')
    const showSalesManagers = ref(false)
    const showUsers = ref(false)
    const salesManagersPath = ref('./database/users.json')
    const usersPath = ref('./database/customers.json')
    const router = useRouter();

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


    const logout = () => {
      localStorage.removeItem('jwtToken')
      router.push('/login')
    }
    
    return{showSalesManagers,toggle, salesManagersPath,showUsers, usersPath, role,logout}
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
.my-logout{
  margin-left: 10px;
  width: 8%;
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