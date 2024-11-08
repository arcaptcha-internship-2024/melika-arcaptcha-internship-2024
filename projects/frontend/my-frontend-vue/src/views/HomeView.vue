<template>
  <div>
    <nav>
    <router-link :to="{name: 'login'}" class="login-link">
      <button class="login-button">login</button>
    </router-link>
  </nav>
  <div class="home">
    <MyForm :formFields="formFields" :buttonContent="buttonContent" :headerContent="headerContent" :multiRole="multiRole" :isCaptchaRequired="true"/>
  </div>
  </div>
</template>

<script>
import InputGroup from '../components/InputGroup.vue'
import MyForm from '../components/MyForm.vue'
export default {
  name: 'HomeView',
  components: {
    InputGroup,
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
    const headerContent = "Submit Your Details"
    const buttonContent = "Submit"
    const multiRole = false
    
    return {formFields, headerContent,buttonContent, multiRole}
  }
  
}
</script>

<style >
.home{
  width: 100%;
  display: flex;
  justify-content: center;
}
nav{
  display: flex;

}
.login-link {
  display: inline-block;
  width: 10%;
}
.login-button{
  width: 100%;
}
</style>