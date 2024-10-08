<template>
    <div class="backdrop" @click.self="closeModal">
        <div class="modal" :class="{sale: theme === 'sale'}">
            <h1>{{header}}</h1>
            <p>{{text}}</p>
        </div>
    </div>
</template>
<script>
    export default{
        props:['header','text','theme'],
        methods:{
            closeModal(){
                this.$emit('close')
            }
        }
    }
</script>
<style>
    .modal{
        width: 400px;
        margin: 100px auto;
        background: white;
        padding: 20px;
        border-radius: 10px;
    }
    .backdrop{
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        position: fixed;
        width: 100%;
        height: 100%;
    }
    .modal h1{
        color: rgb(218, 81, 18);
        border: none;
        padding: 0;
    }
    .modal.sale{
        background: coral;
    }
    .modal.sale h1{
        color: white;
    }
</style>