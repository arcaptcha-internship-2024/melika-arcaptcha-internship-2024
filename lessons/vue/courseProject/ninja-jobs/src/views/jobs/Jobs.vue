<template>
    <div>
        <h1>Jobs</h1>
        <div v-for="job in jobs" :key="job.id" class="job">
            <router-link :to="{name: 'jobDetail', params:{id: job.id}}">
                <h2>{{job.title}}</h2>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            jobs: [
                {title: 'Ninja Vue Developer', id: 1, detail:'nothing'},
                {title: 'Ninja UX Designer', id: 2, detail:'nothing'},
                {title: 'Ninja Web Developer', id: 3, detail:'nothing'}
            ]
        }
    }
}
</script>

<style>
.job h2{
    background: #f4f4f4;
    border-radius: 10px;
    padding: 20px;
    margin: 10px auto;
    max-width: 600px;
    cursor: pointer;
    color: #444;
}
.job h2:hover{
    background: #ddd;
}
.job a{
    text-decoration: none;
}
</style>