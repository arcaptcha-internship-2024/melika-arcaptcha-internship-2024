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
      <InputGroup :id="formField.id" :type="formField.type" :rows="formField.rows" :placeholder="formField.placeholder" :label="formField.label" :isRequired="formField.isRequired" :fieldType="formField.fieldType" :value="formField.value" :isDisabled="formField.isDisabled"/>
    </div>
    <div v-if="isCaptchaRequired">
      <arcaptchaVue3 :callback="callbackDef" :expired_callback="expired_callbackDef" site_key="qh7aotm3n8" ref="widget"></arcaptchaVue3>
    </div>
    <div v-if="buttonContent">
      <button type="submit">{{buttonContent}}</button>
    </div>
    
  </form>
</template>

<script>
import arcaptchaVue3, { methods } from 'arcaptcha-vue3';
import {ref, watch} from 'vue'
import InputGroup from './InputGroup.vue'
import { useRouter } from 'vue-router';
import {jwtDecode} from 'jwt-decode'


export default {
  components: {
    InputGroup,
    arcaptchaVue3,
  },
  props:['formFields', 'buttonContent', 'headerContent', 'multiRole','selectInfo','id','status', 'isCaptchaRequired'],
  setup(props){
    const widget = ref(null)
    const role = ref('default')
    const router = useRouter();
    
    if(props.status){
      role.value = props.status.toLowerCase()
    }
    const reset = () => {
      if (widget.value) {
        widget.value.reset();
      }
    }
    const handleSubmit = async () => {
      const form = document.querySelector('form')
      const formData = new FormData(form);
      // formData.append('role',role.value)
      const urlEncoded = new URLSearchParams(formData).toString();
      formData.append('id', props.id )
      const myUrlEncoded = new URLSearchParams(formData).toString();
      if(props.buttonContent === "Login"){
        fetch('http://localhost:3000/api/login',{
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
              const decodedToken = jwtDecode(data.jwtToken)
              role.value = decodedToken.role
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
        fetch('http://localhost:3000/api/customer/submit',{
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
      else if (props.buttonContent === "Create"){
        const jwtToken = localStorage.getItem('jwtToken');
        const decodedToken = jwtDecode(jwtToken)
        const userRole = decodedToken.role
        const email = decodedToken.email
        const action = "create"
        const params = new URLSearchParams(myUrlEncoded);
        params.append('role', userRole);
        params.append('email', email);
        params.append('action', action)
        const updatedUrlEncoded = params.toString();

        fetch('http://localhost:3000/api/customer/add',{
          method: "POST",
          body: updatedUrlEncoded,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${jwtToken}`
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
      else if(props.buttonContent === "Save"){
        const jwtToken = localStorage.getItem('jwtToken');
        const decodedToken = jwtDecode(jwtToken)
        const userRole = decodedToken.role
        const email = decodedToken.email
        const action = "update"
        const params = new URLSearchParams(myUrlEncoded);

        // Append additional fields
        params.append('status',role.value)
        params.append('role', userRole);
        params.append('email', email);
        params.append('action', action)
        const updatedUrlEncoded = params.toString();
        fetch('http://localhost:3000/api/user/update',{
          method:"POST",
          body: updatedUrlEncoded,
          headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${jwtToken}`
          }
        }).then(response => response.json()).then(
          data => {
            if (data.success){
              console.log(data)
              alert(data.message)
              // document.getElementById("myForm").reset()
              // reset()
              window.location.reload();
              
            }else{
              alert(data.message)
              reset()
            }
          }
        )

      }
      else{
        const jwtToken = localStorage.getItem('jwtToken');
        const decodedToken = jwtDecode(jwtToken)
        const tokenRole = decodedToken.role
        const email = decodedToken.email
        const action = "create"
        const newUserRole = role.value
        const params = new URLSearchParams(myUrlEncoded);

        // Append additional fields
        params.append('role', tokenRole);
        params.append('newUserRole', newUserRole);
        params.append('tokenEmail', email);
        params.append('action', action)
        const updatedUrlEncoded = params.toString();
        fetch('http://localhost:3000/api/operator/add',{
          method:"POST",
          body: updatedUrlEncoded,
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

