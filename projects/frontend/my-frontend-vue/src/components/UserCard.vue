<template>
  <div class="user-card">
    <h1>{{user.email}}</h1>
    <p>{{user.password}}</p>
  </div>
</template>

<script>
export default {
    props:['user'],
    setup(){
    }
}
</script>

<style>
.user-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.user-card:hover {
  background-color: #e0e0e0;
}
</style>