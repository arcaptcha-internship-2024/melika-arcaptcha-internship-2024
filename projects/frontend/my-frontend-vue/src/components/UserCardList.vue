<template>
  <div class="userCard-list">
    <div v-for="manager in salesManagers" :key="manager.email">
        <UserCard :user="manager"/>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import UserCard from '../components/UserCard.vue'
export default {
    components:{
        UserCard
    },
    setup(){
        const length = ref(0)
        const salesManagers = ref([])
        const jwtToken = localStorage.getItem('jwtToken');
        fetch('http://localhost:3000/getSalesManagers',{
            method:"GET",
            headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${jwtToken}`
            }
        }).then(response => response.json()).then(
            data => {
            salesManagers.value = data
            length.value = salesManagers.value.length
            console.log("this is sales managers",salesManagers)
            }
        )
        
    return {salesManagers}
    }
}
</script>

<style>
.userCard-list{
    width: 80%;
    display: inline-block;
    justify-content: center;
}
</style>