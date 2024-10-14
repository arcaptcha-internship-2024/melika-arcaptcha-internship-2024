<template>
    <div class="login-page">
        <MyForm :formFields="loginFields" class="login-form" :buttonContent="buttonContent" :headerContent="headerContent"/>
    </div>
  
</template>

<script>
import MyForm from '../components/MyForm.vue'
export default {
    name:'LoginView',
    components:{
        MyForm
    },
    setup(){
        const loginFields = [
            {id: "email", type: "email", rows: "", placeholder: "Your email", label: "Email: ", isRequired: true, fieldType:"input"},
            {id: "password", type: "password", rows: "", placeholder: "Your password", label: "Password: ", isRequired: true, fieldType:"input"},
        ]
        const headerContent = "Login to Your Account"
        const buttonContent = "Login"
        return {loginFields, headerContent, buttonContent}
    }
}
</script>

<style>
.login-page{
  width: 100%;
  display: flex;
  justify-content: center;
}
.login-page .login-form{
    max-width: 400px;
}
</style>