<template>
    <div class="user-form">
        <MyForm :formFields="userFields" class="form-card" :buttonContent="buttonContent" :headerContent="headerContent" :multiRole="multiRole" :selectInfo="selectInfo" :isCaptchaRequired="isCaptchaRequired"/>
    </div>
</template>

<script>
import MyForm from '../components/MyForm.vue'
import {ref} from 'vue'

export default {
    name:'UserForm',
    components:{
        MyForm
    },
    props:['headerContent','buttonContent','multiRole','isCaptchaRequired'],
    setup(props){
        const userFields = [
            {id: "email", type: "email", rows: "", placeholder: "Your email", label: "Email: ", isRequired: true, fieldType:"input"},
            {id: "password", type: "password", rows: "", placeholder: "Your password", label: "Password: ", isRequired: true, fieldType:"input"},
        ]
        const headerContent = props.headerContent
        const buttonContent = props.buttonContent
        const selectInfo = {
            id:"role",
            label: "Select Role: ",
            options: [
                {value: "default",content: "Select Role", isDisabled: true},
                {value: "admin",content: "Admin", isDisabled: false},
                {value: "sales_manager",content: "Sales Manager", isDisabled: false}
            ]
        }
        return {userFields, headerContent, buttonContent, selectInfo}
    }
}
</script>

<style>
.user-form{
  width: 100%;
}
</style>