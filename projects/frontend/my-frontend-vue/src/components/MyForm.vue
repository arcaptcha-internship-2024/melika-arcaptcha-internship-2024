<template>
  <form id="myForm">
    <h1>Submit Your Details</h1>
    <div v-for="formField in formFields" :key="formField.id">
      <InputGroup :id="formField.id" :type="formField.type" :placeholder="formField.placeholder" :label="formField.label" :isRequired="formField.isRequired"/>
    </div>
    <label for="explanation">Explanation:</label>
    <textarea id="explanation" name="explanation" rows="4" placeholder="Provide a short explanation" required></textarea>
    <div class="arcaptcha" data-site-key="qh7aotm3n8"></div>
    
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import InputGroup from './InputGroup.vue'
export default {
  components: {
    InputGroup
  },
  setup(){
    const formFields = [
      {id: "name", type: "text", placeholder: "Your full name", label: "Name: ", isRequired: true},
      {id: "companyName", type: "text", placeholder: "Company you work for", label: "Company Name: ", isRequired: true},
      {id: "jobPosition", type: "text", placeholder: "Your job position", label: "Job Position: ", isRequired: true},
      {id: "phoneNumber", type: "tel", placeholder: "Your phone number", label: "Phone Number: ", isRequired: true}
    ]
    return{formFields}
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

