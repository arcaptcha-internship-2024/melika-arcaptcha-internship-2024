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
      {id: "phoneNumber", type: "tel", placeholder: "Your phone number", label: "Phone Number: ", isRequired: true},
      {id: "phoneNumber", type: "tel", placeholder: "Your phone number", label: "Phone Number: ", isRequired: true},

    ]
    return{formFields}
  }
}
</script>
<style>

</style>

