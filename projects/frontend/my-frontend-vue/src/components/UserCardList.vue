<template>
  <div class="userCard-list">
    <button class="download-btn" @click="downloadUsers">Download</button>
     <SearchBar v-if="!isSalesManager" @updateFilters="handleUpdateFilters"/>
    <div v-if="isSalesManager">
        <div v-for="user in users" :key="user.email">
            <UserCard :user="user" :role="role"/>
        </div>
    </div>
    <div v-else>
        <div v-for="user in filteredUsers" :key="user.name">
            <UserCard :user="user" :role="role"/> 
        </div>
    </div>
  </div>
</template>

<script>
import {ref, computed} from 'vue'
import UserCard from '../components/UserCard.vue'
import SearchBar from '../components/SearchBar.vue'
export default {
    components:{
        UserCard,
        SearchBar
    },
    props:['path','isSalesManager','role'],
    setup(props){
        const filters= ref({
            name: "",
            phoneNumber: "",
            status: ""
        })
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
                console.log("heyyyy",data)
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

        const handleUpdateFilters = (newFilters) => {
            filters.value = newFilters;
        };

        const filteredUsers = computed(() => {
            return users.value.filter((user) => {
                const matchesName = filters.value.name ? user.name.toLowerCase().includes(filters.value.name.toLowerCase()) : true;
                const matchesPhoneNumber = filters.value.phoneNumber ? user.phoneNumber.includes(filters.value.phoneNumber) : true;
                const matchesStatus = filters.value.status ? user.status === filters.value.status : true;

                return matchesName && matchesPhoneNumber && matchesStatus;
            });
        });
        // console.log('this is filtered users:',filteredUsers)

        return {users, role, downloadUsers, filters, handleUpdateFilters, filteredUsers}
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