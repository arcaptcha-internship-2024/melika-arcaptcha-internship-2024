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

</style>