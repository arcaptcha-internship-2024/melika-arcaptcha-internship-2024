<template>
<div v-if="length>0">
    <div v-for="log in logs" :key="log">
        <h1>{{log}}</h1>
    </div>
</div>
  
</template>

<script>
import {ref} from 'vue'
export default {
    setup(){
        const logs = ref([])
        const length = ref(0)
        
        const jwtToken = localStorage.getItem('jwtToken');
        fetch('http://localhost:3000/api/logs/get',{
            method:"GET",
            headers: {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${jwtToken}`,
            'x-file-path':'./database/logs.json'
            }
        }).then(response => response.json()).then(
            data => {
                console.log(data,"aA!!!!!!!!!!!!!!")
                logs.value = data
                length.value = logs.value.length
            }
        )
        return{logs,length}
    }
}
</script>

<style>

</style>