<template>
  <form id="myForm" action="http://localhost:3000" enctype="application/x-www-form-urlencoded" method="POST" @submit.prevent="handleSubmit">
    <h1>Submit Your Details</h1>
    <div v-for="formField in formFields" :key="formField.id">
      <InputGroup :id="formField.id" :type="formField.type" :rows="formField.rows" :placeholder="formField.placeholder" :label="formField.label" :isRequired="formField.isRequired" :fieldType="formField.fieldType"/>
    </div>
    <arcaptchaVue3 :callback="callbackDef" :expired_callback="expired_callbackDef" site_key="qh7aotm3n8"></arcaptchaVue3>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import arcaptchaVue3, { data } from 'arcaptcha-vue3';
import {ref} from 'vue'
import InputGroup from './InputGroup.vue'
export default {
  components: {
    InputGroup,
    arcaptchaVue3
  },
  setup(){
    const widget = ref(null)
    const formFields = [
      {id: "name", type: "text", rows: "", placeholder: "Your full name", label: "Name: ", isRequired: true, fieldType:"input"},
      {id: "companyName", type: "text", rows: "", placeholder: "Company you work for", label: "Company Name: ", isRequired: true, fieldType:"input"},
      {id: "jobPosition", type: "text", rows: "", placeholder: "Your job position", label: "Job Position: ", isRequired: true, fieldType:"input"},
      {id: "phoneNumber", type: "tel", rows: "", placeholder: "Your phone number", label: "Phone Number: ", isRequired: true, fieldType:"input"},
      {id: "explanation", type: "", rows: "4", placeholder: "Provide a short explanation", label: "Explanation: ", isRequired: true, fieldType:"textarea"}
    ]
    
    const handleSubmit = async () => {
      const form = document.querySelector('form')
      const formData = new FormData(form);
      const urlEncoded = new URLSearchParams(formData).toString();

      fetch('http://localhost:3000/upload',{
        method: "POST",
        body: urlEncoded, // just 'fd' for multipart/form-data
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        }
      }).then(response => response.json()).then(
        data => {
          if (data.success){
            alert(data.message)
            document.getElementById("myForm").reset()
            window.arcaptcha.reset()
          }else{
            alert(data.message)
          }
        }
      )
    }
    return{formFields, handleSubmit, widget}
  },
  methods: {
    expired_callbackDef() {
        //This method would be called after expiring
    },
    callbackDef() {
        // This method would be called after solving captcha
    }
  }
}
</script>



<style>
form {
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}
button {
  background-color: #7c5eff;
  color: white;
  border: none;
  padding: 15px 25px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: inline-block;
  width: 100%;
}
button:hover {
  background-color: #6242db;
}
</style>

