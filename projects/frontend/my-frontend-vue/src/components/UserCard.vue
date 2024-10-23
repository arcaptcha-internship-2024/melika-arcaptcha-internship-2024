<template>
  <div class="user-card">
    <h1>{{user.email}}</h1>
    <p>{{user.password}}</p>

    <h1>{{user.name}}</h1>
    <p>{{user.companyName}}</p>
    <div class="actions">
        <router-link class="no-style" :to="{name: 'userDetail', params: {id: user.id}}">
            <button class="action-button">Read</button>
        </router-link>
        <button class="action-button" v-if="deleteAccess">Delete</button>
        <router-link class="no-style">
            <button class="action-button">Update</button>
        </router-link>
        
    </div>
  </div>
  
</template>

<script>
import {ref} from 'vue'
export default {
    props:['user', 'role'],
    setup(props){
        const deleteAccess = ref(false)
        if(props.role === 'admin'){
            deleteAccess.value = true
        }
        return {deleteAccess}
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