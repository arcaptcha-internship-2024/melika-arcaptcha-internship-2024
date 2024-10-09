<template>
    <div>
        <h1>Jobs</h1>
        <div v-for="job in jobs" :key="job.id">
            {{job.title}}
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            jobs: [
                {title: 'Ninja Vue Developer', id: 1, detail:'nothing'},
                {title: 'Ninja UX Designer', id: 1, detail:'nothing'},
                {title: 'Ninja Web Developer', id: 1, detail:'nothing'}
            ]
        }
    }
}
</script>

<style>

</style>