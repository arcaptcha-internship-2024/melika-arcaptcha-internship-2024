<template>
    <div class="login-page">
        <MyForm :formFields="loginFields" class="login-form" :buttonContent="buttonContent" :headerContent="headerContent" :multiRole="multiRole" :selectInfo="selectInfo"/>
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
        const multiRole = true
        const selectInfo = {
            id:"role",
            label: "Select Role: ",
            options: [
                {value: "default",content: "Select Role", isDisabled: true},
                {value: "admin",content: "Admin", isDisabled: false},
                {value: "sales_manager",content: "Sales Manager", isDisabled: false}
            ]
        }
        return {loginFields, headerContent, buttonContent, multiRole, selectInfo}
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