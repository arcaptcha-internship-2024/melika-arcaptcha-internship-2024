<template>
  <div class="user-card">
    <h1>{{user.email}}</h1>
    <h2>{{user.role}}</h2>

    <h1>{{user.name}}</h1>
    <p>{{user.companyName}}</p>
    <div class="actions">
        <router-link class="no-style" :to="{name: 'userDetail', params: {id: user.id}, query: {action: 'read',filePath: filePath}}">
            <button class="action-button" @click="addLogs('read')">Read</button>
        </router-link>
        <button class="action-button" @click="deleteUser" v-if="deleteAccess">Delete</button>
        <router-link class="no-style" :to="{name : 'userDetail', params:{id: user.id}, query:{action: 'update', filePath: filePath}}">
            <button class="action-button">Update</button>
        </router-link>
    </div>
  </div>
  
</template>

<script>
import {ref} from 'vue'
import {jwtDecode} from 'jwt-decode'

export default {
    props:['user', 'role'],
    setup(props){
      const deleteAccess = ref(false)
      if(props.role === 'admin'){
          deleteAccess.value = true
      }
      const filePath = ref('customers')
      if(props.user.email){
        filePath.value = 'users'
      }
      const deleteUser = async()=>{
        const jwtToken = localStorage.getItem('jwtToken');
        let tableName = filePath.value
        console.log('hi:', props.user.id,'tableName : ',tableName)
        addLogs('delete')
        
        fetch('http://localhost:3000/api/user/delete',{
          method: "DELETE",
          headers: {
          'Content-Type': 'application/json', // Send as JSON
          'Authorization': `Bearer ${jwtToken}`, 
          'x-file-path': tableName// Include token for authentication
        },
        body: JSON.stringify({ id: props.user.id }),
        }).then(response => response.json()).then(
          data => {
            if (data.success){
              alert(data.message)
              window.location.reload();
              
            }else{
              alert(data.message)
              window.location.reload();
            }
          }
        )
      }

      const addLogs = async(action) =>{
        const jwtToken = localStorage.getItem('jwtToken');
        const decodedToken = jwtDecode(jwtToken);
        const role = decodedToken.role
        const email = decodedToken.email
  
        let name = props.user.name
        if(props.user.email){
          name = props.user.email
        }
        // const action = "read"

        fetch("http://localhost:3000/api/logs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ email, role, name, action }),
      }); 


      }
      return {deleteAccess, deleteUser, addLogs, filePath}
  }
}
</script>

<style>
.user-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
/* .user-card:hover {
  background-color: #e0e0e0;
} */
.actions {
  display: flex;
  justify-content: start; /* Ensures even spacing between buttons */
  align-items: center;
  padding: 10px;
  gap: 10px; /* Add spacing between the buttons */
}
.action-button {
  width: 10%; /* Each button takes 10% of the parent container's width */
  min-width: 80px; /* Set a minimum width to prevent buttons from becoming too small on narrow screens */
}
.no-style {
  text-decoration: none; /* Remove underline from link */
  color: inherit; /* Ensure the text color inside the link inherits from the button */
  display: contents; /* Keeps the router-link from affecting the layout */
  padding: 0; /* Reset padding */
  margin: 0; /* Reset margin */
}
</style>