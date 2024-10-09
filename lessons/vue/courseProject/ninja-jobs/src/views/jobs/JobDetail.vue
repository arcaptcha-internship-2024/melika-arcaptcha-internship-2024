<template>
    <div>
        <div v-if="job">
            <h1>{{job.title}}</h1> 
            <h2>The job id is: {{job.id}}</h2>
            <h2>The job details: {{job.detail}}</h2>
        </div>
        <div v-else>
            <p>loading job info..</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['id'],
    data(){
        return{
            job: null
        }
    },
    mounted(){
        fetch('http://localhost:3000/jobs/'+this.id)
        .then(res => res.json())
        .then(data => {
            this.job = data
            console.log(this.job)
            })
        .catch(err => console.log(err.message))
    }
}
</script>

<style>

</style>