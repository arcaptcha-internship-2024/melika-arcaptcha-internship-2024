<template>
  <div>
    <div v-if="error">{{error}}</div>
    <div v-if="post">
        <h1 v-if="post.title">{{post.title}}</h1>
        <p v-if="post.body">{{post.body}}</p>
    </div>
  </div>
</template>

<script>
import getPost from '../composables/getPost'
export default {
    props: ['id'],
    setup(props){
        console.log(`this is props.id: ${props.id}`)
        const{post, error, loadData} = getPost(props.id)
        loadData()
        return{post,error}
    }
}
</script>

<style>

</style>