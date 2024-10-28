<template>
  
  <div class="userCard-list">
    <button class="download-btn" @click="downloadUsers">Download</button>
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

        const downloadUsers = async () => {
            console.log('ajshdflkahfdhslkdhfj;ashdf;ahsdf;jas;dfkja;sldjkf')
            fetch('http://localhost:3000/downloadUsersList',{
                method:"GET",
                headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${jwtToken}`
                }
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                // Create a link element
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'user.json'); // Download attribute
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link); // Clean up the DOM
            })
            .catch(error => {
                console.error('There was a problem with the download:', error);
            });
        }
        return {users, role, downloadUsers}
    }
}
</script>

<style>
.userCard-list{
    width: 80%;
    display: inline-block;
    justify-content: center;
}
.download-btn{
    width: 10%; 
}
</style>