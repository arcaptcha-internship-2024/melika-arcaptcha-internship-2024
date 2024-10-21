<template>
  <nav>
    <router-link :to="{name: 'registerUser'}" class="registerUser-link">
      <button class="registerUser-button">Register User</button>
    </router-link>
  </nav>
  <h1>Welcome to the Admin Panel!</h1>
</template>

<script>
export default {

}
</script>

<style>
nav{
  display: flex;

}
.registerUser-link {
  display: inline-block;
  width: 10%;
}
.registerUser-button{
  width: 100%;
}
</style>