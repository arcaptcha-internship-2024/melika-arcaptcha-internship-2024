<template>
  <div>
    <h1>{{user.name}}</h1>
    <h2>{{user.companyName}}</h2>
    <h2>{{user.jobPosition}}</h2>
    <h3>{{user.phoneNumber}}</h3>
    <p>{{user.explanation}}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
    props:['id'],
    setup(props){
        console.log('this is id: ',props.id)
        const jwtToken = localStorage.getItem('jwtToken');
        const user = ref({})
        const users = ref([])
        fetch('http://localhost:3000/getUsers',{
            method:"GET",
            headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${jwtToken}`
            }
        }).then(response => response.json()).then(
            data => {
                users.value = data
                const foundUser = users.value.find(user => user.id === props.id)
                if(foundUser){
                    user.value = foundUser
                }
            }
        )

        

        
        return{user}

    }
}
</script>

<style>

</style>