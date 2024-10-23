<template>
  <div class="userCard-list">
    <div v-if="isSalesManager">
        <div v-for="user in users" :key="user.email">
            <UserCard :user="user" :role="role"/>
        </div>
    </div>
    <div v-else>
        <div v-for="user in users" :key="user.name">
            <UserCard :user="user" :role="role"/> 
        </div>
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
    props:['path','isSalesManager','role'],
    setup(props){
        const length = ref(0)
        const users = ref([])
        const role = ref('')
        const jwtToken = localStorage.getItem('jwtToken');
        fetch(props.path,{
            method:"GET",
            headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${jwtToken}`
            }
        }).then(response => response.json()).then(
            data => {
                console.log(data)
                users.value = data
                length.value = users.value.length
            }
        )
        if(props.role === 'admin'){
            role.value = 'admin'
        }else{
            role.value = 'sales_manager'
        }
        return {users, role}
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