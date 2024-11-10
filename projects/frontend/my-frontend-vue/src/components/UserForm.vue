<template>
    <div class="user-form">
        <MyForm :formFields="userFields" class="form-card" :buttonContent="buttonContent" :headerContent="headerContent" :multiRole="multiRole" :selectInfo="selectInfo" :isCaptchaRequired="isCaptchaRequired" :status="role" :id="id"/>
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
    props:['headerContent','buttonContent','multiRole','isCaptchaRequired','foundUser','isDisabled','id'],
    setup(props){
        const role = ref('default')

        const userFields = ref([
            {id: "email", type: "email", rows: "", placeholder: "Your email", label: "Email: ", isRequired: true, fieldType:"input", value:"",isDisabled:false},
            {id: "password", type: "password", rows: "", placeholder: "Your password", label: "Password: ", isRequired: true, fieldType:"input", value:"", isDisabled:false},
        ])
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

         if (props.foundUser) {
            userFields.value[1].type = "text"
            userFields.value.forEach(field => {
                field.value = props.foundUser[field.id]
                field.isDisabled = props.isDisabled
            });
            role.value = props.foundUser.role
        }
        console.log(userFields)
        return {userFields, headerContent, buttonContent, selectInfo,role}
    }
}
</script>

<style>
.user-form{
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>