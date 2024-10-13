<template>
  <div class="input-group">
    <label :for="id">{{label}}</label>
    <input :type="type" :id="id" :name="id" :placeholder="placeholder" :required="isRequired">
  </div>
</template>

<script>
export default {
  props:[
    'id',
    'type',
    'placeholder',
    'label',
    'isRequired'
  ]
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
input, textarea{
  width: 95%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 20px;
  transition: border-color 0.3s ease;
}
input:focus, textarea:focus{
  border-color: #7c5eff;
  outline: none;
}
@media (max-width: 768px) {

input{
  font-size: 14px;
}
}
</style>