<template>
  <div>
    <nav>
      <router-link :to="{name: 'home'}">Home</router-link> |
      <router-link :to="{name: 'about'}">About</router-link> |
      <router-link :to="{name: 'jobs'}">Jobs</router-link>
    </nav>
    
    <router-view/>
    <!-- <button @click="back">Go Back</button>
    <button @click="redirect">Redirect</button>
    <button @click="forward">Go Forward</button> -->
  </div>
</template>

<script>
export default{
  methods: {
    back(){
      this.$router.back(-1)
    },
    redirect(){
      this.$router.push({name : 'home'})
    },
    forward(){
      this.$router.forward(1)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

nav a.router-link-exact-active {
  color: white;
  background: crimson;
  border-radius: 4px;
  padding: 10px;
}

button{
  margin: 0 10px;
  padding: 10px;
  border: none;
  border-radius: 4px;
}
</style>
