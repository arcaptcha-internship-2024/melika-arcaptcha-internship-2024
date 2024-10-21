<template>
  <form id="myForm" action="http://localhost:3000" enctype="application/x-www-form-urlencoded" method="POST" @submit.prevent="handleSubmit">
    <h1>{{headerContent}}</h1>

    <div v-if="multiRole">
      <label :for="selectInfo.id">{{ selectInfo.label }}</label>
      <select v-model="role" :id="selectInfo.id">
        <option v-for="option in selectInfo.options" :key="option.value" :value="option.value" :disabled="option.isDisabled">{{option.content}}</option>
      </select>
    </div>

    <div v-for="formField in formFields" :key="formField.id" class="form-field">
      <InputGroup :id="formField.id" :type="formField.type" :rows="formField.rows" :placeholder="formField.placeholder" :label="formField.label" :isRequired="formField.isRequired" :fieldType="formField.fieldType"/>
    </div>

    <arcaptchaVue3 :callback="callbackDef" :expired_callback="expired_callbackDef" site_key="qh7aotm3n8" ref="widget"></arcaptchaVue3>
    
    <button type="submit">{{buttonContent}}</button>
  </form>
</template>

<script>
import arcaptchaVue3, { methods } from 'arcaptcha-vue3';
import {ref, watch} from 'vue'
import InputGroup from './InputGroup.vue'
import { useRouter } from 'vue-router';

export default {
  components: {
    InputGroup,
    arcaptchaVue3,
  },
  props:['formFields', 'buttonContent', 'headerContent', 'multiRole','selectInfo'],
  setup(props){
    const widget = ref(null)
    const role = ref('default')
    const router = useRouter();

    const reset = () => {
      if (widget.value) {
        widget.value.reset();
      }
    }
    const handleSubmit = async () => {
      const form = document.querySelector('form')
      const formData = new FormData(form);
      formData.append('role',role.value)
      const urlEncoded = new URLSearchParams(formData).toString();
      if(props.buttonContent === "Login"){
        fetch('http://localhost:3000/login',{
          method:"POST",
          body: urlEncoded,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then(response => response.json()).then(
          data => {
            if (data.success){
              console.log(data)
              alert(data.message)
              console.log(data.jwtToken)
              localStorage.setItem('jwtToken', data.jwtToken);
              const url = role.value === "admin" ? '/admin' : '/salesManager'
              router.push(url)

            }else{
              alert(data.message)
              reset()
            }
          }
        )
      }
      else if (props.buttonContent === "Submit"){
        fetch('http://localhost:3000/upload',{
          method: "POST",
          body: urlEncoded,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          }
        }).then(response => response.json()).then(
          data => {
            if (data.success){
              alert(data.message)
              document.getElementById("myForm").reset()
              console.log(window.arcaptcha)
              reset()
            }else{
              alert(data.message)
            }
          }
        )
      }
      else{
        const jwtToken = localStorage.getItem('jwtToken');
        fetch('http://localhost:3000/registerUser',{
          method:"POST",
          body: urlEncoded,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${jwtToken}`
          }
        }).then(response => response.json()).then(
          data => {
            if (data.success){
              console.log(data)
              alert(data.message)
              document.getElementById("myForm").reset()
              reset()
            }else{
              alert(data.message)
              reset()
            }
          }
        )
      }
      
    }
    return{handleSubmit, widget, role}
  },
  methods: {
    reset(){
      this.$refs.widget.reset();
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
.form-field{
  width: 100%;
}
</style>

