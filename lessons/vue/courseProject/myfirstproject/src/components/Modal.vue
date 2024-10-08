<template>
    <div class="backdrop">
        <div class="modal">
            <h1>Modal Title</h1>
            <p>This is a Modal</p>
        </div>
    </div>
</template>

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
</style>