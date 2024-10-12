<template>
  <div class="home">
    <h1>Home</h1>
    <div v-if="error">{{error}}</div>
    <div v-if="posts.length">
      <PostList :posts="posts"/>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import PostList from "../components/PostList.vue"
import {computed, reactive, ref, watch, watchEffect} from 'vue'

export default {
  name: 'HomeView',
  components: {PostList},
  setup(){
    const showPosts = ref(true)
    const posts = ref([])
    const error = ref(null)

    const loadData = async () => {
      try {
        let data = await fetch('http://localhost:3000/posts')
        if(!data.ok){
          throw Error('No data available')
        }
        posts.value = await data.json()
      } catch (err) {
        error.value = err.message
      }
    }
    loadData()
    return{posts,showPosts,error}
  }
}
</script>
