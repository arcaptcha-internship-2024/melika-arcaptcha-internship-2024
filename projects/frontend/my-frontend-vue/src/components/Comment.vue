<template>
    <div>
        <h3 class="commentHeader">Comments:</h3>
        <div v-for="comment in comments" :key="comment.commentId">
            <InputGroup :type="type" :label="`${comment.email} (${comment.date})`" :fieldType="input" :value="comment.message" :isDisabled="true"/>
        </div>
        <div v-if="isFetched && length===0">
            {{length}}
            No Comments Here
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import InputGroup from './InputGroup.vue'
export default {
    components:{InputGroup},
    props: ['id'],
    setup(props){
        const comments = ref([])
        const input = ref('input')
        const type = ref('text')
        const jwtToken = localStorage.getItem('jwtToken');
        const customerId = props.id
        const isFetched = ref(false)
        const length = ref(0)

        const tableName = 'comments'
        fetch('http://localhost:3000/api/comment/getAll',{
            method:"POST",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({customerId,tableName}),
        }).then(response => response.json()).then(
            data =>{
                console.log('these are comments:',data)
                comments.value = data
                length.value = comments.value.length
                console.log('length:',length.value)
                isFetched.value = true
                console.log('isFetched:',isFetched.value)
            })
        
        return{comments,input,type,length,isFetched}
    }
}
</script>

<style>

</style>