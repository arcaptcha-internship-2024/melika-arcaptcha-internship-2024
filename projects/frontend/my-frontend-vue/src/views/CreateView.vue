<template>
  <div class="customerForm">
    <MyForm :formFields="formFields" :buttonContent="buttonContent" :headerContent="headerContent" :multiRole="multiRole"/>
  </div>
</template>

<script>
import MyForm from '../components/MyForm.vue'

export default {
    components: {
        MyForm
    },
    setup(){
        const formFields = [
        {id: "name", type: "text", rows: "", placeholder: "Your full name", label: "Name: ", isRequired: true, fieldType:"input"},
        {id: "companyName", type: "text", rows: "", placeholder: "Company you work for", label: "Company Name: ", isRequired: true, fieldType:"input"},
        {id: "jobPosition", type: "text", rows: "", placeholder: "Your job position", label: "Job Position: ", isRequired: true, fieldType:"input"},
        {id: "phoneNumber", type: "tel", rows: "", placeholder: "Your phone number", label: "Phone Number: ", isRequired: true, fieldType:"input"},
        {id: "explanation", type: "", rows: "4", placeholder: "Provide a short explanation", label: "Explanation: ", isRequired: true, fieldType:"textarea"}
        ]
        const headerContent = "Create Your Customer"
        const buttonContent = "Create"
        const multiRole = false
        
        return {formFields, headerContent,buttonContent, multiRole}
    }
}
</script>

<style>
.customerForm{
    width: 100%;
  display: flex;
  justify-content: center;
}
</style>