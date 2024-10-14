<template>
  <nav>
    <button class="login-button">login</button>
  </nav>
  <div class="home">
    <MyForm :formFields="formFields"/>
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
    return {formFields}
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
.login-button{
  width: 10%;
}
</style>