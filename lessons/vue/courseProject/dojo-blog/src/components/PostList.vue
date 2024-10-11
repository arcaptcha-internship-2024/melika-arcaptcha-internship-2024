<template>
  <div class="post-list"> 
    <div v-for="post in posts" :key="post">
        <Post :post="post"/>
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue'
import {computed} from 'vue'
export default {

    props: ['posts'],
    components:{Post},
}
</script>

<style>

</style>