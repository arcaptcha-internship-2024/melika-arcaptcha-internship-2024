<template>
  <form id="myForm" action="http://localhost:3000" enctype="application/x-www-form-urlencoded" method="POST" @submit.prevent="handleSubmit">
    <h1>{{headerContent}}</h1>

    <div v-if="multiRole">
      <label :for="selectInfo.id">{{ selectInfo.label }}</label>
      <select v-model="role" :id="selectInfo.id">
        <option v-for="option in selectInfo.options" :key="option.value" :value="option.value">{{option.content}}</option>
      </select>
    </div>

    <div v-for="formField in formFields" :key="formField.id" class="form-field">
      <InputGroup :id="formField.id" :type="formField.type" :rows="formField.rows" :placeholder="formField.placeholder" :label="formField.label" :isRequired="formField.isRequired" :fieldType="formField.fieldType"/>
    </div>

    <arcaptchaVue3 :callback="callbackDef" :expired_callback="expired_callbackDef" site_key="qh7aotm3n8"></arcaptchaVue3>

    <button type="submit">{{buttonContent}}</button>
  </form>
</template>

<script>
import arcaptchaVue3 from 'arcaptcha-vue3';
import {ref, watch} from 'vue'
import InputGroup from './InputGroup.vue'
export default {
  components: {
    InputGroup,
    arcaptchaVue3
  },
  props:['formFields', 'buttonContent', 'headerContent', 'multiRole','selectInfo'],
  setup(props){
    const widget = ref(null)
    const role = ref('default')

    const handleSubmit = async () => {
      const form = document.querySelector('form')
      const formData = new FormData(form);
      formData.append('role',role.value)
      const urlEncoded = new URLSearchParams(formData).toString();
      console.log("this is urlencoded: ",urlEncoded)

      if(props.multiRole){
        fetch('http://localhost:3000/login',{
          method:"POST",
          body: urlEncoded,
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
      else{
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
      
    }
    return{handleSubmit, widget, role}
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
.form-field{
  width: 100%;
}
</style>

