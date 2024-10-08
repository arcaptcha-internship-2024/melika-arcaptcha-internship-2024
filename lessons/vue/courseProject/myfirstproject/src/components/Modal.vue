<template>
    <div class="backdrop" @click.self="closeModal">
        <div class="modal" :class="{sale: theme === 'sale'}">
            <slot></slot>
            <div class="actions">
                <slot name="links"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        props:['theme'],
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
    .modal .actions{
        text-align: center;
        margin: 30px 0 10px 0;
    }
    .modal .actions a{
        color: #333;
        padding: 8px;
        border: 1px solid #eee;
        border-radius: 4px;
        text-decoration: none;
        margin: 10px;
    }
    .modal.sale .actions{
        color: white;
    }
    .modal.sale .actions a{
        color: white;
    }
</style>