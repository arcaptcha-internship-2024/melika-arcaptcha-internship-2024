<template>
  <div class="input-group">
    <label :for="id">{{label}}</label>
    <div v-if="fieldType === 'input'">
      <input :type="type" :id="id" :name="id" :placeholder="placeholder" :required="isRequired" :value="value" :disabled="isDisabled">
    </div>
    <div v-else>
      <textarea :name="id" :id="id" :rows="rows" :placeholder="placeholder" :value="value" :disabled="isDisabled"></textarea>
    </div>
   
    
  </div>
</template>

<script>
export default {
  props:[
    'id',
    'type',
    'rows',
    'placeholder',
    'label',
    'isRequired',
    'fieldType',
    'value',
    'isDisabled'
  ],
  setup(props){

  }
}
</script>

<style>
label {
  font-size: 14px;
  font-weight: bold;
  color: #555;
  display: block;
  margin-bottom: 8px;
  text-align: left;
  margin-left: 5px;
}
input, textarea, select{
  width: 97.5%;
  padding: 12px;
  padding-right: 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;
}
select{
  width: 100%;
}
input:focus, textarea:focus, select:focus{
  border-color: #7c5eff;
  outline: none;
}
@media (max-width: 768px) {

input{
  font-size: 14px;
}
}
</style>