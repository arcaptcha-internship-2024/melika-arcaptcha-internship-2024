<template>
    <div class="register-form">
        <UserForm :buttonContent="buttonContent" :headerContent="headerContent" />
    </div>
</template>

<script>
import UserForm from '../components/UserForm.vue'
export default {
    name:'RegisterUserView',
    components:{
        UserForm
    },
    setup(){
        const headerContent = "Register User"
        const buttonContent = "Register"
        return{headerContent, buttonContent}
    }
}
</script>

<style>
.register-form {
    max-width: 400px;
    width: 100%;
    display: flex;
    justify-content: center; /* Horizontally center the form */
    align-items: center; /* Vertically center the form */
    height: 90vh;
    margin: 0 auto; 
}

</style>