<template>
  <div class="post-list"> 
    <div v-for="post in posts" :key="post">
        <Post :post="post"/>
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue'
import {computed, onMounted, onUnmounted, onUpdated} from 'vue'
export default {
    props: ['posts'],
    components:{Post},
    setup(){
        onMounted(() => console.log('PostList component Mounted!!'))
        onUnmounted(() => console.log('PostList component Unmounted!!'))
        onUpdated(() => console.log('PostList component Updated!!'))
    },
    mounted(){
        console.log('PostList component Mounted using Options api! ')
    }
}
</script>

<style>

</style>