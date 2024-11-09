<template>
    <div class="login-form">
        <UserForm :buttonContent="buttonContent" :headerContent="headerContent" :multiRole="false" :isCaptchaRequired="true"/>
    </div>
</template>

<script>
import UserForm from '../components/UserForm.vue'
export default {
    name:'LoginView',
    components:{
        UserForm
    },
    setup(){
        localStorage.removeItem('jwtToken')
        const headerContent = "Login to Your Account"
        const buttonContent = "Login"
        return{headerContent, buttonContent}
    }
}
</script>

<style>
.login-form {
    max-width: 400px;
    width: 100%;
    display: flex;
    justify-content: center; /* Horizontally center the form */
    align-items: center; /* Vertically center the form */
    height: 90vh;
    margin: 0 auto; 
}

</style>