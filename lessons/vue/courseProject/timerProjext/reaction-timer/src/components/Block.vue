<template>
  <div class="block" v-if="showBlock" @click="stopTimer">
    Click me!
  </div>
</template>

<script>
export default {
    props: ['delay'],
    data(){
        return{
            showBlock: false,
            timer: null,
            reactionTime: 0
        }
    },
    mounted(){
        setTimeout(()=> {
            this.showBlock = true,
            this.startTimer()
        },this.delay)
    },
    methods:{
        startTimer(){
            this.timer = setInterval(()=>{
                this.reactionTime += 10
            },10)
        },
        stopTimer(){
            clearInterval(this.timer)
            this.$emit('end',this.reactionTime)
        }
    }
}
</script>

<style>
    .block{
        width: 400px;
        background-color: rgb(37, 148, 24);
        color: white;
        border-radius: 20px;
        text-align: center;
        padding: 100px 0;
        margin: 40px auto;
    }
</style>